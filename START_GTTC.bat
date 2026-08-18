@echo off
setlocal enabledelayedexpansion
title GTTC - Startup
cd /d "%~dp0"

echo ============================================================
echo  GTTC Smart Security Platform - Starting
echo ============================================================
echo.

REM ------------------------------------------------------------------
REM Pre-flight checks (fail fast with a clear message, no half-started
REM system left behind).
REM ------------------------------------------------------------------
if not exist "backend\.venv\Scripts\python.exe" (
    echo [FAIL] backend\.venv not found. Run SETUP_GTTC.bat first.
    goto :fail
)
if not exist "backend\.env" (
    echo [FAIL] backend\.env not found. Run SETUP_GTTC.bat first, then
    echo        fill in your NVR credentials in backend\.env.
    goto :fail
)
if not exist "node_modules" (
    echo [FAIL] node_modules not found. Run SETUP_GTTC.bat first.
    goto :fail
)

where ffmpeg >nul 2>nul
if errorlevel 1 (
    findstr /b /c:"FFMPEG_PATH=" backend\.env >nul 2>nul
    if errorlevel 1 (
        echo [WARN] FFmpeg was not found on PATH and FFMPEG_PATH is not set
        echo        in backend\.env. Live video will not work until this is
        echo        fixed. Continuing anyway so you can still browse the app.
    )
)

echo [1/3] Checking laptop can reach the CP PLUS NVR at 192.168.1.245 ...
ping -n 1 -w 2000 192.168.1.245 >nul 2>nul
if errorlevel 1 (
    echo   [WARN] 192.168.1.245 did not respond to ping. Some NVRs block
    echo          ping but still allow RTSP - this is not a hard failure,
    echo          but if the camera tile shows an error later, check that
    echo          this laptop is on the same Wi-Fi/LAN as the NVR.
) else (
    echo   [OK] 192.168.1.245 is reachable.
)
echo.

echo [2/3] Starting FastAPI backend in a new window...
start "GTTC Backend (FastAPI)" cmd /k "cd /d "%~dp0backend" && .venv\Scripts\python.exe -m uvicorn app.main:app --host 0.0.0.0 --port 8000"

echo   Waiting for the backend to come up...
set BACKEND_OK=0
for /l %%i in (1,1,20) do (
    if !BACKEND_OK! == 0 (
        timeout /t 1 /nobreak >nul
        curl -s -o nul -w "%%{http_code}" http://localhost:8000/health > "%TEMP%\gttc_health.txt" 2>nul
        set /p HEALTH_CODE=<"%TEMP%\gttc_health.txt"
        if "!HEALTH_CODE!"=="200" set BACKEND_OK=1
    )
)
if "!BACKEND_OK!"=="1" (
    echo   [OK] Backend is responding at http://localhost:8000
) else (
    echo   [WARN] Backend did not respond within ~20 seconds. Check the
    echo          "GTTC Backend" window for errors ^(e.g. missing FFmpeg,
    echo          bad NVR credentials, port 8000 already in use^).
)
echo.

echo [3/3] Starting React frontend in a new window...
start "GTTC Frontend (Vite)" cmd /k "cd /d "%~dp0" && npm run dev"

echo   Waiting for the frontend dev server...
timeout /t 5 /nobreak >nul
echo.

echo ============================================================
echo  GTTC is starting in two separate windows:
echo    - "GTTC Backend (FastAPI)"  -> http://localhost:8000
echo    - "GTTC Frontend (Vite)"    -> http://localhost:5173
echo  Keep both windows open for the duration of the demo.
echo ============================================================
echo.
echo Opening the app in Chrome...
start chrome "http://localhost:5173" 2>nul
if errorlevel 1 (
    echo   Could not launch Chrome automatically. Please open this URL
    echo   manually in your browser: http://localhost:5173
)
echo.
echo In the app go to:  Video Surveillance -^> Live View
echo               or:  Live Monitoring    -^> Camera Wall
echo to see "CP PLUS Camera 01".
echo.
echo This window can stay open or be closed - it is not one of the
echo two servers. Closing the "GTTC Backend" or "GTTC Frontend" windows
echo will stop that part of the system.
pause
exit /b 0

:fail
echo.
pause
exit /b 1
