import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationModule } from 'angular-l10n';
import { WindowComponent } from './window/window.component';
import { TitleBarComponent } from './title-bar/title-bar.component';

/**
 * UI Module for YuriNET2
 */
@NgModule({
  imports: [
    CommonModule,
    TranslationModule,

  ],
  declarations: [
    WindowComponent,
    TitleBarComponent,
  ],
  entryComponents: [],
  providers: [],
})
export class UIModule {

}
