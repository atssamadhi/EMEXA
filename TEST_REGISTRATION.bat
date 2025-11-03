@echo off
echo.
echo ========================================
echo   TESTING REGISTRATION - STEP BY STEP
echo ========================================
echo.

cd /d "%~dp0"

echo Step 1: Checking if backend is running...
echo.

curl -s http://127.0.0.1:5000/ >nul 2>&1
if %errorlevel%==0 (
    echo [OK] Backend is responding
    echo.
) else (
    echo [ERROR] Backend is NOT running!
    echo.
    echo Please start backend first:
    echo    START_BACKEND.bat
    echo.
    pause
    exit /b 1
)

echo Step 2: Testing registration API...
echo.

cd backend
if exist "venv\Scripts\activate.bat" (
    call venv\Scripts\activate.bat
    
    echo Creating test user: testuser_%time:~0,2%%time:~3,2%%time:~6,2%
    echo.
    
    python -c "import requests; import json; from datetime import datetime; email=f'test_{datetime.now().strftime(\"%%H%%M%%S\")}@test.com'; data={'fullName': 'Test User', 'email': email, 'password': 'test12345', 'accountType': 'student'}; print(f'Email: {email}'); r=requests.post('http://127.0.0.1:5000/auth/register', json=data); print(f'Status: {r.status_code}'); print(f'Response: {r.text}'); exit(0 if r.status_code == 201 else 1)"
    
    if %errorlevel%==0 (
        echo.
        echo ========================================
        echo   SUCCESS! Registration is working
        echo ========================================
        echo.
        echo Now test in browser:
        echo 1. Go to http://localhost:5180/#/register
        echo 2. Fill the form
        echo 3. Click Register
        echo 4. You should see beautiful success message!
        echo.
        echo Check browser console (F12) for detailed logs
        echo.
    ) else (
        echo.
        echo ========================================
        echo   FAILED! Registration has errors
        echo ========================================
        echo.
        echo Check backend terminal for error messages
        echo.
    )
) else (
    echo ERROR: Virtual environment not found!
    echo.
)

pause
