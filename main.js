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
        const options = {
            title: 'Create/Save a File',
            defaultPath: path.join(app.getPath('downloads'), 'unnamed-deck'),
            buttonLabel: 'Save',
            filters: [
                { extensions: ['png'] }
            ]
        };
        const folder = (await dialog.showSaveDialog(BrowserWindow.getFocusedWindow(), options))?.filePath
        await createFile(cards, folder)
        return { success: true, message: 'file created' }
    } catch (err) {
        throw new Error('Failed to create file', err)
    }
})

app.whenReady().then(() => {
    createWindow()
})
