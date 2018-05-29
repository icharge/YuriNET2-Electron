import { app, BrowserWindow, screen, protocol, dialog } from 'electron';
import * as path from 'path';
import * as url from 'url';

let win, serve;
const args = process.argv.slice(1);
serve = args.some(val => val === '--serve');

const unregisterCustomProtocol = registerCustomProtocol();

try {
  require('dotenv').config();
} catch {
  console.log('asar');
}

function createMainWindow() {

  protocol.registerHttpProtocol('ynnet', (req, cb) => {
    // console.log(`ynnet:// :`, req);
    const urlParsed = url.parse(req.url);
    console.log('URL :', urlParsed);

    switch (urlParsed.host) {
      case 'play':
        dialog.showMessageBox(win, {
          message: `Play ${urlParsed.query}`
        });
        break;

      case 'settings':
        dialog.showMessageBox(win, {
          message: `settings ${urlParsed.query}`
        });
        break;

      default:
        dialog.showMessageBox(win, {
          message: `${urlParsed.host} ${urlParsed.query}`
        });
    }
  });

  const electronScreen = screen;
  const size = electronScreen.getPrimaryDisplay().workAreaSize;

  // Create the browser window.
  win = new BrowserWindow({
    // x: 0,
    // y: 0,
    width: size.width / 1.5,
    height: size.height / 1.2,
    minWidth: 700,
    minHeight: 600,
    frame: false,
    // center: true,
    backgroundColor: '#000',
    webPreferences: { webSecurity: false }, // Temporary disable security.
  });

  if (serve) {
    require('electron-reload')(__dirname, {
    });
    win.loadURL('http://localhost:4200', {
      userAgent: 'YuriNET2',
    });
  } else {
    win.loadURL(url.format({
      pathname: path.join(__dirname, 'dist/index.html'),
      protocol: 'file:',
      slashes: true,
    }), { userAgent: 'YuriNET2' });
  }

  win.webContents.openDevTools();



  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store window
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
    unregisterCustomProtocol();
  });
}

function registerCustomProtocol() {
  protocol.registerStandardSchemes(['ynnet']);

  return () => {
    protocol.unregisterProtocol('ynnet');
    protocol.uninterceptProtocol('ynnet');
  };
}

try {

  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on('ready', createMainWindow);

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
      createMainWindow();
    }
  });

} catch (e) {
  // Catch Error
  // throw e;
}
