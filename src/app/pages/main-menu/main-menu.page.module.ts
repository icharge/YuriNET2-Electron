import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslationModule } from 'angular-l10n';
import { MAIN_MENU_ROUTE } from './route';
import { MainMenuPage } from './main-menu.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(MAIN_MENU_ROUTE),
    TranslationModule,
  ],
  declarations: [
    MainMenuPage,
  ],
})
export class MainMenuPageModule {

}
