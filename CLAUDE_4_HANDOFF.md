Stage 3 integration testing is complete. Stage 4 must perform final QA, fix only remaining demo-blocking issues, and prepare the final GTTC project.

# Handoff: Stage 3 → Stage 4

## 1. What Claude 1 implemented (Stage 1 — backend)

FastAPI backend at `backend/` that relays the CP PLUS NVR (`CP-UNR-108F1`,
`192.168.1.245:554`, Channel 1) into browser-playable HLS:
`app/main.py` (app/CORS/lifespan), `app/config.py` (env-driven `Settings`),
`app/api/{health,cameras,streams}.py`, `app/services/{camera_service,
stream_service,ffmpeg_service}.py`, `app/utils/logging.py` (redacts
credentials), plus `tests/` (19 tests) and `API_CONTRACT.md` for the
frontend stage. One camera (`CAM-CPPLUS-001`), one FFmpeg process per
camera, lazy start, idle reaping, Windows-compatible subprocess handling.

## 2. What Claude 2 implemented (Stage 2 — frontend integration)

Wired the existing 12-sprint React frontend to that backend for the one
real camera, additively:
- `src/config/api.ts`, `src/lib/api/cameraApi.ts` (typed client, mirrors
  `API_CONTRACT.md` exactly), `src/hooks/useCameraStream.ts` (React Query:
  one `/stream` call + polled `/status`), `src/components/media/
  LiveCameraPlayer.tsx` (the one shared hls.js/native-HLS player).
- `CameraTile.tsx` (Live View) and `CameraCard.tsx` (Camera Wall) each
  render `LiveCameraPlayer` only when `camera.liveCameraId` is set — set on
  exactly one new mock entry per module, all pre-existing mock cameras
  (24 + 36) untouched.
- Full details in `CLAUDE_3_HANDOFF.md` at the project root (this file is
  actually Claude 2's Stage 2→3 handoff — it was left named
  `CLAUDE_3_HANDOFF.md` in the delivered zip; Stage 4 should treat it as
  the authoritative Stage 2 record).

## 3. What Claude 3 (this stage) did

**Environment constraint, stated up front:** this sandbox has no network
access at all — not to `192.168.1.245`, and not to PyPI/npm either. `pip
install -r backend/requirements.txt` and `npm install` both fail with "no
matching distribution found" / would fail resolving the registry. This is
a harder constraint than Stage 1/2 hit (they at least could run installed
tooling). Concretely this means **I could not start the backend, could not
run `pytest`, could not run `npm run dev`/`npm run build`/`npm run lint`,
and could not reach the NVR** in this environment. I did not fake any of
these results. What I did instead:

1. **Full read-through** of `context.md`, `backend/API_CONTRACT.md`,
   `backend/README.md`, `backend/CLAUDE_2_HANDOFF.md`, the Stage 2 handoff
   (`CLAUDE_3_HANDOFF.md`), `package.json`, every file under `backend/app/`,
   and the frontend integration files listed in §2 above — line by line,
   not skimmed.
2. **Static correctness review against `API_CONTRACT.md`**: confirmed
   `app/api/cameras.py` and `app/api/streams.py` implement exactly the
   documented endpoints/status semantics (`offline`/`starting`/`online`/
   `error`), confirmed path-traversal and extension checks on segment
   filenames, confirmed 404 shapes match. Confirmed `useCameraStream.ts`
   defaults to `'starting'` (never `'offline'`) before the first response
   arrives, and that `LiveCameraPlayer.tsx` only ever shows the
   "Offline"/error UI for a real `offline`/`error` API status or a fatal
   hls.js error — `starting` is always rendered as "Connecting…". This
   matches §13/§22 of the original brief.
3. **Security check (§26 of the brief)**: `grep -rniE
   "192\.168\.1\.245|rtsp://|NVR_USERNAME|NVR_PASSWORD" src/` returns
   **zero matches**. No credentials, NVR IP, or RTSP URL anywhere in the
   frontend source. Confirmed `backend/app/config.py`'s
   `redacted_rtsp_url()` is what's ever logged, and the real
   `rtsp_url()` (with credentials) is only ever passed to the FFmpeg
   subprocess, never returned from any endpoint (also covered by
   `backend/tests/test_config_and_ffmpeg.py` and
   `test_streams.py::test_stream_response_never_contains_credentials`).
4. **`.gitignore`/secrets check (§27)**: `backend/.env` is gitignored,
   `backend/streams/*` is gitignored (only `.gitkeep` tracked), root
   `.gitignore` excludes `node_modules`, `dist`, `.env*`. No real `.env`
   exists anywhere in the delivered tree — only `.env.example` at the root
   and in `backend/`.
5. **Fixed the pre-existing `schedule.ts` TypeScript error** (flagged by
   Claude 2 in §13/§17 of their handoff, not caused by any camera work).
   Root cause confirmed by isolating the file with a standalone `tsc
   --strict` run (no other project deps needed, since the file only
   imports its own sibling types): TS's `Array.prototype.flatMap`
   contextual-typing inference locks onto the *first* branch's narrowed
   return type (`day: 'Sat' | 'Sun'`) and then rejects the second branch's
   wider-`day` objects against it. Fix: added an explicit `: ScheduleBlock[]`
   return-type annotation to the `officeHoursWeek()` callback in
   `src/modules/video-surveillance/mock/schedule.ts` — one line, no logic
   change, no mock data change. Re-ran the same isolated `tsc --strict`
   check: **0 errors** (previously 1). This could not be re-verified via
   the full `npm run build` pipeline in this sandbox (no `npm install`
   possible — see the environment constraint above), but the isolated
   check exercises the exact code path that was failing.
6. **Fixed the known Stage 1 FFmpeg logging resource-management issue**
   (flagged as pre-approved-if-real in §30 of the original brief). In
   `backend/app/services/ffmpeg_service.py::start_process()`, the log file
   handle opened in the parent process (`open(log_file, "ab",
   buffering=0)`) was passed to `subprocess.Popen(stdout=log_fh, ...)` but
   **never closed in the parent**. `Popen` duplicates the handle for the
   child before exec, so the parent's copy is redundant once the child has
   started — but it was being kept open for the lifetime of the backend
   process. This is real (not cosmetic): `stream_service.py` restarts
   FFmpeg — and therefore calls `start_process()` again — on idle-reap
   (`STREAM_IDLE_TIMEOUT_SECONDS`, default 120s) and on process-exit
   restart, so a demo left running for hours, or one where the tile is
   repeatedly opened/closed across the idle timeout, would leak one file
   descriptor per restart with no way to reclaim them short of restarting
   the backend. **It would not have blocked a single short demo run**, so
   this is a real fix but not a dramatic one. Change: wrapped the
   `Popen(...)` call in `try/finally` and `close()` the parent's `log_fh`
   immediately after spawning; the child keeps writing to its own
   inherited descriptor as before. No change to the FFmpeg command line,
   HLS output, logging format, or any public behavior — `ffmpeg.log`
   still gets exactly the same content. I could not re-run
   `backend/tests/` to confirm (see environment constraint), but nothing
   in the test suite touches `start_process()`'s internals directly (they
   assert on HTTP response shape/status), so this change is not expected
   to affect any existing test outcome.
7. Removed an incidental leftover `backend/.venv/` directory I created
   while attempting (and failing, due to no network) to install backend
   deps — confirmed **not** present in the final zip.

## 4. Which tests passed / failed

**Backend `pytest` (19 tests across `test_cameras.py`, `test_config_and_
ffmpeg.py`, `test_health.py`, `test_streams.py`): NOT RUN.** `pip install
-r backend/requirements.txt` fails in this sandbox with "No matching
distribution found for fastapi<1.0,>=0.111" — there is no PyPI access at
all, not even for already-known-good pinned versions. I read every test
and every line of the code it exercises; nothing in my two small changes
(§3.5, §3.6 above) should change any test's outcome, but this is a static
judgment, not an executed one. **Claude 4 (or the user, on a
network-connected machine) must actually run `pytest` before treating the
suite as passing.**

**Frontend `npm run build` / `npm run lint`: NOT RUN**, same root cause —
`npm install` needs registry access this sandbox doesn't have. The one
isolated `tsc --strict` check I *could* run (§3.5) went from 1 error to 0
after my fix. Claude 4 must run the real `npm run build` (`tsc -b && vite
build`) and `npm run lint` (oxlint) on a network-connected machine to
confirm the full pipeline (all deps, all files) is clean — Stage 2's
handoff reported `vite build` succeeding cleanly (3090 modules) and only
`tsc -b`'s `schedule.ts` error blocking the combined script; that error
should now be gone.

## 5. Was the real NVR reachable?

**No — not from this sandbox, and this was never attempted or claimed.**
This environment has no network access whatsoever (confirmed: a direct
TCP probe to `192.168.1.245:554` was attempted and blocked by the sandbox
network layer, not by the NVR). Per §34 of the original brief, I am
explicitly **not** claiming the physical camera works. All of §§9–25 of
the original Stage 3 brief that require actual LAN reachability to
`192.168.1.245` — connectivity checks, real RTSP→FFmpeg test, disconnect
test, FFmpeg-failure test — **must be performed by Claude 4 or the user
on the friend's laptop**, on the same network as the NVR, which no Claude
sandbox in this pipeline has had access to (Stage 1 and Stage 2 both
reported the identical limitation).

## 6. Was FFmpeg available?

**In this Stage 3 sandbox, yes** — `ffmpeg -version` succeeds (FFmpeg
6.1.1, `/usr/bin/ffmpeg`) — a difference from Stage 1's and Stage 2's
sandboxes, which reportedly had neither FFmpeg nor network access. This
let me read/verify the FFmpeg command construction in
`ffmpeg_service.build_hls_command()` against real FFmpeg's flag syntax
(all flags — `-rtsp_transport tcp`, `-an`, `-c:v libx264 -preset veryfast
-tune zerolatency -pix_fmt yuv420p`, `-f hls -hls_time -hls_list_size
-hls_flags delete_segments+append_list+omit_endlist -hls_segment_filename`
— are valid, current FFmpeg 6.x options), but I still could not execute it
against a real RTSP source since there was no network path to
`192.168.1.245` and no `fastapi`/`uvicorn` installed to run the backend
that invokes it. On the friend's laptop, `ffmpeg -version` must be
verified directly (README §"Installing FFmpeg (Windows)" has the steps).

## 7. Was HLS generated?

**Not verified in this stage** — generating real HLS requires FFmpeg to
actually be invoked against a reachable RTSP source, which needs both the
backend running (blocked by no `pip install`) and the NVR reachable
(blocked by no LAN access). Stage 2 reported observing the
`offline → starting → error` transition against a *running* backend with
a *dummy* NVR target (confirming the state machine, not real video) — see
§15 of `CLAUDE_3_HANDOFF.md`. Stage 3 could not repeat even that much due
to the stricter no-network sandbox. This remains open for Claude 4.

## 8. Did Live View show real frames?

**No — not tested, not claimed.** Requires the full chain (real NVR + real
backend running) which was unavailable here. The frontend-side logic that
*would* render them (`LiveCameraPlayer` → `CameraTile`) was statically
reviewed and found correct (see §3.2 above).

## 9. Did Camera Wall show real frames?

**No — not tested, not claimed**, same reason as §8. `CameraCard.tsx`'s
integration was statically reviewed and found correct, including the
`toDeviceStatus()` mapping described in Stage 2's handoff §11 (`starting`
→ "Connecting" badge, never a hard offline read).

## 10. Dashboard status

**Unchanged from Stage 2 — still not integrated, and Stage 3 did not
attempt to integrate it**, per the original brief's explicit priority
order (§19: prioritize Live View and Camera Wall; document Dashboard as a
limitation rather than force a layout change). See §12 of
`CLAUDE_3_HANDOFF.md` for Claude 2's reasoning (no suitable large preview
slot in `VideoSurveillanceLiveWidget.tsx` without a layout change the
brief disallows). `CAM-CPPLUS-001` still appears as one of the six static
preview tiles on the Dashboard grid, just without a live `<video>` inside
that tile.

## 11. Remaining backend issues

- **Nothing else found.** The FFmpeg log-handle leak (§3.6) is fixed. No
  other resource-management, security, or contract-conformance issues were
  found in a full read of `backend/app/`.
- Backend `pytest` has not been executed since Stage 1 built it, as far as
  the delivered handoffs show — Claude 4 (or the user) should be the first
  to actually run it end-to-end on a machine with network access, and
  should not assume it passes just because the code reads correctly.

## 12. Remaining frontend issues

- **Nothing else found** beyond the `schedule.ts` fix (§3.5), which is
  unrelated to the camera work itself.
- The 3 pre-existing `react/only-export-components` oxlint warnings noted
  in Stage 2's handoff (`Button.tsx`, `GridLayoutSwitcher.tsx`) are
  cosmetic and untouched — still fine to leave for a later cleanup pass,
  not a Stage 4 blocker.

## 13. Minor cleanup needed

- None identified beyond what's already fixed. Do not "clean up" the
  `{types,mock,constants,layout,...}`-style existing folder names — this
  was explicitly out of scope per the original brief §6 and Stage 3 did
  not touch them.

## 14. Exact steps Claude 4 should perform

Run these **on a machine with real network access and, ideally, the same
LAN as the CP PLUS NVR** (the friend's laptop, or an equivalent):

1. `cd backend && python -m venv .venv && <activate> && pip install -r
   requirements.txt`
2. `cp backend/.env.example backend/.env` and fill in the real
   `NVR_USERNAME`/`NVR_PASSWORD` locally (never commit this file).
3. `cd backend && pytest` — confirm all 19 tests actually pass; investigate
   and fix (don't weaken) any genuine failure; document any unrelated
   pre-existing failure.
4. `uvicorn app.main:app --reload` — confirm `GET /health` returns
   `{"status":"ok","service":"gttc-backend"}`.
5. `GET /api/cameras` → confirm `CAM-CPPLUS-001` is present.
6. `GET /api/cameras/CAM-CPPLUS-001/stream` → confirm `status: "starting"`
   is returned (not `"offline"`), then poll `GET .../status` until
   `"online"`.
7. Open `http://localhost:8000/api/streams/CAM-CPPLUS-001/index.m3u8` in
   VLC to confirm the FastAPI→FFmpeg→HLS pipeline works **before**
   bringing the frontend into it (isolates backend/NVR problems from
   frontend problems).
8. `cp .env.example .env && npm install && npm run build && npm run lint`
   at the project root — confirm both are clean (the `schedule.ts` fix in
   this stage should mean `tsc -b` no longer blocks the build).
9. `npm run dev`, open Chrome, go to **Video Surveillance → Live View** —
   confirm the CP PLUS tile shows real, continuously-updating video (not a
   frozen frame, not a placeholder). Check the browser console for HLS/CORS/
   network errors.
10. Repeat for **Live Monitoring → Camera Wall**.
11. If practical and safe to the demo environment, run the disconnect test
    (§23 of the original Stage 3 brief) and the FFmpeg-failure test (§24) —
    neither was possible from this sandbox.
12. Only then, update this project's own final acceptance report with
    real, observed results — do not mark "REAL CAMERA WORKS" without
    having actually seen it in the browser, per the original brief's most
    important instruction.
13. Perform final QA pass: re-check the security grep (§3.3 above) one
    more time against the final tree, confirm no real `.env` ships in the
    final ZIP, confirm `node_modules`/`.venv`/generated `streams/*` are
    excluded.

## 15. What Claude 4 MUST NOT redesign

Everything the original Stage 3 brief already prohibited, still applies
unchanged for Stage 4:

- Do NOT rebuild FastAPI, the RTSP/FFmpeg/HLS architecture, or replace
  hls.js.
- Do NOT introduce Docker, cloud hosting, or additional networking
  infrastructure — the friend's laptop remains both the GTTC server and
  the demo client machine.
- Do NOT redesign the GTTC UI (Dashboard, Live View, Camera Wall,
  sidebar, navigation, colors, typography, design system).
- Do NOT rename/move/merge/"clean up" existing folders with unusual
  naming (`{types,mock,constants,layout,...}` and similar) — leave them
  as-is.
- Do NOT add out-of-scope features (multi-camera, recording, playback,
  PTZ, AI analytics, face/object detection, camera CRUD, multi-NVR, cloud
  deployment). The scope remains exactly one real CP PLUS camera working
  reliably in the existing GTTC app.
- Do NOT commit or ship a real `backend/.env`, real credentials, or the
  raw RTSP URL anywhere in frontend code or documentation.
- Do NOT claim the physical camera/live video works unless it was
  actually observed rendering in the browser on a LAN-connected machine.

---

### Exact run instructions (unchanged from Stage 2, still accurate)

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

Then open the frontend, navigate to **Video Surveillance → Live View**
(camera "CP PLUS Camera 01" is the first tile) or **Live Monitoring →
Camera Wall** (same camera, first tile).
