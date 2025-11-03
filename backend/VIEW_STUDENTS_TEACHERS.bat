@echo off
echo.
echo ========================================
echo   VIEWING STUDENTS AND TEACHERS
echo ========================================
echo.

cd /d "%~dp0"

REM Activate virtual environment
if exist "venv\Scripts\activate.bat" (
    call venv\Scripts\activate.bat
) else (
    echo Warning: Virtual environment not found
)

REM Run the viewer script
python view_students_teachers.py

echo.
echo ========================================
pause
