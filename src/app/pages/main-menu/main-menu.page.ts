import { Component, OnInit } from '@angular/core';
import { AuthSerivce } from '../../providers/auth-service/auth.service';

@Component({
  selector: 'main-menu-page',
  templateUrl: './main-menu.page.html',
})
export class MainMenuPage implements OnInit {

  tokenUrl: string;

  constructor(
    public auth: AuthSerivce,
  ) {
    this.tokenUrl = `http://play.thaira2.com/auth/logintoken/${auth.getUserData().token}`;
  }

  ngOnInit(): void {

    document.getElementById('webview').innerHTML = (`<webview src="${this.tokenUrl}" useragent="YuriNET2"></webview>`);

  }

}
