# 🚀 Getting Started with Timetable Manager

Welcome to your professional Timetable Management System! This guide will help you get up and running quickly.

## 📋 Quick Start Checklist

- [ ] **Node.js installed** (version 16 or higher)
- [ ] **Dependencies installed** (`npm install`)
- [ ] **Application running** (`npm run electron-dev`)

## 🎯 One-Click Start (Windows)

Double-click `start.bat` - that's it! The application will:
1. Check if Node.js is installed
2. Install dependencies if needed
3. Launch the desktop application

## 🖥️ Manual Start Commands

### For Development (Recommended)
```bash
npm run electron-dev
```
*This starts both the React app and Electron desktop window*

### For Web Development Only
```bash
npm run dev
```
*This starts just the web version at http://localhost:5173*

## 🏗️ First Time Setup

### 1. Install Node.js
If you don't have Node.js installed:
- Visit [nodejs.org](https://nodejs.org/)
- Download the LTS version
- Run the installer

### 2. Install Dependencies
```bash
npm install
```

### 3. Start the Application
```bash
npm run electron-dev
```

## 📱 Application Overview

### Dashboard 📊
Your starting point with key statistics:
- **Total Courses**: 24 sample courses
- **Total Rooms**: 12 sample rooms  
- **Total Departments**: 5 departments
- **Weekly Classes**: 86 scheduled classes

### Navigation 🧭
Use the sidebar to navigate between:
- **Dashboard** - Overview and statistics
- **Timetable** - Weekly schedule grid
- **Courses** - Course management
- **Rooms** - Facility management
- **Departments** - Academic departments
- **Settings** - Preferences
- **Help** - Documentation and support

## ✨ Key Features to Try

### 📅 Creating Your First Timetable
1. Go to **Timetable** page
2. Click on any empty time slot
3. Add course details
4. Save and see it appear in the grid

### 📚 Adding Courses
1. Navigate to **Courses** page
2. Click **"Add Course"** button
3. Fill in course information
4. Assign to departments and instructors

### 🏢 Managing Rooms
1. Go to **Rooms** page
2. Add new rooms with capacity and equipment
3. Track availability status
4. Organize by buildings

## 🎨 Customization

### Theme Settings
- Go to **Settings** → **General**
- Choose between Light/Dark themes
- Adjust language and timezone

### Notifications
- Configure email and push notifications
- Set class reminders
- Enable schedule change alerts

## 💾 Data Management

### Auto-Save
- Your data is automatically saved
- Changes are preserved between sessions

### Export Options
- Export timetables to PDF or Excel
- Use the export buttons in the Timetable page

### Backup
- Automatic daily backups (configurable)
- Manual backup options in Settings

## 🔧 Troubleshooting

### Common Issues

**Application won't start?**
- Ensure Node.js is installed
- Run `npm install` to install dependencies
- Check if port 5173 is available

**Blank screen?**
- Wait a few seconds for the app to load
- Check the terminal for any error messages
- Try refreshing with `Ctrl+R`

**Performance issues?**
- Close unnecessary applications
- Ensure sufficient RAM (4GB+ recommended)
- Update to latest Node.js version

## 🚀 Advanced Usage

### Development Mode
```bash
npm run dev          # Web development server
npm run electron     # Electron with built files
npm run build        # Build for production
```

### Building for Distribution
```bash
npm run dist         # Create installer packages
```

## 📞 Support

Need help? Check these resources:
- **In-app Help**: Click the Help section in the sidebar
- **Documentation**: See README.md for detailed information
- **Sample Data**: Explore the pre-loaded sample data

## 🎉 You're Ready!

Your Timetable Manager is now ready to use. Start by exploring the Dashboard and sample data, then create your own courses and schedules.

**Pro Tip**: Use the search functionality in each section to quickly find specific courses, rooms, or departments.

Happy scheduling! 📅✨