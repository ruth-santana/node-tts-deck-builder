const { app, BrowserWindow, ipcMain, dialog } = require('electron')
const { createFile } = require('./index')
const path = require('path')

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        },
        show: false
    })

    win.maximize()
    win.loadFile('index.html')
    win.show()
}

ipcMain.handle('create-file', async () => {
    try {
        await createFile()
        await dialog.showOpenDialog({
            properties: ['openDirectory', 'createDirectory']
        })
        return { success: true, message: 'file created' }
    } catch (err) {
        throw new Error('Failed to create file', err)
    }
})

app.whenReady().then(() => {
    createWindow()
})
