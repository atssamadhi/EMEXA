@echo off
color 0A
echo.
echo ========================================
echo   STARTING BACKEND SERVER (CORS FIXED!)
echo ========================================
echo.
cd backend
call venv\Scripts\activate.bat
echo.
echo Starting Flask server on http://127.0.0.1:5000
echo KEEP THIS WINDOW OPEN!
echo.
python app.py
pause
