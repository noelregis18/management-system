@echo off
echo Building Timetable Manager Desktop Application (.exe file)...
echo.

REM Build the React app first
echo Step 1: Building React application...
call npm run build

if %errorlevel% neq 0 (
    echo Error: React build failed!
    pause
    exit /b 1
)

echo Step 2: Creating desktop application...
echo This may take a few minutes...

REM Try to build the exe file
call npm run electron-build

if %errorlevel% neq 0 (
    echo.
    echo Warning: Complex build failed, but we can still run the app!
    echo.
    echo Alternative: You can run the app directly with:
    echo   npm run electron
    echo.
    echo Or use the batch files:
    echo   start-electron.bat
    echo   start-electron-dev.bat
    echo.
) else (
    echo.
    echo SUCCESS! Your .exe file has been created!
    echo Check the dist-electron folder for your installer.
    echo.
)

pause 