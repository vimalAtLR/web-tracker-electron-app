const { app, BrowserWindow, globalShortcut, ipcMain, desktopCapturer, webContents } = require("electron");
const windowStateKeeper = require("electron-window-state");
const activeWindow = require('active-win');
const { UiohookKey, uIOhook } = require("uiohook-napi");
const path = require('path');
let win;
let activityData = {
    mouseMove: 0,
    mouseClick: 0,
    // mouseDrag: 0,
    mouseScroll: 0,
    keyPressed: 0,
    imgData: "",
    windowTitle: "",
};

ipcMain.on("give-me-activity-update", (event, args) => {
    desktopCapturer.getSources({ types: ['screen'], thumbnailSize: { height: 768, width: 1366}, fetchWindowIcons: true })
        .then( async sources => {
            try {
                let imgg = sources[0].thumbnail.toDataURL();
                let imgSource = sources[0].thumbnail.toDataURL();
                const fs = require('fs');
                imgg = imgg.replace(/^data:image\/\w+;base64,/, "")
                let buff = new Buffer(imgg, "base64");

                if (!fs.existsSync(path.join(__dirname, "./screenshots"))) {
                    fs.mkdirSync(path.join(__dirname, "./screenshots"));
                }
                
                fs.writeFile(`${__dirname}/screenshots/img${Math.random()}.png`, buff, "base64", function(err) {
                    if (err) {
                        console.log("err :: ", err);
                    }
                });
    
                let focusedWindow = await activeWindow();
                activityData.imgData = imgSource;
                activityData.windowTitle = focusedWindow.title;
    
                event.reply("ok-take-it", activityData);
                activityData = {
                    mouseMove: 0,
                    mouseClick: 0,
                    // mouseDrag: 0,
                    mouseScroll: 0,
                    keyPressed: 0,
                    imgData: "",
                    windowTitle: "" 
                }
            } catch (err) {
                console.log("err :: ", err);
            }
        });
});


function createWindow() {
    console.log("starting ####################################");
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
            enableRemoteModule: true,
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


    // HANDLE MOUSE AND KEYBOARD EVENTS INSIDE AND OUTSIDE THE WINDOW
    uIOhook.on('keydown', (e) => {
        activityData.keyPressed += 1;
    });
    uIOhook.on('mousemove', (e) => {
        activityData.mouseMove += 1;
    });
    uIOhook.on('click', (e) => {
        activityData.mouseClick += 1;
    });
    uIOhook.on('wheel', (e) => {
        activityData.mouseScroll += 1;
    });
    
    uIOhook.start();

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