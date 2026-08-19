from __future__ import annotations

from typing import Literal

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


class CameraCreateRequest(BaseModel):
    """Body for POST /api/cameras. Credentials are write-only: they're
    used to build the camera's RTSP URL and stored in the registry, but -
    same rule as CameraDetail - never echoed back in any response."""

    model_config = ConfigDict(populate_by_name=True)

    name: str = Field(min_length=1)
    channel: int = Field(ge=1, le=8, description="NVR channel, 1-8")
    host: str = Field(min_length=1, description="NVR host, or the camera's own IP for direct-to-camera")
    port: int = Field(default=554)
    username: str = Field(default="")
    password: str = Field(default="")
    stream_type: Literal["main", "sub"] = Field(default="main", alias="streamType")


class CameraStatusResponse(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    camera_id: str = Field(serialization_alias="cameraId")
    status: str
    detail: str | None = None


class ErrorResponse(BaseModel):
    detail: str
