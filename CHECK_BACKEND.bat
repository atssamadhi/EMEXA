@echo off
echo.
echo ====================================
echo   CHECKING BACKEND STATUS
echo ====================================
echo.

cd /d "%~dp0\backend"

echo Checking if Python is running...
tasklist /FI "IMAGENAME eq python.exe" 2>nul | find /I "python.exe" >nul
if %errorlevel%==0 (
    echo [OK] Python process is running
    echo.
    echo Process details:
    wmic process where "name='python.exe'" get ProcessId,CommandLine 2>nul
) else (
    echo [ERROR] No Python process found
    echo Backend is NOT running!
    echo.
    echo To start backend, run: START_BACKEND.bat
)

echo.
echo ====================================
echo Testing backend connection...
echo ====================================
echo.

curl -s http://127.0.0.1:5000/ >nul 2>&1
if %errorlevel%==0 (
    echo [OK] Backend is responding on http://127.0.0.1:5000
    echo.
    echo Run TEST_BACKEND.bat for comprehensive testing
) else (
    echo [ERROR] Backend is not responding
    echo Make sure backend is started
)

echo.
pause
