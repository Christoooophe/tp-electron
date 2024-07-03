const {contextBridge, ipcRenderer} = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    saveAnswer: (note) => {
        ipcRenderer.send('save-answer', note)
    },
    sendResponse: () => {
        ipcRenderer.send('send-response')
    },
    loadResponse: (callback) => {
        ipcRenderer.on('load-response', (event, data) => {
            callback(data);
        })
    }
})
