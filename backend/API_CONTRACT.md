# GTTC Backend — API Contract

This document is written for **Claude 2** (frontend integration stage). It
describes exactly how the existing React frontend should consume this
backend. You should not need to read the backend source code to integrate
against it — everything you need is here.

## Base URL

In local development the backend runs at:

```
http://localhost:8000
```

The port is configurable via `BACKEND_PORT` in `backend/.env`. The frontend
should read the base URL from an environment variable (e.g.
`VITE_API_BASE_URL`) rather than hardcoding it — that env var does not exist
yet and is intentionally left for you to add in the frontend stage.

## Authentication

**None.** There is no auth on this backend yet. Do not add credentials to
any frontend request against these endpoints.

## CORS

The backend allows the origin configured in `backend/.env` via
`CORS_ORIGINS` (default `http://localhost:5173`, i.e. the Vite dev server).
If your dev server runs on a different port, update that value.

## The golden rule

> **The frontend must NEVER connect directly to the CP PLUS RTSP URL.**
> **The frontend must ONLY talk to this FastAPI backend, over HTTP(S).**
> FastAPI is the only thing that ever touches the RTSP source; it converts
> it to HLS, which is what the browser actually plays.

---

## Endpoints

### `GET /health`

Liveness check.

```json
{ "status": "ok", "service": "gttc-backend" }
```

### `GET /api/cameras`

List all configured cameras. Today this returns exactly **one** camera.

```json
{
  "cameras": [
    {
      "id": "CAM-CPPLUS-001",
      "name": "CP PLUS Camera 01",
      "channel": 1,
      "nvrModel": "CP-UNR-108F1",
      "status": "offline",
      "protocol": "RTSP",
      "verified": true
    }
  ]
}
```

Notes:
- `status` reflects whatever is currently known — see the Status section
  below. It will read `"offline"` until something calls the `/stream`
  endpoint for that camera at least once (see the flow at the bottom).
- No username, password, or RTSP URL ever appears in this or any response.

### `GET /api/cameras/{camera_id}`

Detail for one camera. 404 if `camera_id` is unknown.

```json
{
  "id": "CAM-CPPLUS-001",
  "name": "CP PLUS Camera 01",
  "channel": 1,
  "nvrModel": "CP-UNR-108F1",
  "status": "offline",
  "protocol": "RTSP",
  "verified": true,
  "nvrIp": "192.168.1.245",
  "streamType": "main"
}
```

404 body:
```json
{ "detail": "Unknown camera_id 'CAM-XYZ'" }
```

### `GET /api/cameras/{camera_id}/status`

Lightweight status check that does **not** start a stream if one isn't
already running.

```json
{
  "cameraId": "CAM-CPPLUS-001",
  "status": "online",
  "detail": null
}
```

`status` is one of: `"starting"`, `"online"`, `"offline"`, `"error"`.
- `"offline"` — no stream has been requested yet for this camera.
- `"starting"` — FFmpeg was just launched, no HLS playlist yet.
- `"online"` — HLS playlist exists and is being updated.
- `"error"` — FFmpeg isn't installed, couldn't reach the NVR, or the
  process died. `detail` will contain a human-readable explanation (never
  credentials).

### `GET /api/cameras/{camera_id}/stream` — **this is the important one**

This is the endpoint that actually **starts** the camera stream (lazily,
reusing an already-running stream if one exists) and returns the HLS URL
to play.

```json
{
  "cameraId": "CAM-CPPLUS-001",
  "streamType": "hls",
  "streamUrl": "/api/streams/CAM-CPPLUS-001/index.m3u8",
  "status": "starting"
}
```

- `streamUrl` is a **relative path**. Prefix it with the backend base URL
  to get the full URL, e.g. `http://localhost:8000/api/streams/CAM-CPPLUS-001/index.m3u8`.
- The first call after a period of inactivity will typically return
  `status: "starting"` — FFmpeg takes a second or two to produce the first
  HLS segment. Poll `GET /api/cameras/{camera_id}/status` (or just hand the
  `streamUrl` to hls.js — it will retry) until `status` is `"online"`.
- Calling this endpoint again while a stream is already running is safe
  and cheap — it will **not** spawn a second FFmpeg process; it just
  returns the same `streamUrl`.

### `GET /api/streams/{camera_id}/index.m3u8`

The actual HLS playlist. Serve this URL directly to hls.js (or a native
`<video>` tag on Safari, which supports HLS natively).

- Returns `503` with a JSON error body if the stream hasn't been started
  yet (call `/stream` first — see the flow below).
- Content-Type: `application/vnd.apple.mpegurl`

### `GET /api/streams/{camera_id}/{segment_name}.ts`

Individual HLS video segments, referenced automatically by the playlist.
You should never need to construct these URLs by hand — hls.js resolves
them relative to the playlist URL automatically.

---

## Recommended frontend flow (hls.js)

```
1. GET /api/cameras
     → find the camera you want, e.g. CAM-CPPLUS-001

2. GET /api/cameras/CAM-CPPLUS-001/stream
     → { streamUrl: "/api/streams/CAM-CPPLUS-001/index.m3u8", status: "starting" }

3. Build the full URL:
     const src = `${API_BASE_URL}${streamUrl}`

4. If Hls.isSupported():
     const hls = new Hls();
     hls.loadSource(src);
     hls.attachMedia(videoElement);
   else if videoElement.canPlayType('application/vnd.apple.mpegurl'):
     // Safari - native HLS support
     videoElement.src = src;

5. Handle the "starting" state in the UI (spinner / "connecting..." on the
   CameraTile) until playback actually begins. hls.js will keep retrying
   404s on the playlist for the first second or two while FFmpeg spins up
   — this is expected and does not need special handling beyond a normal
   Hls.js `Hls.Events.ERROR` listener with fatal-vs-non-fatal handling.

6. Optional: poll GET /api/cameras/CAM-CPPLUS-001/status every few seconds
   to reflect "starting" / "online" / "error" in the UI without relying
   solely on hls.js error events.
```

## Error responses

All error responses follow FastAPI's default shape:

```json
{ "detail": "human readable message" }
```

Status codes used: `404` (unknown camera or resource), `400` (invalid
stream filename requested), `503` (stream not ready yet).

## What this backend does NOT do (yet)

- No authentication/authorization.
- No websocket/push status updates — status is poll-based.
- No support for camera channels 2–8 (only Channel 1 / `CAM-CPPLUS-001`
  is wired up; see `CLAUDE_2_HANDOFF.md` for how the frontend should treat
  the other channels for now — likely: hide them / show "not connected").
- No recording/playback of the real feed (only live HLS).
