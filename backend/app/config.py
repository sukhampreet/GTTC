"""
Central configuration for the GTTC backend.

All values are loaded from environment variables (via a local .env file in
development). Nothing sensitive (NVR credentials) is hardcoded here, and
nothing sensitive is ever exposed through the API.

See .env.example for the full list of variables and sane defaults.
"""

from __future__ import annotations

from functools import lru_cache
from pathlib import Path

from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


BACKEND_ROOT = Path(__file__).resolve().parent.parent


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=str(BACKEND_ROOT / ".env"),
        env_file_encoding="utf-8",
        extra="ignore",
    )

    # --- Service ---------------------------------------------------------
    backend_host: str = Field(default="0.0.0.0", alias="BACKEND_HOST")
    backend_port: int = Field(default=8000, alias="BACKEND_PORT")
    service_name: str = Field(default="gttc-backend", alias="SERVICE_NAME")

    # --- CORS --------------------------------------------------------------
    # Comma-separated list of allowed origins, e.g.
    # CORS_ORIGINS=http://localhost:5173,http://127.0.0.1:5173
    cors_origins: str = Field(default="http://localhost:5173", alias="CORS_ORIGINS")

    # --- NVR / Camera (CP PLUS) --------------------------------------------
    nvr_host: str = Field(default="192.168.1.245", alias="NVR_HOST")
    nvr_rtsp_port: int = Field(default=554, alias="NVR_RTSP_PORT")
    nvr_username: str = Field(default="", alias="NVR_USERNAME")
    nvr_password: str = Field(default="", alias="NVR_PASSWORD")
    nvr_channel: int = Field(default=1, alias="NVR_CHANNEL")
    nvr_stream_type: int = Field(default=0, alias="NVR_STREAM_TYPE")  # 0 = main, 1 = sub
    nvr_model: str = Field(default="CP-UNR-108F1", alias="NVR_MODEL")

    # --- FFmpeg / HLS --------------------------------------------------------
    ffmpeg_path: str = Field(default="ffmpeg", alias="FFMPEG_PATH")
    # x264 preset used for the live transcode. "veryfast" balances CPU cost
    # against compression; "ultrafast" shaves a little more encoder-side
    # latency but at a real quality/bitrate-efficiency cost, so it's exposed
    # here rather than hardcoded so it can be tuned per demo machine.
    ffmpeg_preset: str = Field(default="veryfast", alias="FFMPEG_PRESET")
    stream_directory: str = Field(default="streams", alias="STREAM_DIRECTORY")
    hls_segment_seconds: int = Field(default=1, alias="HLS_SEGMENT_SECONDS")
    hls_list_size: int = Field(default=3, alias="HLS_LIST_SIZE")
    # How long (seconds) the API will wait for the first HLS playlist/segment
    # to appear after starting FFmpeg before responding with "starting".
    hls_startup_timeout_seconds: int = Field(default=8, alias="HLS_STARTUP_TIMEOUT_SECONDS")
    # Kill and clean up a stream if nobody has requested its playlist/segments
    # for this many seconds (0 disables idle shutdown).
    stream_idle_timeout_seconds: int = Field(default=120, alias="STREAM_IDLE_TIMEOUT_SECONDS")

    @property
    def cors_origin_list(self) -> list[str]:
        return [o.strip() for o in self.cors_origins.split(",") if o.strip()]

    @property
    def stream_directory_path(self) -> Path:
        p = Path(self.stream_directory)
        if not p.is_absolute():
            p = BACKEND_ROOT / p
        return p

    def rtsp_url(self) -> str:
        """Build the full authenticated RTSP URL. Never log or return this as-is."""
        return (
            f"rtsp://{self.nvr_username}:{self.nvr_password}@"
            f"{self.nvr_host}:{self.nvr_rtsp_port}/cam/realmonitor"
            f"?channel={self.nvr_channel}&subtype={self.nvr_stream_type}"
        )

    def redacted_rtsp_url(self) -> str:
        """Safe-to-log version of the RTSP URL with credentials masked."""
        return (
            f"rtsp://***:***@{self.nvr_host}:{self.nvr_rtsp_port}/cam/realmonitor"
            f"?channel={self.nvr_channel}&subtype={self.nvr_stream_type}"
        )


@lru_cache
def get_settings() -> Settings:
    return Settings()
