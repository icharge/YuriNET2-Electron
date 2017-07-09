import { Injectable } from '@angular/core';

@Injectable()
export class AppState {

  private _session;

  get session() {
    return this._session;
  }

}