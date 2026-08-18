from __future__ import annotations

from fastapi import APIRouter, HTTPException

from app.models.camera import Camera, CameraStatus
from app.schemas.camera import CameraDetail, CameraListResponse, CameraStatusResponse, CameraSummary
from app.services.camera_service import get_camera_service
from app.services.stream_service import StreamManager, get_stream_manager

router = APIRouter(prefix="/api/cameras", tags=["cameras"])


def _current_status(camera: Camera, streams: StreamManager) -> CameraStatus:
    handle = streams.get_handle(camera.id)
    if handle is None:
        # No stream has been requested yet - we haven't attempted to
        # connect, so we report "offline" rather than falsely claiming
        # "online". Requesting GET .../stream will trigger a real check.
        return CameraStatus.OFFLINE
    return handle.status


def _to_summary(camera: Camera, streams: StreamManager) -> CameraSummary:
    return CameraSummary(
        id=camera.id,
        name=camera.name,
        channel=camera.channel,
        nvr_model=camera.nvr_model,
        status=_current_status(camera, streams).value,
        protocol=camera.protocol.value,
        verified=camera.verified,
    )


@router.get("", response_model=CameraListResponse)
def list_cameras():
    camera_service = get_camera_service()
    stream_manager = get_stream_manager()
    return CameraListResponse(
        cameras=[_to_summary(c, stream_manager) for c in camera_service.list_cameras()]
    )


@router.get("/{camera_id}", response_model=CameraDetail)
def get_camera(camera_id: str):
    camera_service = get_camera_service()
    stream_manager = get_stream_manager()
    camera = camera_service.get_camera(camera_id)
    if camera is None:
        raise HTTPException(status_code=404, detail=f"Unknown camera_id '{camera_id}'")
    summary = _to_summary(camera, stream_manager)
    return CameraDetail(
        **summary.model_dump(),
        nvr_ip=camera.nvr_ip,
        stream_type=camera.stream_type,
    )


@router.get("/{camera_id}/status", response_model=CameraStatusResponse)
def get_camera_status(camera_id: str):
    camera_service = get_camera_service()
    stream_manager = get_stream_manager()
    camera = camera_service.get_camera(camera_id)
    if camera is None:
        raise HTTPException(status_code=404, detail=f"Unknown camera_id '{camera_id}'")
    handle = stream_manager.get_handle(camera_id)
    status = handle.status if handle else CameraStatus.OFFLINE
    detail = handle.error if handle else "Stream not yet requested"
    return CameraStatusResponse(camera_id=camera_id, status=status.value, detail=detail)
