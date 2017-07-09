import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertController } from '../../providers/alert/alert.controller';

@Component({
  selector: 'login-page',
  templateUrl: 'login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  formData: any = {};

  isSubmitted: boolean;

  constructor(
    private alertCtrl: AlertController,

  ) {
    this.isSubmitted = false;
  }

  submitLogin(e: Event, form: NgForm) {
    console.debug('Submit login :', e);
    console.debug('Submit form :', form);

    this.isSubmitted = true;
    this.alertCtrl.confirm('YuriNET', 'hello');
  }

}
