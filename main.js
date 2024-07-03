// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('node:path')

let data = "";
function createWindow () {
    const mainWindow = new BrowserWindow({
        width: 1400,
        height: 1200,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    mainWindow.loadFile('index.html')

    mainWindow.webContents.openDevTools()
}

app.whenReady().then(() => {
    createWindow()
    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

ipcMain.on('save-answer', (event, answer) => {
    data = answer;
    console.log(data)
})

ipcMain.on('send-response', (event) => {
    event.sender.send('load-response', data)
})

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})
