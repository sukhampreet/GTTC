from __future__ import annotations

from pydantic import BaseModel, ConfigDict, Field


class CameraSummary(BaseModel):
    """Public-facing camera representation. Never includes credentials or
    the raw RTSP URL."""

    model_config = ConfigDict(populate_by_name=True)

    id: str
    name: str
    channel: int
    nvr_model: str = Field(serialization_alias="nvrModel")
    status: str
    protocol: str
    verified: bool


class CameraListResponse(BaseModel):
    cameras: list[CameraSummary]


class CameraDetail(CameraSummary):
    nvr_ip: str = Field(serialization_alias="nvrIp")
    stream_type: str = Field(serialization_alias="streamType")


class CameraStatusResponse(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    camera_id: str = Field(serialization_alias="cameraId")
    status: str
    detail: str | None = None


class ErrorResponse(BaseModel):
    detail: str
