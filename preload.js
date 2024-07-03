const {contextBridge, ipcRenderer} = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    getQuestions: () => {
        ipcRenderer.send('get-questions')
    },
    getLoadedQuestions: (callback) => {
        ipcRenderer.on('loaded-questions', (event, data) => {
            callback(data);
        })
    },
    sendScore: (score, name) => {
        ipcRenderer.send('send-score', score, name)
    },

})
