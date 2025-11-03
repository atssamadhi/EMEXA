@echo off
color 0C
title EMEXA - Stop All Servers
echo.
echo ========================================
echo   STOPPING ALL EMEXA SERVERS
echo ========================================
echo.

echo Stopping Python (Backend)...
taskkill /F /IM python.exe 2>nul
if %errorlevel% equ 0 (
    echo   Backend stopped!
) else (
    echo   No backend running.
)
echo.

echo Stopping Node.js (Frontend)...
taskkill /F /IM node.exe 2>nul
if %errorlevel% equ 0 (
    echo   Frontend stopped!
) else (
    echo   No frontend running.
)
echo.

echo ========================================
echo   ALL SERVERS STOPPED
echo ========================================
echo.
pause
