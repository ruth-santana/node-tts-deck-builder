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

ipcMain.handle('create-file', async (event, cards) => {
    try {
        const folder = (await dialog.showOpenDialog({
            properties: ['openDirectory', 'createDirectory']
        }))?.filePaths[0] ?? 'generated'
        await createFile(cards, folder)
        return { success: true, message: 'file created' }
    } catch (err) {
        throw new Error('Failed to create file', err)
    }
})

app.whenReady().then(() => {
    createWindow()
})
