"""
GTTC backend - FastAPI application entrypoint.

Run with:
    uvicorn app.main:app --reload

See README.md for full setup instructions and API_CONTRACT.md for the
API the frontend (Claude 2's stage) should integrate against.
"""

from __future__ import annotations

import asyncio
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api import cameras, health, streams
from app.config import get_settings
from app.services.camera_service import get_camera_service
from app.services.stream_service import get_stream_manager
from app.utils.logging import get_logger

logger = get_logger("main")

_IDLE_REAP_INTERVAL_SECONDS = 30


async def _idle_reaper_loop() -> None:
    stream_manager = get_stream_manager()
    while True:
        await asyncio.sleep(_IDLE_REAP_INTERVAL_SECONDS)
        try:
            await stream_manager.reap_idle_streams()
        except Exception:  # pragma: no cover - defensive background task
            logger.exception("Error while reaping idle streams")


@asynccontextmanager
async def lifespan(app: FastAPI):
    cameras_registered = get_camera_service().list_cameras()
    logger.info(
        "GTTC backend starting up (%d camera(s) registered: %s)",
        len(cameras_registered), ", ".join(c.id for c in cameras_registered),
    )
    reaper_task = asyncio.create_task(_idle_reaper_loop())
    try:
        yield
    finally:
        reaper_task.cancel()
        logger.info("GTTC backend shutting down - stopping all camera streams")
        await get_stream_manager().stop_all()


def create_app() -> FastAPI:
    settings = get_settings()
    app = FastAPI(
        title="GTTC Backend",
        description=(
            "Backend + CP PLUS RTSP-to-HLS streaming foundation for the "
            "GTTC Indigenous Smart Security Central Control Platform."
        ),
        version="0.1.0",
        lifespan=lifespan,
    )

    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.cors_origin_list,
        allow_credentials=True,
        allow_methods=["GET", "POST", "DELETE"],
        allow_headers=["*"],
    )

    app.include_router(health.router)
    app.include_router(cameras.router)
    app.include_router(streams.router)

    return app


app = create_app()
