import { app, BrowserWindow } from 'electron';
let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    titleBarStyle: 'hidden',
    titleBarOverlay: true,
    width: 1280,
    height: 832,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
    },
    trafficLightPosition: { x: 24, y: 25 },
  });

  mainWindow.loadURL('http://localhost:3000');

  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
  // eslint-disable-next-line no-undef
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
});
