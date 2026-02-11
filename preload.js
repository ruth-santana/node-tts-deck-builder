const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  createFile: () => ipcRenderer.invoke('create-file'),
})
