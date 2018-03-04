import { Component } from '@angular/core';
import { ElectronService } from '../../providers/electron.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavBarComponent {

  constructor(
    private electron: ElectronService,
  ) {

  }

  logout() {
    // TODO: real logout
    this.electron.exitApplication();
  }

}
