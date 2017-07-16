import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuiModule } from 'ng2-semantic-ui';
import { TranslationModule } from 'angular-l10n';
import { WindowComponent } from './window/window.component';
import { TitleBarComponent } from './title-bar/title-bar.component';


const DECLARATIONS = [
  WindowComponent,
  TitleBarComponent,
];

/**
 * UI Module for YuriNET2
 */
@NgModule({
  imports: [
    CommonModule,
    TranslationModule,
    SuiModule,
  ],
  declarations: [
    ...DECLARATIONS,
  ],
  entryComponents: [],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
    ...DECLARATIONS,
  ],
})
export class UIModule {

}
