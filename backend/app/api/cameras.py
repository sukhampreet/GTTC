from __future__ import annotations

from fastapi import APIRouter, HTTPException, Response

from app.models.camera import Camera, CameraStatus
from app.schemas.camera import (
    CameraCreateRequest,
    CameraDetail,
    CameraListResponse,
    CameraStatusResponse,
    CameraSummary,
)
from app.services.camera_service import CameraChannelTakenError, get_camera_service
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


def _to_detail(camera: Camera, streams: StreamManager) -> CameraDetail:
    summary = _to_summary(camera, streams)
    return CameraDetail(
        **summary.model_dump(),
        nvr_ip=camera.nvr_ip,
        stream_type=camera.stream_type,
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
    return _to_detail(camera, stream_manager)


@router.post("", response_model=CameraDetail, status_code=201)
def create_camera(payload: CameraCreateRequest):
    """Register a new camera on an NVR channel (1-8) at runtime. Persisted
    to the camera registry file, so it survives a backend restart."""
    camera_service = get_camera_service()
    stream_manager = get_stream_manager()
    try:
        camera = camera_service.add_camera(
            name=payload.name,
            channel=payload.channel,
            host=payload.host,
            port=payload.port,
            username=payload.username,
            password=payload.password,
            stream_type=payload.stream_type,
        )
    except CameraChannelTakenError as exc:
        raise HTTPException(status_code=409, detail=str(exc)) from exc
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc

    return _to_detail(camera, stream_manager)


@router.delete("/{camera_id}", status_code=204)
async def delete_camera(camera_id: str) -> Response:
    """Stop any running stream for this camera, then remove it from the
    registry. 404 if the camera_id is unknown."""
    camera_service = get_camera_service()
    stream_manager = get_stream_manager()

    if not camera_service.exists(camera_id):
        raise HTTPException(status_code=404, detail=f"Unknown camera_id '{camera_id}'")

    await stream_manager.stop_stream(camera_id)
    camera_service.remove_camera(camera_id)
    return Response(status_code=204)


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
