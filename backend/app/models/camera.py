"""
Internal camera domain model.

This is intentionally separate from the API schemas (app/schemas/camera.py):
the model can carry internal-only fields (never serialized to clients)
while the schema defines exactly what the API is allowed to return.
"""

from __future__ import annotations

from dataclasses import dataclass, field
from enum import Enum
from urllib.parse import quote


class StreamProtocol(str, Enum):
    RTSP = "RTSP"


class CameraStatus(str, Enum):
    STARTING = "starting"
    ONLINE = "online"
    OFFLINE = "offline"
    ERROR = "error"


@dataclass
class Camera:
    """A single configured camera (maps 1:1 to one NVR channel, or to a
    direct-to-camera connection with channel usually 1)."""

    id: str
    name: str
    channel: int
    nvr_model: str
    nvr_ip: str
    # RTSP connection details. These are per-camera (not global settings)
    # because different cameras may share an NVR host (distinct channel) or
    # connect directly to their own host - see rtsp_url() below.
    port: int = 554
    username: str = ""
    password: str = ""
    protocol: StreamProtocol = StreamProtocol.RTSP
    stream_type: str = "main"
    # Only Channel 1 is physically verified today (see context/handoff docs).
    verified: bool = False
    # Not serialized in any API response. Populated lazily by the stream
    # manager; kept here only for convenient in-process lookups.
    metadata: dict = field(default_factory=dict)

    @property
    def _subtype(self) -> int:
        """CP PLUS RTSP `subtype` query param: 0 = main stream, 1 = sub."""
        return 0 if self.stream_type == "main" else 1

    def rtsp_url(self) -> str:
        """Build this camera's full authenticated RTSP URL.

        Internal use only (fed straight to FFmpeg) - never log or return
        this as-is. Use redacted_rtsp_url() for anything user/log-facing.

        Username/password are percent-encoded (safe='') since they're
        user-supplied and may contain characters that are meaningful in a
        URL (e.g. '@', ':', '/', '#') - unencoded, those would break the
        rtsp://user:pass@host part of the URL. Host, port and the query
        string are left as-is; they're not user-supplied credentials and
        encoding them would break the URL instead of protecting it.
        """
        user = quote(self.username, safe="")
        pw = quote(self.password, safe="")
        return (
            f"rtsp://{user}:{pw}@"
            f"{self.nvr_ip}:{self.port}/cam/realmonitor"
            f"?channel={self.channel}&subtype={self._subtype}"
        )

    def redacted_rtsp_url(self) -> str:
        """Safe-to-log version of rtsp_url() with credentials masked."""
        return (
            f"rtsp://***:***@{self.nvr_ip}:{self.port}/cam/realmonitor"
            f"?channel={self.channel}&subtype={self._subtype}"
        )
