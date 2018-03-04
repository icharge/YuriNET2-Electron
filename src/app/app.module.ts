import 'zone.js';
import 'reflect-metadata';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, APP_INITIALIZER } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SuiModule } from 'ng2-semantic-ui';
import { TranslationModule, L10nConfig, StorageStrategy, ProviderType, L10nLoader } from 'angular-l10n';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';

import { AppRoutingModule } from './app-routing.module';

import { ElectronService } from './providers/electron.service';
import { AppState } from './app.state';
import { AlertController } from './providers/alert/alert.controller';
import { AuthSerivce } from './providers/auth-service/auth.service';
import { UIModule } from './ui/ui.module';
import { LocalizationService } from './providers/localization/localization-service';
import { initLocalization } from './providers/localization/index';

const l10nConfig: L10nConfig = {
  locale: {
    languages: [
      { code: 'en', dir: 'ltr' },
      { code: 'th', dir: 'ltr' }
    ],
    language: 'en',
    storage: StorageStrategy.Cookie
  },
  translation: {
    providers: [
      { type: ProviderType.Static, prefix: './assets/locale/' }
    ],
    caching: true,
    missingValue: 'No key'
  }
};


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    SuiModule,
    // LocalizationModule,
    TranslationModule.forRoot(l10nConfig),
    UIModule,
  ],
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  providers: [
    AppState,
    ElectronService,
    LocalizationService,
    {
      provide: APP_INITIALIZER,
      useFactory: initLocalization,
      deps: [LocalizationService],
      multi: true
    },
    AlertController,
    AuthSerivce,
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {

  constructor(public l10nLoader: L10nLoader) {
    this.l10nLoader.load();
  }

}
