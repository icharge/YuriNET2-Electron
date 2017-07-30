/**
 * localization-service
 * Created by NorrapatN on 4/21/2017.
 */
import { Injectable } from '@angular/core';
import { LocaleService, TranslationService } from 'angular-l10n';

@Injectable()
export class LocalizationService {
  private suppertLanguage = ['en', 'th'];
  constructor(public locale: LocaleService, public translation: TranslationService) { }

  load(): Promise<any> {
    this.locale.addConfiguration()
      .addLanguages(this.suppertLanguage)
      .setCookieExpiration(30)
      .defineLanguage('en');
    this.locale.init();

    this.translation.addConfiguration().addProvider('./assets/locale/');

    const promise: Promise<any> = new Promise((resolve: any) => {
      this.translation.translationChanged.subscribe(() => {
        resolve(true);
      }, error => {
        console.warn('Error => ', error);
      });
    });

    this.translation.init();

    return promise;
  }

}
