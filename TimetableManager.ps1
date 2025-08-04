# Timetable Manager Desktop Application
# Professional React + Electron Desktop App

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   TIMETABLE MANAGER DESKTOP APP" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Starting your desktop application..." -ForegroundColor Green
Write-Host "This will open your React app as a native Windows application." -ForegroundColor White
Write-Host ""

Write-Host "Features included:" -ForegroundColor Yellow
Write-Host "✓ Dashboard with statistics" -ForegroundColor Green
Write-Host "✓ Personal 5th semester timetable" -ForegroundColor Green
Write-Host "✓ Course management system" -ForegroundColor Green
Write-Host "✓ Room allocation system" -ForegroundColor Green
Write-Host "✓ Activity tracking" -ForegroundColor Green
Write-Host "✓ Settings and preferences" -ForegroundColor Green
Write-Host "✓ Professional desktop interface" -ForegroundColor Green
Write-Host ""

Write-Host "Building React application..." -ForegroundColor Blue
npm run build

if ($LASTEXITCODE -eq 0) {
    Write-Host "Build completed successfully!" -ForegroundColor Green
    Write-Host "Starting desktop application..." -ForegroundColor Blue
    Write-Host ""
    
    # Start the Electron app
    npm run electron
} else {
    Write-Host "Error: Failed to build the application." -ForegroundColor Red
    Write-Host "Please make sure all dependencies are installed." -ForegroundColor Red
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Application closed. Thank you for using Timetable Manager!" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Read-Host "Press Enter to exit" 