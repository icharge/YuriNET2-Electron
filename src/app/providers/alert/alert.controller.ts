import { Injectable } from '@angular/core';
import { ElectronService } from '../electron.service';

@Injectable()
export class AlertController {

  constructor(
    private electron: ElectronService,
  ) { }

  public confirm(title: string, message: string) {
    return this.electron.remote.dialog.showMessageBox(this.electron.remote.getCurrentWindow(), {
      type: 'warning',
      title,
      message,
      buttons: ['OK'],
    });
  }

}
