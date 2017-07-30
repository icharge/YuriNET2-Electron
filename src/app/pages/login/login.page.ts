import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ElectronService } from 'app/providers/electron.service';
import { AlertController } from '../../providers/alert/alert.controller';
import { AuthSerivce } from '../../providers/auth-service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'login-page',
  templateUrl: 'login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  formData: any = {};

  isSubmitted: boolean;

  constructor(
    private electron: ElectronService,
    private alertCtrl: AlertController,
    private auth: AuthSerivce,
    private router: Router,
  ) {
    this.isSubmitted = false;
  }

  submitLogin(e: Event, form: NgForm) {
    console.debug('Submit login :', e);
    console.debug('Submit form :', form);

    this.isSubmitted = true;

    this.auth.login(this.formData.username, this.formData.password).subscribe((response) => {
      console.debug('Logged in response :', response);

      if (response.result === 'success') {
        this.router.navigate(['/main']);
      } else {
        this.alertCtrl.alert({
          type: 'warning',
          title: 'YuriNET',
          message: `${response.result} : Username or Password is incorrect.`
        });
      }
    });
  }

  exitApplication() {
    this.electron.exitApplication();
  }

}
