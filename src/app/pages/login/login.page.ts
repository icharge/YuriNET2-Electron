import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'login-page',
  templateUrl: 'login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  formData: any = {};

  isSubmitted: boolean;

  constructor(

  ) {
    this.isSubmitted = false;
  }

  submitLogin(e: Event, form: NgForm) {
    console.debug('Submit login :', e);
    console.debug('Submit form :', form);

    this.isSubmitted = true;
    let formError = { INVALID_CREDENTIAL: true };
  }

}
