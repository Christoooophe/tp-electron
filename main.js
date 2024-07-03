// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('node:path')

let data = "";
const questions = require('./data/questions.json')
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

ipcMain.on('get-questions', (event) => {
    event.sender.send('loaded-questions', questions)
})

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})

