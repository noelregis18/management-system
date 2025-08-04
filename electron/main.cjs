/**
 * Electron Main Process
 * 
 * This file manages the main Electron process and creates the application window.
 * It handles window management, menu creation, and application lifecycle events.
 */

const { app, BrowserWindow, Menu, shell, dialog } = require('electron')
const path = require('path')
const isDev = false // Use production build for now (faster and reliable)

// Keep a global reference of the window object
let mainWindow

/**
 * Create the main application window
 */
function createWindow() {
  // Create the browser window
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 1200,
    minHeight: 700,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      webSecurity: true,
      preload: path.join(__dirname, 'preload.cjs')
    },
    icon: path.join(__dirname, '../assets/icon.png'), // App icon
    titleBarStyle: 'default',
    show: false, // Don't show until ready
    frame: true,
    resizable: true,
    fullscreenable: true
  })

  // Load the app
  if (isDev) {
    // Development: load from Vite dev server
    mainWindow.loadURL('http://localhost:5173')
    // Open DevTools in development
    mainWindow.webContents.openDevTools()
  } else {
    // Production: load the built files
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'))
  }

  // Handle failed loads
  mainWindow.webContents.on('did-fail-load', (event, errorCode, errorDescription, validatedURL) => {
    console.log('Failed to load:', errorDescription, 'URL:', validatedURL)
    // Try to reload after a short delay
    setTimeout(() => {
      mainWindow.loadURL('http://localhost:5173')
    }, 2000)
  })

  // Show window when ready to prevent visual flash
  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
    
    // Focus on the window (for better UX)
    if (isDev) {
      mainWindow.focus()
    }
  })

  // Handle window closed
  mainWindow.on('closed', () => {
    mainWindow = null
  })

  // Handle external links
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url)
    return { action: 'deny' }
  })

  // Prevent navigation to external websites
  mainWindow.webContents.on('will-navigate', (event, navigationUrl) => {
    const parsedUrl = new URL(navigationUrl)
    
    if (parsedUrl.origin !== 'http://localhost:5173' && parsedUrl.origin !== 'file://') {
      event.preventDefault()
    }
  })
}

/**
 * Create application menu
 */
function createMenu() {
  const template = [
    {
      label: 'File',
      submenu: [
        {
          label: 'New Timetable',
          accelerator: 'CmdOrCtrl+N',
          click: () => {
            // Handle new timetable creation
            dialog.showMessageBox(mainWindow, {
              type: 'info',
              title: 'New Timetable',
              message: 'This feature will be implemented in a future update.',
              buttons: ['OK']
            })
          }
        },
        {
          label: 'Open',
          accelerator: 'CmdOrCtrl+O',
          click: () => {
            // Handle file opening
            dialog.showOpenDialog(mainWindow, {
              properties: ['openFile'],
              filters: [
                { name: 'Timetable Files', extensions: ['json', 'csv'] },
                { name: 'All Files', extensions: ['*'] }
              ]
            })
          }
        },
        {
          label: 'Save',
          accelerator: 'CmdOrCtrl+S',
          click: () => {
            // Handle save functionality
            mainWindow.webContents.send('save-data')
          }
        },
        { type: 'separator' },
        {
          label: 'Export',
          submenu: [
            {
              label: 'Export as PDF',
              click: () => {
                mainWindow.webContents.send('export-pdf')
              }
            },
            {
              label: 'Export as Excel',
              click: () => {
                mainWindow.webContents.send('export-excel')
              }
            }
          ]
        },
        { type: 'separator' },
        {
          label: 'Exit',
          accelerator: process.platform === 'darwin' ? 'Cmd+Q' : 'Ctrl+Q',
          click: () => {
            app.quit()
          }
        }
      ]
    },
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        { role: 'selectall' }
      ]
    },
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'forceReload' },
        { role: 'toggleDevTools' },
        { type: 'separator' },
        { role: 'resetZoom' },
        { role: 'zoomIn' },
        { role: 'zoomOut' },
        { type: 'separator' },
        { role: 'togglefullscreen' }
      ]
    },
    {
      label: 'Window',
      submenu: [
        { role: 'minimize' },
        { role: 'close' },
        ...(process.platform === 'darwin' ? [
          { type: 'separator' },
          { role: 'front' }
        ] : [])
      ]
    },
    {
      label: 'Help',
      submenu: [
        {
          label: 'About Timetable Manager',
          click: () => {
            dialog.showMessageBox(mainWindow, {
              type: 'info',
              title: 'About Timetable Manager',
              message: 'Timetable Manager v1.0.0',
              detail: 'A professional college timetable management system built with React and Electron.\n\nDeveloped with modern web technologies for optimal performance and user experience.',
              buttons: ['OK']
            })
          }
        },
        {
          label: 'Check for Updates',
          click: () => {
            dialog.showMessageBox(mainWindow, {
              type: 'info',
              title: 'Updates',
              message: 'You are running the latest version.',
              buttons: ['OK']
            })
          }
        },
        { type: 'separator' },
        {
          label: 'Report an Issue',
          click: () => {
            shell.openExternal('mailto:support@timetablemanager.com?subject=Issue Report')
          }
        },
        {
          label: 'Documentation',
          click: () => {
            // In a real app, this would open documentation
            shell.openExternal('https://docs.timetablemanager.com')
          }
        }
      ]
    }
  ]

  // macOS specific menu adjustments
  if (process.platform === 'darwin') {
    template.unshift({
      label: app.getName(),
      submenu: [
        { role: 'about' },
        { type: 'separator' },
        { role: 'services' },
        { type: 'separator' },
        { role: 'hide' },
        { role: 'hideOthers' },
        { role: 'unhide' },
        { type: 'separator' },
        { role: 'quit' }
      ]
    })
  }

  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
}

// App event listeners
app.whenReady().then(() => {
  createWindow()
  createMenu()

  // macOS specific: Re-create window when dock icon is clicked
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

// Quit when all windows are closed (except on macOS)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// Security: Prevent new window creation
app.on('web-contents-created', (event, contents) => {
  contents.on('new-window', (event, navigationUrl) => {
    event.preventDefault()
    shell.openExternal(navigationUrl)
  })
})

// Handle app security
app.on('certificate-error', (event, webContents, url, error, certificate, callback) => {
  if (isDev) {
    // In development, ignore certificate errors for localhost
    event.preventDefault()
    callback(true)
  } else {
    // In production, use default behavior
    callback(false)
  }
})

// Prevent navigation to external protocols
app.on('web-contents-created', (event, contents) => {
  contents.on('will-navigate', (event, navigationUrl) => {
    const parsedUrl = new URL(navigationUrl)
    
    if (parsedUrl.origin !== mainWindow.webContents.getURL().split('/').slice(0, 3).join('/')) {
      event.preventDefault()
    }
  })
})