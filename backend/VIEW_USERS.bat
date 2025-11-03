@echo off
echo ================================================
echo EMEXA - View All Registered Users
echo ================================================
echo.

cd /d "%~dp0"

echo Activating virtual environment...
call venv\Scripts\activate.bat

echo.
echo Fetching users from database...
echo.

python view_users.py

echo.
echo ================================================
echo Press any key to close...
pause >nul
