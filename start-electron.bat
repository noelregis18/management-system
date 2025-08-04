@echo off
echo Starting Timetable Manager Desktop Application...
echo.

REM Build the React app first
echo Building React application...
call npm run build

REM Start the Electron app
echo Starting Electron application...
call npm run electron

echo.
echo Desktop application closed.
pause 