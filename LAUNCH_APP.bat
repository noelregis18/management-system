@echo off
title Timetable Manager - Professional Desktop Application
color 0B

cls
echo.
echo  ████████╗██╗███╗   ███╗███████╗████████╗ █████╗  ██████╗ █████╗ ███████╗███████╗
echo  ╚══██╔══╝██║████╗ ████║██╔════╝╚══██╔══╝██╔══██╗██╔════╝██╔══██╗██╔════╝██╔════╝
echo     ██║   ██║██╔████╔██║█████╗     ██║   ███████║██║     ███████║███████╗███████╗
echo     ██║   ██║██║╚██╔╝██║██╔══╝     ██║   ██╔══██║██║     ██╔══██║╚════██║╚════██║
echo     ██║   ██║██║ ╚═╝ ██║███████╗   ██║   ██║  ██║╚██████╗██║  ██║███████║███████║
echo     ╚═╝   ╚═╝╚═╝     ╚═╝╚══════╝   ╚═╝   ╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝╚══════╝╚══════╝
echo.
echo  ███╗   ███╗ █████╗ ███╗   ██╗ █████╗  ██████╗ ███████╗██╗  ██╗███████╗██████╗ 
echo  ████╗ ████║██╔══██╗████╗  ██║██╔══██╗██╔════╝ ██╔════╝██║  ██║██╔════╝██╔══██╗
echo  ██╔████╔██║███████║██╔██╗ ██║███████║██║  ███╗█████╗  ███████║█████╗  ██████╔╝
echo  ██║╚██╔╝██║██╔══██║██║╚██╗██║██╔══██║██║   ██║██╔══╝  ██╔══██║██╔══╝  ██╔══██╗
echo  ██║ ╚═╝ ██║██║  ██║██║ ╚████║██║  ██║╚██████╔╝███████╗██║  ██║███████╗██║  ██║
echo  ╚═╝     ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝
echo.
echo  ================================================================================
echo                    Professional Desktop Application v1.0.0
echo  ================================================================================
echo.
echo  Loading your desktop application...
echo  This will open your React app as a native Windows application.
echo.
echo  Features included:
echo  ✓ Dashboard with statistics
echo  ✓ Personal 5th semester timetable
echo  ✓ Course management system
echo  ✓ Room allocation system
echo  ✓ Activity tracking
echo  ✓ Settings and preferences
echo  ✓ Professional desktop interface
echo.
echo  Please wait while the application loads...
echo.

REM Build the React app silently
call npm run build >nul 2>&1

if %errorlevel% neq 0 (
    echo Error: Failed to build the application.
    echo Please make sure all dependencies are installed.
    pause
    exit /b 1
)

echo Build completed successfully!
echo Starting desktop application...
echo.

REM Start the Electron app
call npm run electron

echo.
echo ================================================================================
echo  Application closed. Thank you for using Timetable Manager!
echo ================================================================================
echo.
pause 