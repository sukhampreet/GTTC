from __future__ import annotations

import os
import sys
import tempfile
from pathlib import Path

# Ensure `app` is importable when pytest is run from the backend/ directory.
sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

# Force predictable settings for tests, independent of any local .env.
os.environ.setdefault("NVR_HOST", "192.168.1.245")
os.environ.setdefault("NVR_USERNAME", "test-user")
os.environ.setdefault("NVR_PASSWORD", "test-pass")
os.environ.setdefault("FFMPEG_PATH", "ffmpeg-not-installed-in-ci")
# Point the persisted camera registry at a throwaway file so tests never
# read/write the real backend/app/data/cameras.json.
os.environ.setdefault(
    "CAMERA_REGISTRY_PATH",
    str(Path(tempfile.mkdtemp(prefix="gttc-test-cameras-")) / "cameras.json"),
)

import pytest
from fastapi.testclient import TestClient

from app.main import create_app


@pytest.fixture()
def client() -> TestClient:
    app = create_app()
    with TestClient(app) as c:
        yield c
