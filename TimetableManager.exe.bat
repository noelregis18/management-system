@echo off
title Timetable Manager Desktop Application
color 0A

echo.
echo ========================================
echo    TIMETABLE MANAGER DESKTOP APP
echo ========================================
echo.
echo Starting your desktop application...
echo This will open your React app as a native Windows application.
echo.
echo Loading...

REM Build the React app first
call npm run build >nul 2>&1

REM Start the Electron app
call npm run electron

echo.
echo Application closed.
pause 