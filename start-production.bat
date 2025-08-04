@echo off
title Timetable Manager - Production Mode
color 0B

echo.
echo ===============================================
echo   TIMETABLE MANAGER - PRODUCTION MODE
echo ===============================================
echo.
echo [1/2] Building React Application...
echo.

call npm run build

if %errorlevel% neq 0 (
    echo ERROR: Build failed
    pause
    exit /b 1
)

echo.
echo [2/2] Launching Desktop Application...
echo.

npx electron .

echo.
echo Application closed.
pause