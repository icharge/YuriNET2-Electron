import { Injectable } from '@angular/core';
import * as Electron from 'electron';
import { ElectronService } from '../electron.service';

@Injectable({
  providedIn: 'root',
})
export class AlertController {

  private dialog: Electron.Dialog;

  constructor(
    private electron: ElectronService,
  ) {
    this.dialog = electron.remote.dialog;
  }

  public alert(messageOptions: Electron.MessageBoxOptions) {
    return this.dialog.showMessageBox(this.getCurrentWindow(), messageOptions);
  }

  private getCurrentWindow(): Electron.BrowserWindow {
    return this.electron.remote.getCurrentWindow();
  }

}
