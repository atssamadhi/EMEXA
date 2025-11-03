@echo off
color 0B
echo.
echo ========================================
echo   TESTING REGISTRATION (CORS FIXED!)
echo ========================================
echo.

curl -X POST http://127.0.0.1:5000/auth/register ^
  -H "Content-Type: application/json" ^
  -H "Origin: http://localhost:5183" ^
  -d "{\"fullName\":\"Test User\",\"email\":\"test@test.com\",\"password\":\"test12345\",\"accountType\":\"student\"}"

echo.
echo.
echo ========================================
echo   TEST COMPLETE
echo ========================================
echo.
pause
