# 🎓 Timetable Manager

A **professional desktop application** for managing college timetables, built with modern web technologies. This standalone application provides an intuitive interface for creating, managing, and organizing academic schedules.

![Timetable Manager](https://img.shields.io/badge/version-1.0.0-blue.svg)
![React](https://img.shields.io/badge/React-18.2.0-blue.svg)
![Electron](https://img.shields.io/badge/Electron-27.1.3-green.svg)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3.6-blue.svg)

## ✨ Features

### 📊 Dashboard
- **Real-time Statistics**: View total courses, rooms, departments, and weekly classes
- **Recent Activity**: Track recent changes and updates
- **Quick Actions**: Fast access to common tasks

### 📅 Timetable Management
- **Interactive Grid**: Drag-and-drop interface for scheduling
- **Conflict Detection**: Automatic detection of scheduling conflicts
- **Multiple Views**: Daily, weekly, and monthly calendar views
- **Export Options**: PDF and Excel export functionality

### 📚 Course Management
- **Comprehensive Database**: Store detailed course information
- **Department Organization**: Organize courses by academic departments
- **Instructor Assignment**: Assign and manage course instructors
- **Credit Tracking**: Monitor credit hours and course duration

### 🏢 Room Management
- **Facility Tracking**: Manage classrooms and their capacities
- **Equipment Management**: Track available equipment per room
- **Availability Status**: Real-time room availability
- **Building Organization**: Organize rooms by buildings and floors

### 🏛️ Department Management
- **Administrative Details**: Store department head information
- **Contact Management**: Maintain phone and email contacts
- **Faculty Tracking**: Monitor faculty count per department
- **Student Enrollment**: Track student numbers by department

### ⚙️ Settings & Configuration
- **Theme Customization**: Light/dark mode support
- **Notification Preferences**: Customizable alert system
- **Backup Management**: Automatic and manual backup options
- **Export Settings**: Configure default export formats

## 🚀 Quick Start

### Prerequisites
- **Node.js** (version 16 or higher)
- **npm** or **yarn** package manager

### Installation & Setup

1. **Clone or Download** the project files
2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start Development Server**:
   ```bash
   npm run dev
   ```

4. **Run as Desktop App**:
   ```bash
   npm run electron-dev
   ```

### 🎯 One-Command Start
```bash
npm run electron-dev
```
This single command will:
- Start the Vite development server
- Launch the Electron desktop application
- Enable hot-reload for instant updates

## 📦 Building for Production

### Build Web Version
```bash
npm run build
```

### Build Desktop Application
```bash
npm run electron-build
```

### Create Installer
```bash
npm run dist
```

## 🛠️ Tech Stack

| Technology | Purpose | Version |
|------------|---------|---------|
| **React** | UI Framework | 18.2.0 |
| **Vite** | Build Tool | 4.5.0 |
| **Electron** | Desktop App | 27.1.3 |
| **Tailwind CSS** | Styling | 3.3.6 |
| **React Router** | Navigation | 6.20.1 |
| **Lucide React** | Icons | 0.294.0 |

## 📁 Project Structure

```
timetable-manager/
├── 📁 src/
│   ├── 📁 components/          # React components
│   │   ├── Dashboard.jsx       # Main dashboard
│   │   ├── Sidebar.jsx         # Navigation sidebar
│   │   ├── Timetable.jsx       # Timetable management
│   │   ├── Courses.jsx         # Course management
│   │   ├── Rooms.jsx           # Room management
│   │   ├── Departments.jsx     # Department management
│   │   ├── Settings.jsx        # Application settings
│   │   ├── Help.jsx            # Help and support
│   │   └── StatCard.jsx        # Reusable stat card
│   ├── App.jsx                 # Main app component
│   ├── main.jsx                # React entry point
│   └── index.css               # Global styles
├── 📁 electron/
│   ├── main.js                 # Electron main process
│   └── preload.js              # Electron preload script
├── 📄 package.json             # Dependencies and scripts
├── 📄 vite.config.js          # Vite configuration
├── 📄 tailwind.config.js      # Tailwind CSS config
└── 📄 README.md               # This file
```

## 🎨 Key Design Features

### Professional UI/UX
- **Modern Design**: Clean, professional interface matching industry standards
- **Responsive Layout**: Adaptive design for different screen sizes
- **Smooth Animations**: Subtle transitions and hover effects
- **Consistent Theming**: Unified color scheme and typography

### Accessibility
- **Keyboard Navigation**: Full keyboard support
- **Screen Reader Friendly**: Proper ARIA labels and semantic HTML
- **Color Contrast**: WCAG compliant color combinations
- **Focus Indicators**: Clear focus states for interactive elements

### Performance
- **Fast Loading**: Optimized bundle sizes with Vite
- **Smooth Interactions**: 60fps animations and transitions
- **Memory Efficient**: Optimized state management
- **Background Processing**: Non-blocking operations

## 🔧 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run electron` | Run Electron with built files |
| `npm run electron-dev` | **Start development with Electron** |
| `npm run electron-build` | Build Electron app |
| `npm run dist` | Create distributable packages |

## 📱 Platform Support

- ✅ **Windows** (Windows 10/11)
- ✅ **macOS** (macOS 10.15+)
- ✅ **Linux** (Ubuntu 18.04+)

## 🔒 Security Features

- **Sandboxed Renderer**: Isolated renderer process
- **Context Isolation**: Secure context bridge
- **Content Security Policy**: Protection against XSS
- **No Node Integration**: Secure renderer environment

## 📊 Sample Data

The application comes with sample data to help you get started:
- **24 Sample Courses** across different departments
- **12 Sample Rooms** with various capacities and equipment
- **5 Academic Departments** with complete information
- **Sample Timetable** with realistic scheduling

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: Check the Help section in the app
- **Issues**: Report bugs via GitHub issues
- **Email**: noel.regis04@gmail.com , mdrakqibalam@gmail.com
- **Community**: Join our community forum

## 🙏 Acknowledgments

- Built with ❤️ using React and Electron
- Icons by [Lucide](https://lucide.dev)
- UI components styled with [Tailwind CSS](https://tailwindcss.com)

---

**Happy Scheduling! 🎓📅**
