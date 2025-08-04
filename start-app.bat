@echo off
title Timetable Manager - Professional Desktop App
color 0B

echo.
echo ================================================
echo     TIMETABLE MANAGER - STARTING...
echo ================================================
echo.
echo [1/2] Starting React Development Server...
echo.

REM Start Vite dev server in background
start /B npx vite --host

echo Waiting for server to start...
timeout /t 5 /nobreak >nul

echo.
echo [2/2] Launching Desktop Application...
echo.

REM Start Electron app (fixed with .cjs files)
npx electron .

echo.
echo Application Started Successfully!
echo Close this window to stop the application.
pause