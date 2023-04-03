const { app, BrowserWindow, globalShortcut, ipcMain } = require("electron");
const windowStateKeeper = require("electron-window-state");
const path = require('path');
const { events } = require('gkm');
const ioHook = require('iohook');
let win;
let activityData = {
    mouseMove: 0,
    mouseClick: 0,
    mouseDrag: 0,
    mouseScroll: 0,
    keyPressed: 0,
};

ipcMain.on("give-me-activity-update", (event, args) => {
    event.reply("ok-take-it", activityData);
    activityData = {
        mouseMove: 0,
        mouseClick: 0,
        mouseDrag: 0,
        mouseScroll: 0,
        keyPressed: 0,
    }
});


function createWindow() {
    // for manage state of window in screen
    const mainWindowState = windowStateKeeper({
        defaultHeight: 800,
        defaultWidth: 800,
    });

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

    // loading html from build
    win.loadURL("file://"+ path.join(__dirname, "../build/index.html#/"))

    // open developer tool when app get start
    win.webContents.openDevTools();
    // managing state with "electron-window-state" library
    mainWindowState.manage(win);

    
    // HANDLE KEYBOARD EVENTS INSIDE AND OUTSIDE THE WINDOW
    events.on('key.pressed', (data) => {
        activityData.keyPressed += 1;
        // console.log(`Key ${data[0]} pressed`);
    });


    // HANDLE MOUSE EVENTS INSIDE AND OUTSIDE THE WINDOW
    ioHook.on('mousemove', (event) => { 
        activityData.mouseMove += 1;
    });
    ioHook.on('mouseclick', (event) => { 
        activityData.mouseClick += 1;
    });
    ioHook.on('mousedrag', (event) => { 
        activityData.mouseDrag += 1;
    });
    ioHook.on('mousewheel', (event) => { 
        activityData.mouseScroll += 1;
    });

    ioHook.start();

}

app.whenReady().then(createWindow);

app.on('ready', () => {
    globalShortcut.register('Alt+1', function() {
        console.log('Left mouse button clicked!');
      });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
       app.quit();
    }
 })