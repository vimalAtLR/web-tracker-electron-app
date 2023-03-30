const { app, BrowserWindow, globalShortcut } = require("electron");
const windowStateKeeper = require("electron-window-state");
const path = require('path');
// const ioHook = require("../node_modules/iohook/index.js");
// const {keyboard} = require('keyboard');
const { events } = require('gkm');

let win;
let webContents;
let keys = [];
let globalKeyListener;

function createWindow() {
    // for manage state of window in screen
    const mainWindowState = windowStateKeeper({
        defaultHeight: 800,
        defaultWidth: 800,
    })

    // creating new window
    win = new BrowserWindow({
        x: mainWindowState.x,
        y: mainWindowState.y,
        height: mainWindowState.height,
        width: mainWindowState.width,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
        'web-preferences': {
            'web-security': false
        }
    });

    // getting webContents
    webContents = win.webContents;

    // loading url
    // win.loadURL('http://localhost:3000');

    // loading html from build
    win.loadURL("file://"+ path.join(__dirname, "../build/index.html#/"))

    // open developer tool when app get start
    win.webContents.openDevTools();
    // managing state with "electron-window-state" library
    mainWindowState.manage(win);




    // METHOD : 1 START
    // get which key pressed        NOTE: THIS WORKS ONLY WHEN WINDOW IS FOCUSED
    // webContents.on("before-input-event", (event, input) => {
    //     keys.push(input.key);
    //     console.log("keys :: ", keys)
    // });
    // METHOD : 1 END

    // METHOD : 2 START
    // globalKeyListener = new GlobalKeyboardListener();
    // globalKeyListener.addListener(function (e, down) {
    //     console.log(
    //         `${e.name} ${e.state == "DOWN" ? "DOWN" : "UP  "} [${e.rawKey._nameRaw}]`
    //     );
    // });
        // OR
    // globalKeyListener.on('keyup', (data) => {
    //     console.log("data key :: ", data);
    //   win.webContents.send('key-up', data);
    // });
    // globalKeyListener.start();
    // METHOD : 2 END


    // METHOD : 3 START
    // ioHook.on("keypress", event => {
    //     console.log(event);
    //     // {keychar: 'f', keycode: 19, rawcode: 15, type: 'keypress'}
    // });
    // ioHook.start();
    // METHOD : 3 END

    
    // METHOD : 4 START
    // Listen for key events outside the window
    // keyboard.startListening((event) => {
    //     console.log(`Key pressed: ${event.key}`);
    // });
    // METHOD : 4 END

    // METHOD : 5 START
    events.on('key.pressed', (data) => {
        console.log(`Key ${data[0]} pressed`);
    });
      
    events.on('key.released', (data) => {
        console.log(`Key ${data[0]} released`);
    });      
    // METHOD : 5 END

}

app.whenReady().then(createWindow);

app.on('ready', () => {

});
