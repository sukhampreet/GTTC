Final GTTC deployment and QA stage completed; this document records the exact setup and demo procedure for the Windows laptop connected to the CP PLUS NVR network.

# Stage 4 (Final QA / Deployment) — Handoff and Report

## 0. Environment constraint for this stage (read first)

This stage ran in a sandbox with **zero network access** — not to PyPI/npm,
and not to `192.168.1.245` (a direct probe confirmed the sandbox's own
egress proxy blocks it with `host_not_allowed`, before ever reaching the
NVR). This is the same constraint Stage 3 hit. Concretely, this stage
**could not**: run `pip install`, run `npm install`, start FastAPI, run
`pytest`, run `npm run build`/`lint`, reach the NVR, open Chrome, or view
real video. No AI assistant running in a cloud chat sandbox can reach a
device on a private home/office LAN — that step has to happen by running
the provided scripts *on the laptop itself*, on that LAN. Nothing below
claims otherwise.

What this stage *did* do, all independently re-verified rather than taken
on faith from the prior handoff:
- Re-read the full handoff chain and the actual backend/frontend source
  (spot-checked `ffmpeg_service.py`, `streams.py`, `config.py` line by
  line; consistent with what Stage 3 described).
- Re-ran the security grep independently: `grep -rniE
  "192\.168\.1\.245|rtsp://|NVR_USERNAME|NVR_PASSWORD" src/` → **zero
  matches**.
- Confirmed no real `.env` file exists anywhere in the delivered tree,
  and no `node_modules`/`.venv` are present.
- Wrote `SETUP_GTTC.bat`, `START_GTTC.bat`, `RUN_GTTC.md` (new deliverables
  for this stage — the prior stages didn't have a Windows machine to write
  these against either, so these are provided now, untested on real
  Windows, and should be treated as first-draft-quality until you run them
  once).
- Packaged the final ZIP.

## 1. Final architecture (unchanged from Stage 1/2)

```
CP PLUS NVR (192.168.1.245:554, Channel 1)
        │ RTSP
        ▼
FastAPI backend (localhost:8000) ── FFmpeg (RTSP → HLS) ── backend/streams/CAM-CPPLUS-001/
        │ HTTP (HLS playlist + segments)
        ▼
React frontend (localhost:5173) ── hls.js ── LiveCameraPlayer
        │
        ▼
Chrome: Video Surveillance → Live View  /  Live Monitoring → Camera Wall
```

No Docker, no cloud hosting, no direct RTSP-in-React. Frontend only ever
talks to `localhost:8000`; only the backend knows about `192.168.1.245`
and the NVR credentials.

## 2. Real hardware details

- NVR: CP PLUS `CP-UNR-108F1` at `192.168.1.245`, RTSP port `554`
- Camera: Channel 1, backend camera ID `CAM-CPPLUS-001`
- RTSP URL pattern (built server-side only, never exposed):
  `rtsp://<user>:<pass>@192.168.1.245:554/cam/realmonitor?channel=1&subtype=0`
- Confirmed working in VLC prior to this stage (per your report — not
  independently re-verified here, since this sandbox can't reach the NVR).

## 3. Backend setup

See `RUN_GTTC.md` for the full first-time-setup walkthrough. Summary:
`backend/.venv` (Python 3.11+) → `pip install -r backend/requirements.txt`
→ copy `backend/.env.example` to `backend/.env` → fill in
`NVR_USERNAME`/`NVR_PASSWORD` → `uvicorn app.main:app --reload`.

## 4. FFmpeg setup

Must be on PATH (`ffmpeg -version` works from the same terminal that runs
the backend) or pointed to via `FFMPEG_PATH` in `backend/.env`. Windows
builds: https://www.gyan.dev/ffmpeg/builds/. VLC being able to play the
stream does **not** confirm FFmpeg is installed or working — these are
checked separately in `RUN_GTTC.md`'s troubleshooting section.

## 5. Environment configuration

- `backend/.env` — real NVR credentials, local only, gitignored, **not**
  in this ZIP. `backend/.env.example` documents every variable.
- `.env` (project root) — just `VITE_API_BASE_URL=http://localhost:8000`,
  gitignored, **not** in this ZIP. `.env.example` documents it.

## 6. Frontend setup

`npm install` → `npm run dev` → open `http://localhost:5173`. No changes
were made to the existing 12-sprint GTTC UI, navigation, or design system.

## 7. Startup commands

See §14 of the prior handoff (reproduced in `RUN_GTTC.md`) or use the new
`SETUP_GTTC.bat` (first time) / `START_GTTC.bat` (every time after) scripts
described below.

## 8. START_GTTC.bat usage

Double-click after `SETUP_GTTC.bat` has been run once and `backend\.env`
has real credentials. It: checks prerequisites exist, pings the NVR IP
(informational only — some NVRs block ICMP, so this is a warning, not a
hard failure), starts the backend in its own window, polls
`GET /health` for up to ~20s, starts the frontend in its own window, and
opens Chrome to `http://localhost:5173`. Never prints or contains the NVR
password. **Not yet run on a real Windows machine** — see §11 below.

## 9. SETUP_GTTC.bat usage

Double-click once, on a machine with internet access (needed for `pip`/
`npm` to actually download packages — this is separate from, and does not
require, the NVR LAN). Creates the venv, installs backend deps, checks for
FFmpeg, creates `backend\.env`/`.env` from the `.example` files (without
overwriting existing ones), and runs `npm install`. **Not yet run on a
real Windows machine** — see §11 below.

## 10. Real camera test result

**NOT TESTED.** Requires the real NVR on the real LAN, which this sandbox
cannot reach. Not claimed as working.

## 11. Live View / Camera Wall / Dashboard / Build / Lint / Backend tests

**NOT TESTED**, same reason. Static code review (this stage and Stage 3,
independently) found the implementation consistent with `API_CONTRACT.md`
and the "starting ≠ offline" requirement, but static review is not a
substitute for actually seeing it run — see §14 for the exact steps you
(or whoever has the laptop) still needs to run once.

## 12. Any remaining issues

- **`SETUP_GTTC.bat`/`START_GTTC.bat` are unverified on real Windows.**
  They were written carefully against documented `cmd.exe`/batch
  semantics and the project's actual scripts/ports, but this sandbox
  cannot execute a `.bat` file to confirm it works as written. The first
  real run may surface a rough edge (e.g. `curl`'s availability on older
  Windows 10 builds — it's built in since Windows 10 1803; if `curl` is
  missing, the backend-readiness check in `START_GTTC.bat` will just
  never flip to `[OK]` and time out gracefully to a warning, it won't
  crash the script).
- Nothing else new. Stage 3's findings (fixed `schedule.ts` type error,
  fixed FFmpeg log-handle leak, Dashboard camera preview intentionally
  left static) still stand — see `CLAUDE_4_HANDOFF.md` for the full
  detail on those.

## 13. Exact demo procedure

**Before the demo:**
1. Connect the laptop to the same Wi-Fi/LAN as the CP PLUS NVR.
2. Confirm the NVR is powered on and the camera on Channel 1 is connected.
3. Confirm `backend\.env` has the correct, current NVR credentials.
4. Confirm `ffmpeg -version` works in a terminal on that laptop.

**Start:**
1. Run `START_GTTC.bat`.
2. Wait for both windows to finish starting; Chrome should open
   automatically.
3. Go to **Video Surveillance → Live View** → "CP PLUS Camera 01" →
   confirm real, continuously-updating video (not a frozen frame).
4. Go to **Live Monitoring → Camera Wall** → confirm the same camera.

If anything doesn't come up, `RUN_GTTC.md`'s troubleshooting section
walks through isolating the failure to network / FFmpeg / backend / HLS /
frontend, in that order.

## 14. What still must happen on the real laptop before you can call this done

This is the actual final acceptance test — nobody has performed it yet:

1. `SETUP_GTTC.bat` — confirm it completes without a `[FAIL]`.
2. Fill in `backend\.env` with real credentials.
3. `START_GTTC.bat` — confirm both windows start and Chrome opens.
4. `GET http://localhost:8000/health` → confirm `200 OK`.
5. `GET http://localhost:8000/api/cameras` → confirm `CAM-CPPLUS-001`
   present.
6. Open Live View → confirm `Connecting…` then real video (not offline,
   not a placeholder).
7. Open Camera Wall → confirm the same.
8. `npm run build` and `npm run lint` at the project root → confirm clean.
9. `cd backend && .venv\Scripts\python -m pytest` → confirm all tests
   pass.
10. Only then, treat "REAL CAMERA WORKS" as true — not before.

## 15. Final report

| # | Item | Result |
|---|------|--------|
| 1 | Final status | Code/docs/scripts complete; **end-to-end run not performed** (no network/NVR access in this sandbox) |
| 2 | Network test (laptop ↔ NVR) | NOT TESTED |
| 3 | NVR test | NOT TESTED |
| 4 | RTSP test (via FFmpeg, not VLC) | NOT TESTED |
| 5 | FFmpeg test | NOT TESTED |
| 6 | HLS test | NOT TESTED |
| 7 | FastAPI test | NOT TESTED (backend not started — no `pip install` possible here) |
| 8 | React test | NOT TESTED (frontend not started — no `npm install` possible here) |
| 9 | Live View test | NOT TESTED |
| 10 | Camera Wall test | NOT TESTED |
| 11 | Dashboard test | NOT TESTED (known: no live tile there by design, see §12 of prior handoff) |
| 12 | Chrome test | NOT TESTED |
| 13 | Build test (`npm run build`) | NOT TESTED |
| 14 | Lint test (`npm run lint`) | NOT TESTED |
| 15 | Backend tests (`pytest`, 19 tests) | NOT TESTED |
| 16 | Security check (no leaked creds/IP in frontend) | **PASS** (independently re-verified this stage) |
| 17 | Startup script test | NOT TESTED on real Windows (written, not executed) |
| 18 | Remaining issues | See §12 above |
| 19 | Exact demo procedure | See §13 above |
| 20 | Final ZIP location | Provided as the deliverable of this response |

This is an honest, not optimistic, report: the code has been reviewed
carefully by two independent stages and looks correct, but "looks correct
on read-through" and "verified working" are different claims, and only
the latter should ever be told to a stakeholder relying on the demo.
