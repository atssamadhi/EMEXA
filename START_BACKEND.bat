@echo off
echo.
echo ====================================
echo   STARTING EMEXA BACKEND
echo ====================================
echo.

cd /d "%~dp0\backend"

echo Stopping any existing Python processes...
taskkill /F /IM python.exe 2>nul >nul
timeout /t 2 /nobreak >nul

echo.
echo Starting Flask backend on http://127.0.0.1:5000
echo.
echo IMPORTANT: Keep this window OPEN!
echo If you close it, backend will stop!
echo.

if exist "venv\Scripts\activate.bat" (
    call venv\Scripts\activate.bat
    echo Virtual environment activated
    echo.
    echo Starting server...
    echo.
    python app.py
    
    REM If python exits, show error
    echo.
    echo ====================================
    echo   BACKEND STOPPED!
    echo ====================================
    echo.
    echo Check for errors above.
    echo Press any key to close...
    pause >nul
) else (
    echo ERROR: Virtual environment not found!
    echo Please create venv first
    pause
)
