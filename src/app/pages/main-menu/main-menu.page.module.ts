import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslationModule } from 'angular-l10n';
import { MAIN_MENU_ROUTE } from './route';
import { MainMenuPage } from './main-menu.page';
import { UIModule } from '../../ui/ui.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(MAIN_MENU_ROUTE),
    TranslationModule,
    UIModule,
  ],
  declarations: [
    MainMenuPage,
  ],
})
export class MainMenuPageModule {

}
