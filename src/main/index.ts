/**
 * Claude Forge - Electron Main Process Entry Point
 *
 * This is the main entry point for the Electron application.
 * It creates the browser window and initializes all IPC handlers.
 */

import { app, BrowserWindow, Menu } from 'electron';
import { join } from 'path';
import { registerIPCHandlers } from './ipc-handlers';

// Get the icon path based on environment
function getIconPath(): string {
  const isDev = !app.isPackaged;
  if (isDev) {
    return join(__dirname, '../../assets/icon.ico');
  }
  return join(process.resourcesPath, 'assets/icon.ico');
}

// Reference to the main window to prevent garbage collection
let mainWindow: BrowserWindow | null = null;

// Determine if we're running in development mode
const isDev = !app.isPackaged;

// Prevent multiple instances of the app
const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
  app.quit();
}

/**
 * Creates the main application window with appropriate settings
 * for a desktop engineering environment.
 */
function createWindow(): void {
  // Platform-specific window configuration
  const isMac = process.platform === 'darwin';

  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 1000,
    minHeight: 700,
    backgroundColor: '#0a0a0a', // Match our grayscale theme
    titleBarStyle: isMac ? 'hiddenInset' : 'default',
    frame: !isMac, // Use native frame on Windows/Linux
    icon: getIconPath(), // Application icon
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      nodeIntegration: false,     // Security: disable node in renderer
      contextIsolation: true,     // Security: enable context isolation
      sandbox: false              // Allow preload script to use Node
    }
  });

  // Remove default menu for cleaner look
  Menu.setApplicationMenu(null);

  // Load the renderer
  if (isDev) {
    // Development: load from Vite dev server
    mainWindow.loadURL('http://localhost:5173');
    // DevTools can be opened manually with Ctrl+Shift+I or F12
  } else {
    // Production: load from built files
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'));
  }

  // Clean up reference when window is closed
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// Application lifecycle handlers

// Create window when Electron is ready
app.whenReady().then(() => {
  // Register all IPC handlers before creating the window
  registerIPCHandlers();

  createWindow();

  // macOS: recreate window when dock icon is clicked and no windows exist
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Focus existing window if second instance is launched
app.on('second-instance', () => {
  if (mainWindow) {
    if (mainWindow.isMinimized()) mainWindow.restore();
    mainWindow.focus();
  }
});

// Quit when all windows are closed (except on macOS)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
