@echo off
echo.
echo ====================================
echo   STOPPING ALL EMEXA PROCESSES
echo ====================================
echo.

echo Stopping Frontend (Vite/Node)...
taskkill /F /IM node.exe 2>nul
if %errorlevel%==0 (
    echo [OK] Frontend stopped
) else (
    echo [INFO] No frontend process found
)

echo.
echo Stopping Backend (Python/Flask)...
taskkill /F /IM python.exe 2>nul
if %errorlevel%==0 (
    echo [OK] Backend stopped
) else (
    echo [INFO] No backend process found
)

echo.
echo ====================================
echo   ALL PROCESSES STOPPED
echo ====================================
echo.
pause
