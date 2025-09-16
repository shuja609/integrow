import path from 'path'
import { app, ipcMain, BrowserWindow } from 'electron'
import serve from 'electron-serve'
import { createWindow } from './helpers'

const isProd = process.env.NODE_ENV === 'production'

// Prevent multiple instances of the app
const gotTheLock = app.requestSingleInstanceLock()

if (!gotTheLock) {
  app.quit()
} else {
  app.on('second-instance', (event, commandLine, workingDirectory) => {
    // Someone tried to run a second instance, we should focus our window instead
    const windows = BrowserWindow.getAllWindows()
    if (windows.length > 0) {
      const mainWindow = windows[0]
      if (mainWindow.isMinimized()) mainWindow.restore()
      mainWindow.focus()
    }
  })

  if (isProd) {
    serve({ directory: 'app' })
  } else {
    app.setPath('userData', `${app.getPath('userData')} (development)`)
  }

  ;(async () => {
    await app.whenReady()

    const mainWindow = createWindow('main', {
      width: 1000,
      height: 600,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js')
      }
    })

    if (isProd) {
      await mainWindow.loadURL('app://./')
    } else {
      const port = process.argv[2]
      
      await mainWindow.loadURL(`http://localhost:${port}/`)
      mainWindow.webContents.openDevTools()
    }
  })()

  app.on('window-all-closed', () => {
    app.quit()
  })
}
