// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('node:path')
const questions = require('./data/questions.json');
const fs = require("fs");

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

ipcMain.on('send-score', (event, score, name) => {
    fs.appendFile("./data/results.txt", score + " : " + name + "\r\n", 'utf8', (err) => {
        if (err) throw err;
        console.log("Le fichier a été enregistré");
    });
})

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})

