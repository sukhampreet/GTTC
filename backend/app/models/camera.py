"""
Internal camera domain model.

This is intentionally separate from the API schemas (app/schemas/camera.py):
the model can carry internal-only fields (never serialized to clients)
while the schema defines exactly what the API is allowed to return.
"""

from __future__ import annotations

from dataclasses import dataclass, field
from enum import Enum


class StreamProtocol(str, Enum):
    RTSP = "RTSP"


class CameraStatus(str, Enum):
    STARTING = "starting"
    ONLINE = "online"
    OFFLINE = "offline"
    ERROR = "error"


@dataclass
class Camera:
    """A single configured camera (maps 1:1 to one NVR channel)."""

    id: str
    name: str
    channel: int
    nvr_model: str
    nvr_ip: str
    protocol: StreamProtocol = StreamProtocol.RTSP
    stream_type: str = "main"
    # Only Channel 1 is physically verified today (see context/handoff docs).
    verified: bool = False
    # Not serialized in any API response. Populated lazily by the stream
    # manager; kept here only for convenient in-process lookups.
    metadata: dict = field(default_factory=dict)
