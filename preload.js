const { contextBridge, ipcRenderer, webUtils } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  createFile: (cards) => ipcRenderer.invoke('create-file', cards),
  getFilePath: (file) => webUtils.getPathForFile(file)
})
