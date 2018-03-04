import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConstant } from '../../app.constant';
import { IAuthResponse } from '../../models/auth/auth-response.interface';
import { User } from '../../models/auth/user.model';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthSerivce {

  private userData: User;

  constructor(
    private http: HttpClient,
  ) { }

  public login(username: string, password: string): Observable<IAuthResponse> {

    const body = new HttpParams();
    body.set('u', username);
    body.set('p', password);
    body.set('hds', '');

    return this.http.post<IAuthResponse>(AppConstant.LOGIN_URL, body.toString(), {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
    }).pipe(map((response) => {

      this.userData = {
        cdkey: response.cdkey,
        email: response.email,
        hdSerial: response.hdserial,
        joinDate: response.joindate,
        logged: response.logged,
        name: response.name,
        passPvpgn: response.passpvpgn,
        playerName: response.playername,
        preferCountry: response.prefer_country,
        role: response.role,
        specialName: response.specialname,
        status: response.status,
        token: response.token,
        uid: response.uid,
      };

      return response;
    }));
  }

  public logout() {

  }

  public getUserData(): User {
    return this.userData;
  }

}
