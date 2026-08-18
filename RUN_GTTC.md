# Running GTTC with the real CP PLUS camera

This guide is for running the GTTC Smart Security Platform on the demo
laptop, connected to the CP PLUS NVR, with no prior setup assumed.

Hardware in this demo:
- NVR: CP PLUS `CP-UNR-108F1`, reachable at `192.168.1.245`
- Camera: Channel 1 of that NVR
- RTSP has already been confirmed working in VLC

## First-time setup (do this once)

1. **Install Python 3.11+** from https://www.python.org/downloads/
   During install, check "Add python.exe to PATH".
2. **Install Node.js (LTS)** from https://nodejs.org/
3. **Install FFmpeg for Windows**: download a build from
   https://www.gyan.dev/ffmpeg/builds/ (the "essentials" zip is enough),
   extract it somewhere permanent (e.g. `C:\ffmpeg`), and either:
   - add `C:\ffmpeg\bin` to your Windows PATH, **or**
   - leave it off PATH and instead set `FFMPEG_PATH=C:\ffmpeg\bin\ffmpeg.exe`
     in `backend\.env` in step 6.
4. **Connect this laptop to the same Wi-Fi/LAN as the CP PLUS NVR.**
5. **Run `SETUP_GTTC.bat`** (double-click it). It will:
   - create a Python virtual environment in `backend\.venv`
   - install backend dependencies
   - check FFmpeg is available
   - copy `backend\.env.example` to `backend\.env` (if it doesn't exist)
   - copy `.env.example` to `.env` at the project root (if it doesn't exist)
   - run `npm install` for the frontend
6. **Edit `backend\.env`** in a text editor and fill in the real NVR
   credentials:
   ```
   NVR_USERNAME=<your NVR username>
   NVR_PASSWORD=<your NVR password>
   ```
   Leave the rest of the file as-is unless you know you need to change it.
   **Never share this file or commit it to version control.**
7. **Run `START_GTTC.bat`** to start the demo (see below).

## Normal daily start (after first-time setup is done)

1. Connect the laptop to the same Wi-Fi/LAN as the CP PLUS NVR.
2. Confirm the NVR is powered on and Channel 1's camera is connected.
3. Double-click **`START_GTTC.bat`**.
4. Wait for the two windows ("GTTC Backend" and "GTTC Frontend") to finish
   starting - Chrome should open automatically to the app. If it doesn't,
   open Chrome yourself and go to `http://localhost:5173`.
5. In the app, go to **Video Surveillance → Live View**, find "CP PLUS
   Camera 01" - it should show `Connecting...` briefly and then real live
   video.
6. You can also check **Live Monitoring → Camera Wall** for the same feed.

To stop the demo, close the "GTTC Backend" and "GTTC Frontend" windows.

## Troubleshooting

### NVR not reachable
- Confirm the laptop's Wi-Fi/Ethernet is on the *same* network as the NVR,
  not a guest network or a different VLAN.
- From PowerShell, test the connection:
  ```
  Test-NetConnection -ComputerName 192.168.1.245 -Port 554
  ```
  `TcpTestSucceeded : True` means the network path is fine and any
  remaining problem is credentials/RTSP path, not networking.
- Double-check the NVR's IP hasn't changed (some routers reassign DHCP
  leases). If needed, check the NVR's own network settings menu.
- Check Windows Firewall isn't blocking outbound connections for
  `python.exe` / `ffmpeg.exe` (a prompt may have appeared the first time
  you ran the backend - allow it on Private networks).

### FFmpeg problems
- Run `ffmpeg -version` in a plain Command Prompt. If it's not
  recognized, FFmpeg isn't on PATH - either fix PATH or set
  `FFMPEG_PATH` in `backend\.env` to the full `ffmpeg.exe` path.
- Check `backend\streams\CAM-CPPLUS-001\ffmpeg.log` for the actual error
  FFmpeg reported (e.g. `401 Unauthorized` means wrong username/password;
  `Connection refused`/timeout means a network problem).
- If VLC can play the stream but FFmpeg can't connect, make sure **VLC is
  closed** before testing - some NVRs limit the number of simultaneous
  RTSP clients.

### Backend won't start
- Check the "GTTC Backend" window for the actual Python error.
- Confirm `backend\.env` exists and `backend\.venv` was created (re-run
  `SETUP_GTTC.bat` if unsure).
- Make sure nothing else on the laptop is already using port 8000.

### HLS / video won't play in the browser
- Open `http://localhost:8000/docs` - if that doesn't load, the backend
  isn't running; fix that first.
- Open `http://localhost:8000/api/cameras/CAM-CPPLUS-001/status` in the
  browser - it should show `starting` shortly after opening Live View,
  then `online` once FFmpeg has produced its first HLS segments (a few
  seconds). If it shows `error`, check `ffmpeg.log` as above.
- In Chrome, press F12 to open DevTools → Console/Network tabs, and look
  for CORS errors, 404s on `.m3u8`/`.ts` files, or JavaScript errors.

### Chrome shows "Camera Offline" immediately
- This should only happen for a genuine `offline`/`error` status from the
  backend - a normal cold start should show "Connecting..." first. If it
  jumps straight to offline, check the backend logs and
  `GET /api/cameras/CAM-CPPLUS-001/status` directly, since that tells you
  whether the backend itself thinks the stream is offline/erroring or
  whether this is a frontend display bug.

### Nothing works and you're short on time
- Fall back to isolating the pipeline stage by stage: NVR reachability
  (PowerShell `Test-NetConnection`) → FFmpeg (`ffmpeg -version`, then try
  building the RTSP command manually from `backend\.env` values) → backend
  HLS output (`backend\streams\CAM-CPPLUS-001\index.m3u8` should appear
  after calling the `/stream` endpoint) → frontend. Fixing the earliest
  broken stage first avoids chasing symptoms in later stages.
