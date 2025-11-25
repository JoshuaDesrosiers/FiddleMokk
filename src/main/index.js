import { app, shell, BrowserWindow, ipcMain,protocol } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import path from 'path'
import postcss from "postcss";
import tailwindcss from "tailwindcss";
import fs from 'fs'
import { pathToFileURL } from 'url'
import { Worker } from "worker_threads";



function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({

    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    titleBarStyle: 'hidden',
    trafficLightPosition: { x: 15, y: 15 },
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      nodeIntegrationInWorker: true,
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.whenReady().then(() => {
  // Set app user model id for windows
  protocol.handle('local', (request) => {
    const url = new URL(request.url)
    const filePath = path.join(app.getPath('userData'), url.pathname)
    return new Response(fs.readFileSync(filePath), {
      headers: { 'Content-Type': 'text/css' }
    })
  })
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC test
  ipcMain.on('ping', () => console.log('pong'))

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// Returns the Electron user data path
/**
 * IPC handler to process HTML content with Tailwind CSS and save the resulting CSS file.
 *
 * @param {Electron.IpcMainInvokeEvent} event - The event object.
 * @param {string} html - The raw HTML content to scan for Tailwind classes.
 * @returns {Promise<{success: boolean, path?: string, cssContent?: string, error?: string}>}
 */

