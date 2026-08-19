"""
Stream manager.

Owns the invariant "at most one FFmpeg process per camera": concurrent
requests for the same camera reuse the same running stream instead of
spawning duplicate FFmpeg processes. Streams are started lazily (only when
first requested) and can be idle-reaped after a configurable timeout.

This module intentionally does not care about HTTP - it is called by the
API layer (app/api/streams.py, app/api/cameras.py).
"""

from __future__ import annotations

import asyncio
import subprocess
import time
from dataclasses import dataclass, field
from pathlib import Path

from app.config import Settings, get_settings
from app.models.camera import Camera, CameraStatus
from app.services import ffmpeg_service
from app.utils.logging import get_logger

logger = get_logger("stream_service")


@dataclass
class StreamHandle:
    camera_id: str
    process: subprocess.Popen | None = None
    output_dir: Path = field(default_factory=Path)
    started_at: float = 0.0
    last_accessed: float = field(default_factory=time.time)
    status: CameraStatus = CameraStatus.STARTING
    error: str | None = None

    @property
    def playlist_path(self) -> Path:
        return self.output_dir / "index.m3u8"


class StreamManager:
    """Singleton-per-process manager for all camera streams."""

    def __init__(self, settings: Settings | None = None) -> None:
        self._settings = settings or get_settings()
        self._streams: dict[str, StreamHandle] = {}
        self._locks: dict[str, asyncio.Lock] = {}

    def _lock_for(self, camera_id: str) -> asyncio.Lock:
        if camera_id not in self._locks:
            self._locks[camera_id] = asyncio.Lock()
        return self._locks[camera_id]

    # -- Public API ---------------------------------------------------------

    async def ensure_stream(self, camera: Camera) -> StreamHandle:
        """Ensure exactly one FFmpeg process is running for this camera,
        starting it if necessary. Safe to call concurrently."""
        async with self._lock_for(camera.id):
            handle = self._streams.get(camera.id)
            if handle and handle.process and handle.process.poll() is None:
                handle.last_accessed = time.time()
                self._refresh_status(handle)
                return handle

            if handle and handle.process and handle.process.poll() is not None:
                logger.warning(
                    "Stream for %s had exited (code=%s), restarting",
                    camera.id, handle.process.returncode,
                )

            handle = self._start_stream(camera)
            self._streams[camera.id] = handle
            return handle

    def get_handle(self, camera_id: str) -> StreamHandle | None:
        handle = self._streams.get(camera_id)
        if handle:
            self._refresh_status(handle)
        return handle

    def touch(self, camera_id: str) -> None:
        """Mark that a segment/playlist was just served, resetting the idle
        timer (called from the HLS file-serving endpoint)."""
        handle = self._streams.get(camera_id)
        if handle:
            handle.last_accessed = time.time()

    async def stop_stream(self, camera_id: str) -> None:
        async with self._lock_for(camera_id):
            handle = self._streams.pop(camera_id, None)
            if handle and handle.process:
                logger.info("Stopping FFmpeg for %s (pid=%s)", camera_id, handle.process.pid)
                ffmpeg_service.stop_process(handle.process)

    async def stop_all(self) -> None:
        for camera_id in list(self._streams.keys()):
            await self.stop_stream(camera_id)

    async def reap_idle_streams(self) -> None:
        """Stop streams nobody has touched recently. Intended to be called
        periodically from a background task; a value of 0 disables reaping."""
        timeout = self._settings.stream_idle_timeout_seconds
        if timeout <= 0:
            return
        now = time.time()
        stale = [
            cam_id
            for cam_id, handle in self._streams.items()
            if now - handle.last_accessed > timeout
        ]
        for cam_id in stale:
            logger.info("Reaping idle stream for %s (idle > %ss)", cam_id, timeout)
            await self.stop_stream(cam_id)

    # -- Internal -------------------------------------------------------------

    def _start_stream(self, camera: Camera) -> StreamHandle:
        settings = self._settings
        output_dir = settings.stream_directory_path / camera.id
        _clear_stale_segments(output_dir)

        handle = StreamHandle(camera_id=camera.id, output_dir=output_dir)

        if not ffmpeg_service.ffmpeg_available(settings.ffmpeg_path):
            handle.status = CameraStatus.ERROR
            handle.error = (
                f"FFmpeg not found (configured path: '{settings.ffmpeg_path}'). "
                "Install FFmpeg and/or set FFMPEG_PATH - see README.md."
            )
            logger.error(handle.error)
            return handle

        rtsp_url = camera.rtsp_url()
        command = ffmpeg_service.build_hls_command(rtsp_url, output_dir, settings)
        log_file = output_dir / "ffmpeg.log"

        logger.info(
            "Starting FFmpeg for camera=%s source=%s",
            camera.id, camera.redacted_rtsp_url(),
        )
        try:
            process = ffmpeg_service.start_process(command, log_file)
        except FileNotFoundError as exc:
            handle.status = CameraStatus.ERROR
            handle.error = f"Failed to launch FFmpeg: {exc}"
            logger.error(handle.error)
            return handle
        except Exception as exc:  # pragma: no cover - defensive
            handle.status = CameraStatus.ERROR
            handle.error = f"Unexpected error launching FFmpeg: {exc}"
            logger.exception("Unexpected error launching FFmpeg for %s", camera.id)
            return handle

        handle.process = process
        handle.started_at = time.time()
        handle.status = CameraStatus.STARTING
        return handle

    def _refresh_status(self, handle: StreamHandle) -> None:
        if handle.process is None:
            return  # stays whatever error state it started in
        exit_code = handle.process.poll()
        if exit_code is not None:
            handle.status = CameraStatus.ERROR
            handle.error = f"FFmpeg exited unexpectedly (code={exit_code}); see ffmpeg.log"
            return
        if handle.playlist_path.exists():
            handle.status = CameraStatus.ONLINE
            handle.error = None
        else:
            elapsed = time.time() - handle.started_at
            if elapsed > self._settings.hls_startup_timeout_seconds:
                # Still no playlist after the startup grace period - likely
                # can't reach the NVR / auth failure. Leave process running
                # (it may still recover) but surface this to the caller.
                handle.status = CameraStatus.ERROR
                handle.error = (
                    "No HLS playlist produced within startup timeout; "
                    "check NVR connectivity/credentials and streams/<id>/ffmpeg.log"
                )
            else:
                handle.status = CameraStatus.STARTING


def _clear_stale_segments(output_dir: Path) -> None:
    """Remove leftover playlist/segment files from a previous run so a
    restarted stream never serves stale frames under the same URL."""
    if not output_dir.exists():
        return
    for pattern in ("*.m3u8", "*.ts", "*.log"):
        for f in output_dir.glob(pattern):
            try:
                f.unlink()
            except OSError:
                logger.warning("Could not remove stale file %s", f)


_stream_manager: StreamManager | None = None


def get_stream_manager() -> StreamManager:
    global _stream_manager
    if _stream_manager is None:
        _stream_manager = StreamManager()
    return _stream_manager
