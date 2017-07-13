import { Injectable } from '@angular/core';
import { HttpService, RequestContentType } from '../http-service/http.service';
import { Observable } from 'rxjs';
import { AppConstant } from '../../app.constant';
import { IAuthResponse } from '../../models/auth/auth-response.interface';
import { UserModel } from '../../models/auth/user.model';

@Injectable()
export class AuthSerivce {

  private userData: UserModel;

  constructor(
    private http: HttpService,
  ) { }

  public login(username: string, password: string): Observable<IAuthResponse> {
    return this.http.httpPost<IAuthResponse>(AppConstant.LOGIN_URL, null, {
      u: username,
      p: password,
      hds: '', // TODO: HDD Serial
    }, RequestContentType.URL_ENCODED).map((response) => {
      const userModel = new UserModel();

      userModel.cdkey = response.cdkey;
      userModel.email = response.email;
      userModel.hdSerial = response.hdserial;
      userModel.joinDate = response.joindate;
      userModel.logged = response.logged;
      userModel.name = response.name;
      userModel.passPvpgn = response.passpvpgn;
      userModel.playerName = response.playername;
      userModel.preferCountry = response.prefer_country;
      userModel.role = response.role;
      userModel.specialName = response.specialname;
      userModel.status = response.status;
      userModel.token = response.token;
      userModel.uid = response.uid;

      this.userData = userModel;

      return response;
    });
  }

  public logout() {

  }

  public getUserData(): UserModel {
    return this.userData;
  }

}
