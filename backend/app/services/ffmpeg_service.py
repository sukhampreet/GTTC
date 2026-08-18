"""
Thin wrapper around the FFmpeg binary.

Responsibilities:
- detect whether FFmpeg is installed / on PATH
- build the RTSP -> HLS command line for a given camera
- start/stop a single FFmpeg subprocess in a Windows-compatible way

This module does NOT decide *when* to start/stop a stream or manage the
one-process-per-camera invariant - that lives in stream_service.py.
"""

from __future__ import annotations

import platform
import shutil
import subprocess
from pathlib import Path

from app.config import Settings
from app.utils.logging import get_logger

logger = get_logger("ffmpeg")

# The source camera's actual frame rate isn't exposed anywhere in
# config/settings (CP PLUS NVR streams aren't probed before FFmpeg starts),
# so GOP sizing falls back to this until/unless that becomes available.
DEFAULT_SOURCE_FPS = 25


def ffmpeg_available(ffmpeg_path: str) -> bool:
    """Return True if the configured FFmpeg binary can be located."""
    resolved = shutil.which(ffmpeg_path)
    if resolved:
        return True
    # If a full/relative path was given directly (not just a bare command),
    # check it exists on disk as a fallback to shutil.which's PATH lookup.
    candidate = Path(ffmpeg_path)
    return candidate.is_file()


def build_hls_command(rtsp_url: str, output_dir: Path, settings: Settings) -> list[str]:
    """Build the FFmpeg argv for converting the given RTSP source into a
    rolling live HLS playlist suitable for browser playback via hls.js.

    - RTSP is pulled over TCP for reliability on LAN/Wi-Fi.
    - Video is transcoded to H.264/yuv420p for broad browser support (the
      source may be H.265, which most browsers cannot play natively).
    - Audio is dropped; CCTV audio is not required for this stage.
    - A small rolling playlist (delete_segments) keeps disk usage bounded.
    """
    output_dir.mkdir(parents=True, exist_ok=True)
    playlist_path = output_dir / "index.m3u8"
    segment_path = output_dir / "seg_%05d.ts"

    # Force a keyframe exactly once per HLS segment. Without this, libx264's
    # own GOP/scene-change heuristics decide where keyframes land, so segment
    # cuts (which can only happen at keyframes) drift away from hls_time and
    # segments end up longer/irregular - which shows up as extra
    # glass-to-glass latency and uneven segment durations. sc_threshold=0
    # disables scene-change-triggered keyframes so *only* -g/-keyint_min
    # control cadence.
    gop_size = max(1, DEFAULT_SOURCE_FPS * settings.hls_segment_seconds)

    return [
        settings.ffmpeg_path,
        # Input-side options: must precede -i to reduce FFmpeg's own demuxer
        # buffering of the incoming RTSP stream (separate from the HLS
        # muxer/segmenting latency controlled below).
        "-fflags", "nobuffer",
        "-flags", "low_delay",
        "-rtsp_transport", "tcp",
        "-i", rtsp_url,
        "-an",
        "-c:v", "libx264",
        "-preset", settings.ffmpeg_preset,
        "-tune", "zerolatency",
        "-g", str(gop_size),
        "-keyint_min", str(gop_size),
        "-sc_threshold", "0",
        "-pix_fmt", "yuv420p",
        "-f", "hls",
        "-hls_time", str(settings.hls_segment_seconds),
        "-hls_list_size", str(settings.hls_list_size),
        "-hls_flags", "delete_segments+append_list+omit_endlist+independent_segments",
        "-hls_segment_filename", str(segment_path),
        str(playlist_path),
    ]


def start_process(command: list[str], log_file: Path) -> subprocess.Popen:
    """Start FFmpeg as a background subprocess.

    Windows-compatible: avoids POSIX-only flags (start_new_session, preexec_fn)
    and instead uses CREATE_NEW_PROCESS_GROUP on Windows so the process can be
    signalled/terminated independently of the parent.
    """
    log_file.parent.mkdir(parents=True, exist_ok=True)
    creationflags = 0
    kwargs: dict = {}
    if platform.system() == "Windows":
        creationflags = subprocess.CREATE_NEW_PROCESS_GROUP  # type: ignore[attr-defined]
        kwargs["creationflags"] = creationflags
    else:
        kwargs["start_new_session"] = True

    # Open in the parent just long enough for Popen to duplicate the handle
    # for the child. subprocess.Popen dup()s (POSIX) / duplicates the handle
    # for inheritance (Windows) before exec, so the child gets its own
    # reference to the file; the parent's `log_fh` is not needed afterwards.
    # The previous version never closed this parent-side handle, so every
    # stream (re)start leaked one open file descriptor for the lifetime of
    # the backend process - harmless for a single short-lived demo stream,
    # but able to exhaust file descriptors over many restarts/idle-reap
    # cycles during a long-running demo. Closing it here fixes that without
    # touching the FFmpeg command, HLS output, or process-management logic.
    log_fh = open(log_file, "ab", buffering=0)
    try:
        process = subprocess.Popen(
            command,
            stdout=log_fh,
            stderr=subprocess.STDOUT,
            stdin=subprocess.DEVNULL,
            **kwargs,
        )
    finally:
        log_fh.close()
    return process


def stop_process(process: subprocess.Popen, timeout: float = 5.0) -> None:
    """Terminate an FFmpeg subprocess gracefully, escalating to kill()."""
    if process.poll() is not None:
        return  # already exited
    try:
        process.terminate()
        process.wait(timeout=timeout)
    except subprocess.TimeoutExpired:
        logger.warning("FFmpeg pid=%s did not exit in time, killing", process.pid)
        process.kill()
        try:
            process.wait(timeout=timeout)
        except subprocess.TimeoutExpired:
            logger.error("FFmpeg pid=%s did not die after kill()", process.pid)
