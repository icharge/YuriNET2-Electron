import { Injectable } from '@angular/core';
import { HttpService, RequestContentType } from '../http-service/http.service';
import { Observable } from 'rxjs';
import { AppConstant } from '../../app.constant';

@Injectable()
export class AuthSerivce {

  constructor(
    private http: HttpService,
  ) { }

  public login(username: string, password: string): Observable<any> {
    return this.http.httpPost(AppConstant.LOGIN_URL, null, {
      u: username,
      p: password,
      hds: '', // TODO: HDD Serial
    }, RequestContentType.URL_ENCODED);
  }

}
