from __future__ import annotations

from pydantic import BaseModel, ConfigDict, Field


class StreamResponse(BaseModel):
    """Browser-facing stream descriptor. Never contains the RTSP URL."""

    model_config = ConfigDict(populate_by_name=True)

    camera_id: str = Field(serialization_alias="cameraId")
    stream_type: str = Field(default="hls", serialization_alias="streamType")
    # Relative path (mounted under the same backend origin) to the HLS
    # playlist, e.g. "/api/streams/CAM-CPPLUS-001/index.m3u8"
    stream_url: str = Field(serialization_alias="streamUrl")
    status: str
