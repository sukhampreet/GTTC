# GTTC Backend

FastAPI backend that relays the real CP PLUS NVR camera feed (RTSP) into a
browser-playable HLS stream for the GTTC Indigenous Smart Security Central
Control Platform frontend.

**Stage:** Stage 1 of a 4-stage build (backend + streaming foundation).
Frontend integration happens in Stage 2 — see `CLAUDE_2_HANDOFF.md` and
`API_CONTRACT.md`.

## Architecture

```
CP PLUS Camera → CP-UNR-108F1 NVR (192.168.1.245:554)
    → RTSP
    → FastAPI backend (this project)
    → FFmpeg (RTSP → HLS transcode, one process per camera, started lazily)
    → HLS files served by FastAPI
    → React frontend (hls.js) — built in Stage 2
```

Code layout:

```
backend/
  app/
    main.py              FastAPI app, CORS, lifespan (startup/shutdown)
    config.py             Settings loaded from .env (pydantic-settings)
    api/
      health.py           GET /health
      cameras.py           GET /api/cameras, /{id}, /{id}/status
      streams.py           GET /api/cameras/{id}/stream, HLS file serving
    models/
      camera.py            Internal camera dataclass
    schemas/
      camera.py, stream.py Public API request/response models (Pydantic)
    services/
      camera_service.py    Camera registry (currently: 1 camera)
      stream_service.py    One-FFmpeg-process-per-camera manager, lazy
                            start, idle reaping, status tracking
      ffmpeg_service.py    FFmpeg availability check, command building,
                            Windows-compatible subprocess start/stop
    utils/
      logging.py           Logging setup (redacts RTSP credentials)
  streams/                 Generated HLS output (gitignored, one folder
                            per camera_id)
  tests/                   Pytest suite (see "Testing" below)
  requirements.txt
  .env.example
  API_CONTRACT.md          For the frontend-integration stage
  CLAUDE_2_HANDOFF.md      For the frontend-integration stage
```

## Requirements

- Python 3.11+ (3.10 likely works too; not tested below that)
- FFmpeg installed and on PATH (or pointed to via `FFMPEG_PATH`)
- Windows, macOS, or Linux — subprocess management is written to be
  Windows-compatible (no bash/systemd/Linux-only assumptions), since the
  primary dev environment is Windows

## Setup (Windows)

```powershell
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
copy .env.example .env
# edit .env and fill in NVR_USERNAME / NVR_PASSWORD
```

## Setup (macOS / Linux)

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
# edit .env and fill in NVR_USERNAME / NVR_PASSWORD
```

## Installing FFmpeg (Windows)

1. Download a Windows build from https://www.gyan.dev/ffmpeg/builds/ (the
   "release essentials" build is enough).
2. Extract it, e.g. to `C:\ffmpeg`.
3. Add `C:\ffmpeg\bin` to your `PATH` environment variable (System
   Properties → Environment Variables), or set `FFMPEG_PATH` in `.env` to
   the full path, e.g. `C:\ffmpeg\bin\ffmpeg.exe`.
4. Verify:
   ```powershell
   ffmpeg -version
   ```
   If this prints a version banner, you're set. If the backend can't find
   FFmpeg, `GET /api/cameras/{id}/status` will report `"error"` with a
   clear message rather than crashing.

## Environment configuration

See `.env.example` for the full list. The important ones:

| Variable | Purpose |
|---|---|
| `NVR_HOST` | NVR IP, default `192.168.1.245` |
| `NVR_RTSP_PORT` | default `554` |
| `NVR_USERNAME` / `NVR_PASSWORD` | NVR login — **never commit these** |
| `NVR_CHANNEL` | `1` (only channel currently verified) |
| `CORS_ORIGINS` | comma-separated frontend origins, default `http://localhost:5173` |
| `FFMPEG_PATH` | `ffmpeg` if on PATH, else a full path |
| `STREAM_IDLE_TIMEOUT_SECONDS` | stop an unwatched stream after this long (default 120s, `0` disables) |

## Running

```bash
uvicorn app.main:app --reload
```

Then:
- Docs / interactive API explorer: http://localhost:8000/docs
- Health check: http://localhost:8000/health

## Verifying the health endpoint

```bash
curl http://localhost:8000/health
# {"status":"ok","service":"gttc-backend"}
```

## Testing the real camera end-to-end

1. Make sure `.env` has real `NVR_USERNAME` / `NVR_PASSWORD`.
2. Start the backend (`uvicorn app.main:app --reload`).
3. `curl http://localhost:8000/api/cameras/CAM-CPPLUS-001/stream`
   → should return `status: "starting"` (or `"online"` if you retry a
   moment later).
4. `curl http://localhost:8000/api/cameras/CAM-CPPLUS-001/status`
   → poll until `status` is `"online"`.
5. Open `http://localhost:8000/api/streams/CAM-CPPLUS-001/index.m3u8`
   in VLC ("Open Network Stream") to confirm the backend-relayed feed
   plays — this proves the FastAPI → FFmpeg → HLS pipeline end-to-end
   without needing the frontend at all.

**This step (`5`) was NOT run by Claude in this sandbox — see "Testing
performed" in the final report below / the handoff doc. The sandbox this
was built in has no network access and no FFmpeg binary installed, so the
real NVR connection could not be exercised here.** Everything up to and
including FFmpeg-not-found handling was verified by other means (see
Testing).

## Troubleshooting RTSP

- Confirm the same RTSP URL plays in VLC first (Media → Open Network
  Stream → `rtsp://user:pass@192.168.1.245:554/cam/realmonitor?channel=1&subtype=0`).
- If VLC works but the backend doesn't, check `streams/CAM-CPPLUS-001/ffmpeg.log`
  for the FFmpeg error output.
- Common causes: wrong username/password, NVR only allows one concurrent
  RTSP client (close VLC while testing the backend), firewall blocking
  port 554.

## Troubleshooting FFmpeg

- `ffmpeg -version` must work from the same shell/user the backend runs as.
- If `FFMPEG_PATH` is wrong, `/api/cameras/{id}/status` reports
  `status: "error"` with the configured path in the message.

## Troubleshooting HLS

- `GET /api/streams/{id}/index.m3u8` returns `503` until the first
  segment is written — this is expected for the first few seconds.
- If it stays in `"error"` status past `HLS_STARTUP_TIMEOUT_SECONDS`,
  check `ffmpeg.log` in that camera's stream folder.
- Stale files are cleared automatically each time a stream (re)starts.

## Network requirements

The machine running this backend must be able to reach `192.168.1.245:554`
directly (same LAN as the NVR, or routed access). No inbound ports need to
be opened on the NVR beyond the existing RTSP port.

## How the frontend (Claude 2) should connect

See `API_CONTRACT.md` for the full contract, and `CLAUDE_2_HANDOFF.md` for
what's already done vs. what's left to wire up in the React app.

## Testing

```bash
cd backend
pytest
```

The suite covers: app startup, `/health`, camera list/detail/status
(including a 404 for unknown IDs and confirming credentials are never
serialized), the stream endpoint's response shape, HLS path-traversal /
extension validation, settings loading from environment variables, and
FFmpeg-availability detection. See "Testing performed" below for what
could and couldn't actually be executed in the environment this was built
in.
