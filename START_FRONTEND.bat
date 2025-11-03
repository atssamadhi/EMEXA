@echo off
echo.
echo ====================================
echo   STARTING EMEXA FRONTEND
echo ====================================
echo.

cd /d "%~dp0\emexa"

echo Stopping any existing Node processes...
taskkill /F /IM node.exe 2>nul >nul

echo.
echo Starting Vite development server...
echo.
echo NOTE: Vite will try port 5173 first
echo If busy, it will use 5174, 5175, etc.
echo Backend accepts ALL localhost ports automatically!
echo.

npm run dev
