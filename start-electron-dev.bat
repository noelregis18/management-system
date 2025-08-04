@echo off
echo Starting Timetable Manager Desktop Application (Development Mode)...
echo.
echo This will start both the React dev server and Electron app.
echo Any changes to your code will automatically update in the desktop app.
echo.

REM Start both dev server and electron
echo Starting development server and Electron...
call npm run electron-dev

echo.
echo Desktop application closed.
pause 