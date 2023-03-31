const { app, BrowserWindow, globalShortcut } = require("electron");
const windowStateKeeper = require("electron-window-state");
const path = require('path');
const { events } = require('gkm');
const ioHook = require('iohook');

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

    // loading html from build
    win.loadURL("file://"+ path.join(__dirname, "../build/index.html#/"))

    // open developer tool when app get start
    win.webContents.openDevTools();
    // managing state with "electron-window-state" library
    mainWindowState.manage(win);

    
    // HANDLE KEYBOARD EVENTS INSIDE AND OUTSIDE THE WINDOW
    events.on('key.pressed', (data) => {
        console.log(`Key ${data[0]} pressed`);
    });
    events.on('key.released', (data) => {
        console.log(`Key ${data[0]} released`);
    });      


    // HANDLE MOUSE EVENTS INSIDE AND OUTSIDE THE WINDOW
    ioHook.on('mousemove', (event) => { 
        console.log(event); 
        // { button: 0, clicks: 0, x: 960, y: 652, type: 'mousemove' }
    });
    ioHook.on('keydown', (event) => { 
        console.log("keydown :: ", event); 
    });
    ioHook.on('keyup', (event) => { 
        console.log("keyup :: ", event); 
    });
    ioHook.on('mouseclick', (event) => { 
        console.log("mouseclick :: ", event); 
        // { button: 1, clicks: 1, x: 931, y: 143, type: 'mouseclick' }
    });
    ioHook.on('mousedown', (event) => { 
        console.log("mousedown :: ", event); 
        // { button: 1, clicks: 1, x: 931, y: 143, type: 'mousedown' }
    });
    ioHook.on('mouseup', (event) => { 
        console.log("mouseup :: ", event); 
        // { button: 1, clicks: 0, x: 628, y: 324, type: 'mouseup' }
    });
    ioHook.on('mousedrag', (event) => { 
        console.log("mousedrag :: ", event); 
        // { button: 0, clicks: 0, x: 628, y: 324, type: 'mousedrag' }
    });
    ioHook.on('mousewheel', (event) => { 
        console.log("mousewheel :: ", event); 
        // { amount: 3, clicks: 1, direction: 3, rotation: -1, type: 'mousewheel', x: 764, y: 355
    });

    ioHook.start();

}

app.whenReady().then(createWindow);

app.on('ready', () => {
    globalShortcut.register('Alt+1', function() {
        console.log('Left mouse button clicked!');
      });
});
