# Handoff: Stage 1 → Stage 2

Backend implementation is complete for Stage 1. The next stage is React
frontend integration.

**Do not recreate this backend.** It already exists at `backend/` in this
ZIP, fully implemented. Your job is to connect the existing React frontend
(`src/`) to it — you are not building FastAPI, FFmpeg, or the RTSP/HLS
pipeline from scratch.

## What was implemented (Stage 1)

- A FastAPI backend at `backend/` (Python, no Docker, runs via
  `uvicorn app.main:app --reload`).
- A camera registry with exactly one real camera: `CAM-CPPLUS-001`
  (CP PLUS NVR, model `CP-UNR-108F1`, Channel 1 — the only channel that
  has been physically verified so far, per the original request).
- An RTSP → HLS pipeline: FastAPI shells out to FFmpeg to transcode the
  NVR's RTSP stream into a rolling HLS playlist, which FastAPI then serves
  over plain HTTP.
- A stream manager that lazily starts FFmpeg on first request, reuses the
  same process for concurrent requests (never spawns duplicates), reaps
  idle streams after `STREAM_IDLE_TIMEOUT_SECONDS`, and reports a real
  `starting` / `online` / `offline` / `error` status.
- Full API documented in `API_CONTRACT.md` — read that before writing any
  frontend code against this backend.
- Security: credentials live only in `backend/.env` (never returned by any
  endpoint, never logged in plaintext), camera IDs and HLS filenames are
  validated to prevent path traversal / arbitrary file access.

## Where the backend is

`backend/` at the root of this ZIP, alongside the existing `src/` frontend.
It has not touched anything under `src/`.

## How to start it

```bash
cd backend
python -m venv .venv && source .venv/bin/activate   # or .venv\Scripts\activate on Windows
pip install -r requirements.txt
cp .env.example .env   # then fill in NVR_USERNAME / NVR_PASSWORD
uvicorn app.main:app --reload
```

Runs on `http://localhost:8000` by default. Full details in `README.md`.

## What endpoints exist

See `API_CONTRACT.md` for the full contract with example JSON. Summary:

- `GET /health`
- `GET /api/cameras`
- `GET /api/cameras/{camera_id}`
- `GET /api/cameras/{camera_id}/status`
- `GET /api/cameras/{camera_id}/stream` ← starts the stream, returns the HLS URL
- `GET /api/streams/{camera_id}/index.m3u8` ← give this URL to hls.js
- `GET /api/streams/{camera_id}/{segment}.ts` ← hls.js fetches these automatically

## Camera 1 ID

`CAM-CPPLUS-001` — this is the only real camera configured right now.

## How the HLS stream works (short version)

1. Frontend calls `GET /api/cameras/CAM-CPPLUS-001/stream`.
2. Backend lazily starts FFmpeg (if not already running) pulling RTSP from
   the NVR and writing a rolling HLS playlist to disk.
3. Backend returns a **relative** `streamUrl` like
   `/api/streams/CAM-CPPLUS-001/index.m3u8`.
4. Frontend prefixes it with the backend base URL and hands it to hls.js
   (or a native `<video>` tag on Safari).
5. Status may briefly be `"starting"` — handle that in the UI (spinner),
   don't treat it as an error.

## What remains for frontend integration (your job)

This is intentionally NOT done yet:

- Add `hls.js` as a frontend dependency (`npm install hls.js`).
- Add a `VITE_API_BASE_URL` env var (e.g. `.env` → `VITE_API_BASE_URL=http://localhost:8000`)
  and read it wherever the backend is called.
- Build (or extend) a `LiveCameraPlayer`-style component that:
  - calls `GET /api/cameras/{id}/stream`
  - initializes `hls.js` (or native HLS) against the returned URL
  - shows a connecting/loading state while status is `"starting"`
  - shows a clear error state if status is `"error"` (surface the
    `detail` message, it's safe to show — never contains credentials)
- Wire the real camera into:
  - **Video Surveillance → Live View** (`src/modules/video-surveillance/components/liveView/CameraTile.tsx`,
    `CameraGrid.tsx`) — likely alongside/instead of one of the existing
    mock camera tiles.
  - **Live Monitoring → Camera Wall** (check `src/modules/live-monitoring/`
    for the relevant camera-wall component — inspect the module before
    assuming a filename).
  - Optionally, the dashboard camera preview widget, if one exists and
    fits without a large refactor.
- Decide how to represent the fact that only 1 of the NVR's 8 channels is
  wired up (e.g. keep the other 7 "camera" slots as the existing mock
  data / a "not connected" placeholder rather than pretending they're
  live).

## Which existing frontend files you should inspect first

- `src/modules/video-surveillance/components/liveView/CameraTile.tsx`
- `src/modules/video-surveillance/components/liveView/CameraGrid.tsx`
- `src/modules/video-surveillance/types/index.ts` (existing Camera type —
  decide whether/how to extend it for a `streamUrl`/`status` from the
  real backend without breaking the mock-data shape)
- `src/mock/` (existing mock camera data — do not delete it; the new real
  camera should be additive)
- Whatever live-monitoring component renders the "Camera Wall" — inspect
  `src/modules/live-monitoring/components/` (it wasn't touched in Stage 1
  so its exact structure wasn't re-verified against this specific
  requirement — confirm the actual file before wiring it up)

## What must NOT be changed

Everything the original Stage 1 prompt protected still applies to you too:
- Don't redesign the dashboard, sidebar, colors, typography, or layouts.
- Don't remove existing pages/modules/routes.
- Don't globally replace the existing mock camera data — add the real
  camera alongside it.
- Don't touch Access Control, Fire Alarm, Device Management, AI Analytics,
  Reports, Settings, or auth unless there's an unavoidable shared config
  change (and if so, document it).
- Don't rewrite `backend/` — if something is genuinely wrong with it, fix
  it minimally and note what you changed and why; don't restart it from
  scratch.
- No Docker.

## How to test the connection

1. Start the backend (`uvicorn app.main:app --reload`).
2. `curl http://localhost:8000/health` → confirm `{"status":"ok",...}`.
3. `curl http://localhost:8000/api/cameras/CAM-CPPLUS-001/stream` → confirm
   you get a `streamUrl` back.
4. Start the frontend dev server, open the Live View / Camera Wall page,
   confirm the video element actually renders frames (not just a
   placeholder) once you've wired hls.js in.
5. If nothing plays: check `backend/streams/CAM-CPPLUS-001/ffmpeg.log`
   before assuming it's a frontend bug — most likely causes are wrong NVR
   credentials or FFmpeg not installed, both backend-side.

## Known limitations (be honest with the user about these)

- Only Channel 1 (`CAM-CPPLUS-001`) is wired up. Channels 2–8 exist on the
  NVR but are not implemented — extending `camera_service.py`'s registry
  and adding channel-specific env vars is straightforward but was
  explicitly out of scope for Stage 1.
- No authentication on the backend API yet.
- No recording/playback of the real feed — live view only.
- **The real RTSP → FFmpeg → HLS pipeline has NOT been tested against the
  actual NVR by Claude.** The sandbox this was built in has no network
  access and no FFmpeg binary available to install, so end-to-end
  streaming could not be exercised here. Everything that *could* be
  verified without those two things was verified — see "Testing
  performed" in the Stage 1 final report. **You (or the user) should run
  the manual VLC-against-the-backend check in `README.md` → "Testing the
  real camera end-to-end" before assuming the pipeline works.**
- Status reporting for `"online"` is based on the HLS playlist file
  existing on disk, not deep frame-level health checks — good enough for
  this stage but worth knowing.
