import 'zone.js';
import 'reflect-metadata';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { SuiModule } from 'ng2-semantic-ui';
import { LocalizationModule, LocaleService, TranslationService, TranslationModule } from 'angular-l10n';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';

import { AppRoutingModule } from './app-routing.module';

import { ElectronService } from './providers/electron.service';
import { AppState } from './app.state';
import { AlertController } from './providers/alert/alert.controller';
import { HttpService } from './providers/http-service/http.service';
import { AuthSerivce } from './providers/auth-service/auth.service';
import { UIModule } from './ui/ui.module';

@NgModule({
  imports: [
    BrowserModule,
    JsonpModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    SuiModule,
    LocalizationModule.forRoot(),
    TranslationModule.forRoot(),
    UIModule,
  ],
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  providers: [
    AppState,
    ElectronService,
    AlertController,
    HttpService,
    AuthSerivce,
  ],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule {

  constructor(public locale: LocaleService, public translation: TranslationService) {
    this.locale.addConfiguration()
      .addLanguages(['en', 'th'])
      .setCookieExpiration(30)
      .defineDefaultLocale('en', 'US')
      .defineCurrency('BTH');

    this.translation.addConfiguration()
      .addProvider('./assets/locale/');

    this.translation.init();
  }

}
