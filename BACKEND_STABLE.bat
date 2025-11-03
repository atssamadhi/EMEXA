@echo off
title EMEXA Backend Server
color 0A
echo.
echo ╔════════════════════════════════════════════╗
echo ║     EMEXA BACKEND SERVER - KEEP OPEN!      ║
echo ╚════════════════════════════════════════════╝
echo.

cd /d "%~dp0\backend"

REM Stop any existing Python processes
taskkill /F /IM python.exe 2>nul >nul
timeout /t 1 /nobreak >nul

echo [INFO] Activating virtual environment...
if not exist "venv\Scripts\activate.bat" (
    echo [ERROR] Virtual environment not found!
    echo.
    echo Please create venv first:
    echo   cd backend
    echo   python -m venv venv
    echo   .\venv\Scripts\activate
    echo   pip install -r requirements.txt
    echo.
    pause
    exit /b 1
)

call venv\Scripts\activate.bat

echo [OK] Virtual environment activated
echo.
echo ╔════════════════════════════════════════════╗
echo ║  Backend server starting on port 5000      ║
echo ║  URL: http://127.0.0.1:5000               ║
echo ║                                            ║
echo ║  ⚠️  DO NOT CLOSE THIS WINDOW!            ║
echo ║                                            ║
echo ║  To stop server: Press Ctrl+C              ║
echo ╚════════════════════════════════════════════╝
echo.

:RESTART
echo [%date% %time%] Starting Flask application...
echo.

python app.py

REM If we get here, Python exited (crashed or stopped)
echo.
echo ╔════════════════════════════════════════════╗
echo ║        ⚠️  BACKEND SERVER STOPPED!        ║
echo ╚════════════════════════════════════════════╝
echo.
echo Time: %date% %time%
echo.

REM Check if it was intentional (Ctrl+C) or a crash
echo Do you want to restart the server?
echo   [Y] Yes, restart the server
echo   [N] No, exit
echo.
choice /C YN /N /M "Your choice: "

if errorlevel 2 goto END
if errorlevel 1 goto RESTART

:END
echo.
echo Backend server terminated.
echo.
pause
