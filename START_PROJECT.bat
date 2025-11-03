@echo off
color 0B
title EMEXA - Full Project Startup
echo.
echo ========================================
echo   EMEXA PROJECT - COMPLETE STARTUP
echo ========================================
echo.

REM Step 1: Kill any existing processes
echo [1/4] Cleaning up old processes...
taskkill /F /IM python.exe 2>nul
taskkill /F /IM node.exe 2>nul
timeout /t 2 /nobreak >nul
echo       Done!
echo.

REM Step 2: Start Backend
echo [2/4] Starting Backend Server (Port 5000)...
cd backend
start "EMEXA Backend - DO NOT CLOSE" cmd /k "call venv\Scripts\activate.bat && echo. && echo ======================================== && echo   BACKEND RUNNING ON PORT 5000 && echo   Keep this window open! && echo ======================================== && echo. && python app.py"
cd ..
timeout /t 3 /nobreak >nul
echo       Backend started!
echo.

REM Step 3: Start Frontend
echo [3/4] Starting Frontend Server (Port 5173)...
cd emexa
start "EMEXA Frontend - DO NOT CLOSE" cmd /k "echo. && echo ======================================== && echo   FRONTEND RUNNING ON PORT 5173 && echo   Keep this window open! && echo ======================================== && echo. && npm run dev"
cd ..
timeout /t 5 /nobreak >nul
echo       Frontend started!
echo.

REM Step 4: Open Browser
echo [4/4] Opening browser...
timeout /t 3 /nobreak >nul
start http://localhost:5173
echo       Browser opened!
echo.

echo ========================================
echo   PROJECT STARTED SUCCESSFULLY!
echo ========================================
echo.
echo   Backend:  http://localhost:5000
echo   Frontend: http://localhost:5173
echo.
echo   Two windows opened:
echo   1. Backend (Python/Flask)
echo   2. Frontend (Vite/React)
echo.
echo   IMPORTANT: Keep both windows open!
echo   Close this window when done working.
echo.
echo ========================================
echo.
pause
