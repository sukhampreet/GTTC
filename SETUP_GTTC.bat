@echo off
setlocal enabledelayedexpansion
title GTTC - First-Time Setup
cd /d "%~dp0"

echo ============================================================
echo  GTTC Smart Security Platform - First-Time Setup
echo ============================================================
echo.
echo This script prepares the backend (Python/FastAPI) and the
echo frontend (Node/React) so the system can be started later with
echo START_GTTC.bat. It does NOT start the servers and it does NOT
echo touch your NVR credentials beyond copying the example file.
echo.

REM ------------------------------------------------------------------
REM 1. Check Python
REM ------------------------------------------------------------------
echo [1/6] Checking for Python...
where python >nul 2>nul
if errorlevel 1 (
    echo   [FAIL] Python was not found on PATH.
    echo   Install Python 3.11+ from https://www.python.org/downloads/
    echo   and make sure to check "Add python.exe to PATH" during install.
    goto :fail
)
python --version
echo   [OK] Python found.
echo.

REM ------------------------------------------------------------------
REM 2. Create backend virtual environment
REM ------------------------------------------------------------------
echo [2/6] Setting up backend virtual environment...
if not exist "backend\.venv\Scripts\python.exe" (
    python -m venv backend\.venv
    if errorlevel 1 (
        echo   [FAIL] Could not create backend\.venv
        goto :fail
    )
    echo   [OK] Created backend\.venv
) else (
    echo   [OK] backend\.venv already exists, skipping creation.
)
echo.

REM ------------------------------------------------------------------
REM 3. Install backend dependencies
REM ------------------------------------------------------------------
echo [3/6] Installing backend Python dependencies (this can take a minute)...
call backend\.venv\Scripts\python.exe -m pip install --upgrade pip >nul
call backend\.venv\Scripts\python.exe -m pip install -r backend\requirements.txt
if errorlevel 1 (
    echo   [FAIL] pip install failed. Check your internet connection and
    echo   the error above, then re-run this script.
    goto :fail
)
echo   [OK] Backend dependencies installed.
echo.

REM ------------------------------------------------------------------
REM 4. Check FFmpeg
REM ------------------------------------------------------------------
echo [4/6] Checking for FFmpeg...
where ffmpeg >nul 2>nul
if errorlevel 1 (
    echo   [WARN] FFmpeg was not found on PATH.
    echo   Download a Windows build from https://www.gyan.dev/ffmpeg/builds/
    echo   ^(the "essentials" or "full" release build^), extract it, and
    echo   either add its "bin" folder to your PATH or set FFMPEG_PATH in
    echo   backend\.env to the full path of ffmpeg.exe, e.g.:
    echo     FFMPEG_PATH=C:\ffmpeg\bin\ffmpeg.exe
    echo   The system will not be able to show live video until this is
    echo   resolved. Setup will continue.
) else (
    ffmpeg -version | findstr /b "ffmpeg"
    echo   [OK] FFmpeg found on PATH.
)
echo.

REM ------------------------------------------------------------------
REM 5. Backend .env
REM ------------------------------------------------------------------
echo [5/6] Checking backend\.env...
if exist "backend\.env" (
    echo   [OK] backend\.env already exists - leaving it untouched.
) else (
    copy /y "backend\.env.example" "backend\.env" >nul
    echo   [OK] Created backend\.env from backend\.env.example.
    echo   [ACTION REQUIRED] Open backend\.env in a text editor and fill in
    echo   NVR_USERNAME and NVR_PASSWORD for your CP PLUS NVR ^(192.168.1.245^).
    echo   Do not share this file or commit it anywhere.
)
echo.

REM ------------------------------------------------------------------
REM 6. Frontend dependencies
REM ------------------------------------------------------------------
echo [6/6] Installing frontend dependencies (npm install)...
where npm >nul 2>nul
if errorlevel 1 (
    echo   [FAIL] Node.js/npm was not found on PATH.
    echo   Install Node.js LTS from https://nodejs.org/ and re-run this script.
    goto :fail
)
call npm install
if errorlevel 1 (
    echo   [FAIL] npm install failed. Check the error above.
    goto :fail
)
if not exist ".env" (
    copy /y ".env.example" ".env" >nul
    echo   [OK] Created .env from .env.example ^(VITE_API_BASE_URL=http://localhost:8000^).
) else (
    echo   [OK] .env already exists - leaving it untouched.
)
echo   [OK] Frontend dependencies installed.
echo.

echo ============================================================
echo  SETUP COMPLETE
echo ============================================================
echo Next steps:
echo   1. If you have not already, edit backend\.env and enter the
echo      real NVR_USERNAME / NVR_PASSWORD for the CP PLUS NVR.
echo   2. Make sure this laptop is connected to the same Wi-Fi/LAN
echo      as the CP PLUS NVR ^(192.168.1.245^).
echo   3. Run START_GTTC.bat to start the demo.
echo.
pause
exit /b 0

:fail
echo.
echo ============================================================
echo  SETUP DID NOT COMPLETE - see the [FAIL] message above.
echo ============================================================
pause
exit /b 1
