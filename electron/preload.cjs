/**
 * Electron Preload Script
 * 
 * This script runs in the renderer process before the web page loads.
 * It provides a secure bridge between the main process and renderer process.
 */

const { contextBridge, ipcRenderer } = require('electron')

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
  // Window controls
  minimize: () => ipcRenderer.invoke('window-minimize'),
  maximize: () => ipcRenderer.invoke('window-maximize'),
  close: () => ipcRenderer.invoke('window-close'),
  
  // File operations
  saveData: (data) => ipcRenderer.invoke('save-data', data),
  loadData: () => ipcRenderer.invoke('load-data'),
  exportPDF: (data) => ipcRenderer.invoke('export-pdf', data),
  exportExcel: (data) => ipcRenderer.invoke('export-excel', data),
  
  // System information
  getVersion: () => ipcRenderer.invoke('get-version'),
  getPlatform: () => ipcRenderer.invoke('get-platform'),
  
  // Event listeners
  onSaveData: (callback) => ipcRenderer.on('save-data', callback),
  onExportPDF: (callback) => ipcRenderer.on('export-pdf', callback),
  onExportExcel: (callback) => ipcRenderer.on('export-excel', callback),
  
  // Remove listeners
  removeAllListeners: (channel) => ipcRenderer.removeAllListeners(channel)
})