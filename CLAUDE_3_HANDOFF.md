Stage 2 frontend integration is complete. Stage 3 must perform full end-to-end integration testing and fix only issues required for the real CP PLUS Camera 1 feed to work reliably.

# Handoff: Stage 2 → Stage 3

## 1. Stage 1 backend already existed

The FastAPI + FFmpeg + RTSP→HLS backend at `backend/` was built in Stage 1 and is the source of truth. It was **not** rebuilt, redesigned, or refactored in Stage 2 — see section 5 below for the one exception.

## 2. Stage 2 frontend integration is complete

The existing 12-sprint React/TypeScript frontend now consumes the Stage 1 backend for the one real camera (`CAM-CPPLUS-001`, CP PLUS NVR `CP-UNR-108F1`, Channel 1). Everything else — layout, sidebar, routing, other modules, existing mock camera data — is unchanged.

## 3. Frontend files created

- `src/config/api.ts` — `API_BASE_URL` (reads `VITE_API_BASE_URL`, falls back to `http://localhost:8000`) and the `REAL_CAMERA_ID` constant (`CAM-CPPLUS-001`).
- `src/lib/api/cameraApi.ts` — thin typed fetch client for exactly the endpoints in `backend/API_CONTRACT.md` (`getCameras`, `getCamera`, `getCameraStatus`, `getCameraStream`, `resolveStreamUrl`). No other frontend code should call `fetch` against the backend directly — route new calls through this file.
- `src/hooks/useCameraStream.ts` — React Query hook. Calls `GET /stream` once (`staleTime: Infinity`, so it doesn't re-trigger FFmpeg starts) and polls `GET /status` on a light interval (3s while not yet online, 10s once online) to reflect `starting` / `online` / `offline` / `error` without depending solely on hls.js error events, per the API contract's recommended flow.
- `src/components/media/LiveCameraPlayer.tsx` — the **one** shared player. Used by both Live View and Camera Wall (see §9/§10). Initializes `hls.js` when supported, falls back to native `<video>` HLS for Safari, retries the manifest a bounded number of times (8 retries, 1.5s apart) while FFmpeg is still producing the first segment, distinguishes fatal network/media/other hls.js errors, and cleans up the `Hls` instance / timers on unmount or camera-id change.
- `.env.example` — `VITE_API_BASE_URL=http://localhost:8000` only. No credentials.

## 4. Frontend files modified (additive only — no mock data removed, no unrelated code touched)

- `src/modules/video-surveillance/types/index.ts` — added **optional** `liveCameraId?: string` to `CameraRecord`. Undefined for every existing mock camera; only set on the one real entry.
- `src/modules/video-surveillance/mock/cameras.ts` — added one new `CameraRecord` entry for `CAM-CPPLUS-001` at the front of the array (so it's visible in the default 9-up grid). All 24 pre-existing mock cameras are untouched.
- `src/modules/video-surveillance/components/liveView/CameraTile.tsx` — if `camera.liveCameraId` is set, renders `LiveCameraPlayer` in the video area instead of the placeholder icon; the tile's Wifi/WifiOff badge is now driven by the player's live status (via `onStatusChange`) for that one tile only. Every other tile's logic is unchanged.
- `src/modules/video-surveillance/pages/LiveViewPage.tsx` — one-line description text update (no longer claims "no streaming backend").
- `src/modules/live-monitoring/types/index.ts` — added **optional** `liveCameraId?: string` to `LiveCameraTile`, same pattern.
- `src/modules/live-monitoring/mock/liveCameras.ts` — added one new entry for `CAM-CPPLUS-001` at the front of the array. All 36 pre-existing mock tiles are untouched.
- `src/modules/live-monitoring/components/cameraWall/CameraCard.tsx` — same `LiveCameraPlayer` integration pattern as `CameraTile`, including a `toDeviceStatus()` mapper so the existing 3-state (`online`/`offline`/`warning`) status badge can represent the backend's 4-state status (`starting` → shown as `warning`/"Connecting").
- `src/modules/live-monitoring/components/cameraWall/CameraWall.tsx`, `src/modules/live-monitoring/pages/CameraWallPage.tsx` — comment/description text only.
- `package.json` / `package-lock.json` — added `hls.js` dependency, ran `npm install`.

## 5. Backend files: left untouched

`backend/` was not modified at all — no code changes, no config changes. It was only exercised at runtime for testing (see §14). No exception to §3/§35 of the original instructions was needed; the API contract as documented was sufficient for the frontend integration.

## 6. How the frontend consumes FastAPI

`LiveCameraPlayer` → `useCameraStream(cameraId)` → `cameraApi.ts`:

1. `GET /api/cameras/{id}/stream` is called once per mount (React Query caches it, `staleTime: Infinity`) — this is the call that lazily starts FFmpeg server-side and returns the relative `streamUrl`.
2. `resolveStreamUrl()` prefixes it with `API_BASE_URL` to build the absolute HLS URL.
3. `GET /api/cameras/{id}/status` is polled afterward for a status string the UI can trust independent of hls.js.

No other endpoints are called by the frontend; `/api/streams/.../*.ts` segment files are never constructed by hand — hls.js resolves them from the manifest automatically, exactly as `API_CONTRACT.md` describes.

## 7. How HLS playback works

`LiveCameraPlayer` uses `Hls.isSupported()` to prefer `hls.js` everywhere it's supported, with a native-`<video>` fallback via `canPlayType('application/vnd.apple.mpegurl')` for Safari. On `Hls.Events.MANIFEST_PARSED` it marks the player `online` and calls `.play()` (best-effort — autoplay-block failures are swallowed since the `<video>` is muted/`playsInline`, which covers the common case). `Hls.Events.ERROR` distinguishes fatal network errors (→ bounded manual retry of `loadSource`/`startLoad`), fatal media errors (→ `hls.recoverMediaError()`), and other fatal errors (→ destroys the instance and shows the GTTC error state).

## 8. How "starting" is handled

This was treated as the most important behavioral requirement per the Stage 2 brief. `useCameraStream` surfaces the backend's `starting` status directly; `LiveCameraPlayer` never maps `starting` to an "Offline" UI state — it shows a spinner + "Connecting…" instead. The only two ways a tile shows "Offline"/error copy are (a) the backend explicitly returns `status: "offline"` (no stream requested yet — shouldn't normally happen once the player has mounted and called `/stream`), or (b) `status: "error"` (FFmpeg/NVR failure), in which case the backend's `detail` string is surfaced verbatim (confirmed safe — never contains credentials, per `API_CONTRACT.md`).

I verified this against the running backend (see §14): the sequence observed was exactly `offline` → `starting` → `error` (the last because this sandbox has no real NVR to reach), and at no point did the frontend logic collapse `starting` into `offline`.

## 9. Where Camera 1 appears

- **Primary:** Video Surveillance → Live View (`src/modules/video-surveillance/pages/LiveViewPage.tsx` → `CameraGrid` → `CameraTile`). It's the first camera in `cameraRecords`, so it's visible by default in every grid layout (1/4/9/16/25/36) without needing to change filters.
- **Secondary:** Live Monitoring → Camera Wall (`src/modules/live-monitoring/pages/CameraWallPage.tsx` → `CameraWall` → `CameraCard`). Same placement, first in `liveCameras`.
- **Not integrated — Dashboard.** See §12.

## 10. How Live View works

Unchanged page/grid/group-filter/search logic. `CameraGrid` still just slices `cameras` by the selected layout and renders a `CameraTile` per slot. The only change is inside `CameraTile`: when `camera.liveCameraId` is set, the video area renders `<LiveCameraPlayer cameraId={camera.liveCameraId} />` absolutely positioned inside the same aspect-video tile, instead of the static placeholder icon. Card dimensions, name/AI badge, REC badge, PTZ/snapshot/fullscreen buttons are all unchanged and still driven by the mock `CameraRecord` fields (recording, aiEnabled, hasPtz, etc. are static mock values for this camera today — Stage 3/4 can wire these to real backend data later if the backend ever exposes them).

## 11. How Camera Wall works

Same pattern as Live View, inside `CameraCard`. One addition: since `LiveCameraTile`'s status badge only supports 3 states (`online`/`offline`/`warning`) while the backend has 4, a small `toDeviceStatus()` helper in `CameraCard.tsx` maps `starting` → `warning` (labeled "Connecting" in the badge) and `error` → `offline`, so "starting" still never reads as a hard offline/red state in the wall's badge either.

## 12. Dashboard status: not integrated (deferred)

Inspected `src/modules/video-surveillance/components/dashboard/VideoSurveillanceLiveWidget.tsx` (rendered from `src/pages/dashboard/DashboardPage.tsx`). Its camera preview is a row of very small (aspect-video, ~80px) icon-only buttons across a 3-column grid summarizing up to 6 mock cameras — there isn't a single large "hero" preview slot suited to a real, actively-decoding `<video>`/hls.js instance without a larger layout change than Stage 2's "no redesign" constraint allows. Per the original Stage 2 instructions (§23): when integrating the Dashboard preview risks a layout change, prioritize Live View + Camera Wall and document the limitation instead — that's what was done here. `CAM-CPPLUS-001` is present in `cameraRecords`, so it already shows up as one of the six small preview tiles on the Dashboard, just without live video inside that specific tile (same static treatment as the mock tiles). This is a reasonable, low-risk starting point for Claude 3/4 to build a proper Dashboard preview slot if desired.

## 13. Build result

- `npx tsc -b` fails with **one pre-existing error**, unrelated to Stage 2: `src/modules/video-surveillance/mock/schedule.ts:10` — a `WeekDay` narrowing issue in an `Array.prototype.flatMap` call over mock schedule data. Confirmed via `git stash` that this error exists identically on the untouched Stage 1 tree (no Stage 2 file touches `schedule.ts`). Recommend Claude 3/4 fix this narrowly (it's a one-line type-narrowing fix in mock data, unrelated to camera/streaming work).
- `npx vite build` (bundler only, bypassing the `tsc -b` gate) **succeeds cleanly** — 3090 modules transformed, no errors — confirming all Stage 2 code compiles/bundles correctly. The only failure in `npm run build` (`tsc -b && vite build`) is the pre-existing `schedule.ts` error blocking the script before `vite build` even runs.

## 14. Lint result

`npm run lint` (oxlint) → **0 errors**, 3 pre-existing warnings (all `react/only-export-components` Fast Refresh warnings in files Stage 2 never touched: `Button.tsx`, `GridLayoutSwitcher.tsx`). No new warnings introduced by Stage 2 changes.

## 15. Physical RTSP → GTTC testing performed

I do not have LAN access to the real NVR (`192.168.1.245`) from this sandbox, so the actual physical camera was not exercised — consistent with the Stage 1 handoff's own caveat.

What I **did** verify, end-to-end against the real Stage 1 backend code (FFmpeg was available in this sandbox and actually invoked):

```
cd backend && python3 -m venv .venv && .venv/bin/pip install -r requirements.txt
cp .env.example .env   # dummy NVR_USERNAME/NVR_PASSWORD — no real NVR reachable here
.venv/bin/uvicorn app.main:app --host 0.0.0.0 --port 8000
```

- `GET /health` → `{"status":"ok","service":"gttc-backend"}`
- `GET /api/cameras` → returns `CAM-CPPLUS-001`, `status: "offline"` (no stream requested yet)
- `GET /api/cameras/CAM-CPPLUS-001/status` (before requesting stream) → `offline`, detail `"Stream not yet requested"`
- `GET /api/cameras/CAM-CPPLUS-001/stream` → `{"streamUrl":"/api/streams/CAM-CPPLUS-001/index.m3u8","status":"starting"}` — FFmpeg process confirmed launched (`streams/CAM-CPPLUS-001/ffmpeg.log` was created and populated)
- Polling `/status` a few seconds later → `starting`
- Polling `/status` ~11s later (after `HLS_STARTUP_TIMEOUT_SECONDS`) → `error`, with a descriptive, credential-free `detail` message — **exactly the expected behavior** given there's no real NVR reachable from this sandbox
- `GET /api/cameras/CAM-DOES-NOT-EXIST` → `404`, matching the contract

This confirms the frontend's `cameraApi.ts` types and `useCameraStream`/`LiveCameraPlayer` state machine are wired against the real, running backend's actual response shapes and status transitions — not just the documentation. What I could **not** confirm is real decoded video frames appearing in the browser, since that additionally requires the physical NVR.

**Recommended next step for Claude 3 or the user:** run the frontend dev server (`npm run dev`) and the backend together on a machine with real LAN access to `192.168.1.245`, with real `NVR_USERNAME`/`NVR_PASSWORD` in `backend/.env`, and confirm Live View / Camera Wall actually render live frames (not just reach `"online"` status).

## 16. Known limitations

- Only Channel 1 (`CAM-CPPLUS-001`) is live; channels 2–8 remain mock/placeholder data, as instructed.
- Dashboard preview shows the real camera as a static tile (see §12), not a live one.
- `recording` / `aiEnabled` / `hasPtz` fields on the real camera's `CameraRecord`/`LiveCameraTile` entries are static placeholder booleans (`false`) — the backend doesn't expose these yet, so they're not wired to anything real. Harmless (they just suppress the REC/AI/PTZ badges), but worth knowing.
- `LiveCameraPlayer`'s manifest-retry loop (8 retries × 1.5s ≈ 12s ceiling) is separate from and in addition to hls.js's own internal manifest retry config (`manifestLoadingMaxRetry: 4`) — both are bounded, neither can loop forever, but Claude 3/4 doing end-to-end testing against the real NVR should double check the combined ceiling comfortably exceeds `HLS_STARTUP_TIMEOUT_SECONDS` in `backend/.env` (currently 8s) so a slow-starting real camera isn't misreported as failed by the frontend before the backend itself gives up.
- No authentication anywhere yet (frontend or backend) — unchanged from Stage 1, out of scope for Stage 2.

## 17. Issues intentionally deferred to Claude 3/4

- The pre-existing `schedule.ts` TypeScript error (§13).
- The known Stage 1 FFmpeg log-file-handle resource-management imperfection mentioned in the original brief — not touched, not investigated further in Stage 2.
- Real end-to-end validation against the physical CP PLUS NVR (§15).
- Any Dashboard live-preview redesign (§12).
- The 3 pre-existing lint warnings (§14) — cosmetic, unrelated to camera work.

---

### Exact run instructions

```bash
# Backend
cd backend
python -m venv .venv && source .venv/bin/activate   # .venv\Scripts\activate on Windows
pip install -r requirements.txt
cp .env.example .env   # fill in real NVR_USERNAME / NVR_PASSWORD
uvicorn app.main:app --reload

# Frontend (separate terminal)
cd ..
cp .env.example .env   # VITE_API_BASE_URL=http://localhost:8000 (default is fine for local dev)
npm install
npm run dev
```

Then open the frontend, navigate to **Video Surveillance → Live View** (camera "CP PLUS Camera 01" is the first tile) or **Live Monitoring → Camera Wall** (same camera, first tile).
