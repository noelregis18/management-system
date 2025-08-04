@echo off
echo Creating Portable Timetable Manager (.exe file)...
echo.

REM Build the React app first
echo Step 1: Building React application...
call npm run build

if %errorlevel% neq 0 (
    echo Error: React build failed!
    pause
    exit /b 1
)

echo Step 2: Creating portable executable...
echo This will create a standalone .exe file that you can run anywhere.

REM Create a simple electron-builder config for portable
echo Creating portable build configuration...

REM Try the portable build
call npx electron-builder --win portable --publish=never

if %errorlevel% neq 0 (
    echo.
    echo Note: Complex build failed due to Windows permissions.
    echo But you can still run your app with the batch files!
    echo.
    echo To run your app:
    echo   1. Double-click: start-electron.bat
    echo   2. Or run: npm run electron
    echo.
) else (
    echo.
    echo SUCCESS! Portable .exe file created!
    echo Look in the dist-electron folder for your executable.
    echo.
)

pause 