@echo off
echo ================================================
echo Starting EMEXA Application
echo ================================================
echo.

REM Start Backend
echo [1/2] Starting Backend Server...
start "EMEXA Backend" cmd /k "cd /d %~dp0backend && call venv\Scripts\activate.bat && python app.py"
timeout /t 3 /nobreak >nul

REM Start Frontend
echo [2/2] Starting Frontend Dev Server...
start "EMEXA Frontend" cmd /k "cd /d %~dp0 && npm run dev"

echo.
echo ================================================
echo ✅ EMEXA Application Started!
echo ================================================
echo.
echo Backend:  http://localhost:5000
echo Frontend: http://localhost:5175
echo.
echo Two terminal windows have been opened.
echo Press any key to exit this window...
pause >nul
