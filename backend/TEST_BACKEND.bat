@echo off
echo.
echo ====================================
echo   TESTING EMEXA BACKEND
echo ====================================
echo.

cd /d "%~dp0"

if exist "venv\Scripts\activate.bat" (
    call venv\Scripts\activate.bat
    python test_backend.py
    pause
) else (
    echo ERROR: Virtual environment not found!
    echo Please run setup first.
    pause
)
