var electronInstaller = require('electron-winstaller');

var resultPromise = electronInstaller.createWindowsInstaller({
  appDirectory: './app-builds/win-unpacked',
  outputDirectory: './app-builds',
  authors: 'Thai RA2 Lovers',
  exe: 'YuriNET2.exe',
  version: '2.0.0',
});

resultPromise.then(() => console.log("It worked!"), (e) => console.log(`No dice: ${e.message}`));
