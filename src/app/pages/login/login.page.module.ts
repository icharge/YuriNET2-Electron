import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TranslationModule } from 'angular-l10n';
import { LoginPage } from './login.page';
import { LOGIN_ROUTE } from './route';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(LOGIN_ROUTE),
    TranslationModule,
  ],
  declarations: [
    LoginPage,
  ],
})
export class LoginPageModule { }
