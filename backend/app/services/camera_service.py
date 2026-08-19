"""
Camera registry.

Persisted to a JSON file (app.config.Settings.camera_registry_file, default
backend/app/data/cameras.json) so cameras added at runtime via
POST /api/cameras survive a backend restart.

On first startup - when that file doesn't exist yet - the registry is
seeded with today's one physically-verified camera: Channel 1 on the CP
PLUS CP-UNR-108F1 NVR, built from the NVR_* env vars. This keeps today's
known-working behavior unchanged while allowing channels 2-8 (or other
direct-to-camera connections) to be registered at runtime instead of only
via .env.

This registry is intentionally separate from the frontend's existing mock
camera data (src/mock/...): it does not touch or replace that data. Mapping
real cameras into the frontend's existing camera lists is left to the
frontend-integration stage.
"""

from __future__ import annotations

import json
import threading

from app.config import get_settings
from app.models.camera import Camera, StreamProtocol
from app.utils.logging import get_logger

logger = get_logger("camera_service")

PRIMARY_CAMERA_ID = "CAM-CPPLUS-001"

MIN_CHANNEL = 1
MAX_CHANNEL = 8


class CameraChannelTakenError(ValueError):
    """Raised when the requested NVR channel is already registered to
    another camera. The API layer turns this into a 409."""


def _camera_id_for_channel(channel: int) -> str:
    return f"CAM-CPPLUS-{channel:03d}"


def _validate_channel(channel: int) -> None:
    if not (MIN_CHANNEL <= channel <= MAX_CHANNEL):
        raise ValueError(
            f"channel must be between {MIN_CHANNEL} and {MAX_CHANNEL} (got {channel})"
        )


def _seed_camera() -> Camera:
    """Build today's one verified camera from the NVR_* env vars - used
    only the first time the registry file doesn't exist yet."""
    settings = get_settings()
    return Camera(
        id=PRIMARY_CAMERA_ID,
        name="CP PLUS Camera 01",
        channel=settings.nvr_channel,
        nvr_model=settings.nvr_model,
        nvr_ip=settings.nvr_host,
        port=settings.nvr_rtsp_port,
        username=settings.nvr_username,
        password=settings.nvr_password,
        protocol=StreamProtocol.RTSP,
        stream_type="main" if settings.nvr_stream_type == 0 else "sub",
        verified=True,
    )


def _camera_to_dict(camera: Camera) -> dict:
    return {
        "id": camera.id,
        "name": camera.name,
        "channel": camera.channel,
        "nvr_model": camera.nvr_model,
        "nvr_ip": camera.nvr_ip,
        "port": camera.port,
        "username": camera.username,
        "password": camera.password,
        "protocol": camera.protocol.value,
        "stream_type": camera.stream_type,
        "verified": camera.verified,
    }


def _camera_from_dict(data: dict) -> Camera:
    return Camera(
        id=data["id"],
        name=data["name"],
        channel=data["channel"],
        nvr_model=data["nvr_model"],
        nvr_ip=data["nvr_ip"],
        port=data.get("port", 554),
        username=data.get("username", ""),
        password=data.get("password", ""),
        protocol=StreamProtocol(data.get("protocol", StreamProtocol.RTSP.value)),
        stream_type=data.get("stream_type", "main"),
        verified=data.get("verified", False),
    )


class CameraService:
    def __init__(self) -> None:
        self._settings = get_settings()
        self._path = self._settings.camera_registry_file
        self._lock = threading.Lock()
        self._cameras: dict[str, Camera] = self._load_or_seed()

    # -- persistence ----------------------------------------------------

    def _load_or_seed(self) -> dict[str, Camera]:
        if self._path.exists():
            try:
                raw = json.loads(self._path.read_text(encoding="utf-8"))
                cameras = [_camera_from_dict(c) for c in raw.get("cameras", [])]
                if cameras:
                    return {c.id: c for c in cameras}
                logger.warning("Camera registry %s has no cameras; reseeding", self._path)
            except (json.JSONDecodeError, KeyError, ValueError) as exc:
                logger.warning(
                    "Could not read camera registry %s (%s); reseeding", self._path, exc
                )

        seed = _seed_camera()
        cameras = {seed.id: seed}
        self._write(cameras)
        return cameras

    def _write(self, cameras: dict[str, Camera]) -> None:
        self._path.parent.mkdir(parents=True, exist_ok=True)
        payload = {"cameras": [_camera_to_dict(c) for c in cameras.values()]}
        # Write to a temp file first and rename over the real one, so a
        # crash mid-write never leaves cameras.json truncated/corrupt.
        tmp_path = self._path.with_suffix(".tmp")
        tmp_path.write_text(json.dumps(payload, indent=2), encoding="utf-8")
        tmp_path.replace(self._path)

    # -- Public API -------------------------------------------------------

    def list_cameras(self) -> list[Camera]:
        return list(self._cameras.values())

    def get_camera(self, camera_id: str) -> Camera | None:
        return self._cameras.get(camera_id)

    def exists(self, camera_id: str) -> bool:
        return camera_id in self._cameras

    def add_camera(
        self,
        *,
        name: str,
        channel: int,
        host: str,
        port: int,
        username: str,
        password: str,
        stream_type: str,
    ) -> Camera:
        """Register a new camera on the given NVR channel (1-8) and persist
        it. Raises ValueError if the channel is out of range,
        CameraChannelTakenError (a ValueError) if it's already registered."""
        _validate_channel(channel)

        with self._lock:
            camera_id = _camera_id_for_channel(channel)
            if camera_id in self._cameras:
                raise CameraChannelTakenError(
                    f"Channel {channel} is already registered (camera_id={camera_id})"
                )

            camera = Camera(
                id=camera_id,
                name=name,
                channel=channel,
                nvr_model=self._settings.nvr_model,
                nvr_ip=host,
                port=port,
                username=username,
                password=password,
                protocol=StreamProtocol.RTSP,
                stream_type=stream_type,
                verified=False,
            )
            self._cameras[camera.id] = camera
            self._write(self._cameras)
            logger.info("Registered camera %s on channel %s (host=%s)", camera.id, channel, host)
            return camera

    def remove_camera(self, camera_id: str) -> bool:
        """Remove a camera from the registry and persist the change.

        Does NOT stop any running stream for this camera - the caller is
        responsible for calling `await stream_manager.stop_stream(camera_id)`
        first (see app/api/cameras.py), since this service has no knowledge
        of the (async) stream manager.
        """
        with self._lock:
            if camera_id not in self._cameras:
                return False
            del self._cameras[camera_id]
            self._write(self._cameras)
            logger.info("Removed camera %s from registry", camera_id)
            return True


_camera_service: CameraService | None = None


def get_camera_service() -> CameraService:
    global _camera_service
    if _camera_service is None:
        _camera_service = CameraService()
    return _camera_service
