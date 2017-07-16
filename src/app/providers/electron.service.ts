import { Injectable } from '@angular/core';

// If you import a module but never use any of the imported values other than as TypeScript types,
// the resulting javascript file will look as if you never imported the module at all.
import * as Electron from 'electron';
import * as childProcess from 'child_process';

@Injectable()
export class ElectronService {

  electron: typeof Electron;
  ipcRenderer: typeof Electron.ipcRenderer;
  childProcess: typeof childProcess;
  remote: typeof Electron.remote;

  constructor() {
    // Conditional imports
    if (this.isElectron()) {
      this.electron = window.require('electron');
      this.remote = this.electron.remote;
      this.ipcRenderer = this.electron.ipcRenderer;
      this.childProcess = window.require('child_process');
    }
  }

  public isElectron(): string {
    return window && window.process && window.process.type;
  }

  public exitApplication(): void {
    this.remote.app.exit();
  }

}
