@echo off
echo.
echo ====================================
echo   Timetable Manager - Starting...
echo ====================================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

REM Check if dependencies are installed
if not exist "node_modules" (
    echo Installing dependencies...
    npm install
    if %errorlevel% neq 0 (
        echo ERROR: Failed to install dependencies
        pause
        exit /b 1
    )
)

echo Starting Timetable Manager...
echo.
echo The application will open in a new window.
echo Press Ctrl+C in this window to stop the application.
echo.

npm run electron-dev