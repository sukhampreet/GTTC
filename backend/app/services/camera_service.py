"""
Camera registry.

Only ONE physical camera is configured today: Channel 1 on the CP PLUS
CP-UNR-108F1 NVR, which has been manually verified (VLC playback of the
RTSP stream). Channels 2-8 exist on the NVR but are NOT wired up here -
see CLAUDE_2_HANDOFF.md for how to extend this to more channels.

This registry is intentionally separate from the frontend's existing
mock camera data (src/mock/...): it does not touch or replace that data.
Mapping the real camera into the frontend's existing camera lists is left
to the frontend-integration stage.
"""

from __future__ import annotations

from app.config import get_settings
from app.models.camera import Camera, StreamProtocol

PRIMARY_CAMERA_ID = "CAM-CPPLUS-001"


def _build_registry() -> dict[str, Camera]:
    settings = get_settings()
    camera = Camera(
        id=PRIMARY_CAMERA_ID,
        name="CP PLUS Camera 01",
        channel=settings.nvr_channel,
        nvr_model=settings.nvr_model,
        nvr_ip=settings.nvr_host,
        protocol=StreamProtocol.RTSP,
        stream_type="main" if settings.nvr_stream_type == 0 else "sub",
        verified=True,
    )
    return {camera.id: camera}


class CameraService:
    def __init__(self) -> None:
        self._cameras = _build_registry()

    def list_cameras(self) -> list[Camera]:
        return list(self._cameras.values())

    def get_camera(self, camera_id: str) -> Camera | None:
        return self._cameras.get(camera_id)

    def exists(self, camera_id: str) -> bool:
        return camera_id in self._cameras


_camera_service: CameraService | None = None


def get_camera_service() -> CameraService:
    global _camera_service
    if _camera_service is None:
        _camera_service = CameraService()
    return _camera_service
