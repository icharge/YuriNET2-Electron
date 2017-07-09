/**
 * http.service
 * Created by NorrapatN on 4/20/2017.
 */

import { Http, Response, URLSearchParams, Headers, RequestOptions, Jsonp, RequestOptionsArgs, ResponseContentType } from '@angular/http';
import { Observable, Subject } from 'rxjs';
// import { ConfigService } from '../config';
import { Injectable } from '@angular/core';
import { RxJSUtil } from "../../utilities/rxjs.util";
import { EAFSessionModel } from '../../model/authentication/eaf-session.model';

export function urlEncode(obj: Object): string {
  let urlSearchParams = new URLSearchParams();
  for (let key in obj) {
    urlSearchParams.append(key, obj[key]);
  }
  return urlSearchParams.toString();
}

export enum RequestContentType {
  URL_ENCODED = <any>'application/x-www-form-urlencoded',
  APPLICATION_JSON = <any>'application/json',
  MULTI_PART = <any>'multipart/form-data'
}

@Injectable()
export class HttpService {

  constructor(
    //public config: ConfigService,
    public http: Http,
    public jsonp: Jsonp,
  ) {

  }

  protected static get hostname() {
    // return this.config.get('service.hostname');
    return ''; // TODO: fix here
  }

  /**
   * Make a complete of URL
   */
  public static urlWithHost(url: string): string {
    return this.hostname + url;
  }

  protected handleError(error: Response) {
    // in a real world app, we may send the error to some remote logging infrastructure
    // instead of just logging it to the console
    console.warn(error);
    return Observable.throw(error);
  }

  /**
   * HTTP Get request
   * this will return observable with mapped response data as Object
   * 
   * @param url URL
   * @param searchParams (Optional) Search parameters as Map
   * @param headerAdditional (Optional) Request header as Map
   */
  public httpGet<T>(url: string, searchParams?: string | URLSearchParams | {
    [key: string]: any | any[];
  }, headerAdditional?: { [key: string]: any }): Observable<T> {

    let observable = this.httpGetObservable<T>(url, searchParams, headerAdditional)
      .map(res => <T>res.json())
      // .do(data => console.log('HTTP Get:', data)) // eyeball results in the console
      .catch(this.handleError);

    // observable.publish().connect();
    return RxJSUtil.makeHot(observable);
  }

  /**
   * HTTP Get request
   * this will return observable without mapped response data
   * 
   * @param url URL
   * @param searchParams (Optional) Search parameters as Map 
   * @param headerAdditional (Optional) Request header as Map
   */
  public httpGetObservable<T>(url: string, searchParams?: string | URLSearchParams | {
    [key: string]: any | any[];
  }, headerAdditional?: { [key: string]: any }): Observable<Response> {
    // Using search param
    // let searchParams: URLSearchParams = new URLSearchParams();

    // // Check if parameters
    // if (searchParams != null) {

    //   // Put parameters to URL Search params
    //   for (let key in searchParams) {
    //     if (searchParams.hasOwnProperty(key)) {
    //       let value = searchParams[key];
    //       searchParams.set(key, value);
    //     }
    //   }
    // }

    let headers = new Headers({
      'X-Requested-With': 'XMLHttpRequest',
      ...headerAdditional,
    });

    return this.http.get(url, { search: searchParams, headers });
  }

  /**
   * HTTP Post request
   * this will return observable without mapped response data
   * 
   * @param url URL
   * @param searchParams (Optional) Search parameters as Map 
   * @param bodyParams (Optional) Body parameters as Map
   * @param contentType (Optional) Request Content Type. Possible value will be APPLICATION/JSON or FORM-URLENCODED @see RequestContentType
   * @param headerAdditional (Optional) Request header as Map
   */
  public httpPostObservable<T>(url: string, searchParams?: { [key: string]: any }, bodyParams?: { [key: string]: any },
    contentType?: RequestContentType, headerAdditional?: { [key: string]: any }): Observable<Response> {

    contentType = contentType || RequestContentType.APPLICATION_JSON;

    let body: any = null;

    switch (contentType) {
      case RequestContentType.URL_ENCODED:
        body = urlEncode(bodyParams);
        break;

      case RequestContentType.MULTI_PART:
        body = bodyParams;
        break;

      case RequestContentType.APPLICATION_JSON:
      default:
        body = JSON.stringify(bodyParams);
    }

    let headers = null;

    if (contentType == RequestContentType.MULTI_PART)
      headers = new Headers({
        'X-Requested-With': 'XMLHttpRequest',
        ...headerAdditional,
      });
    else {
      headers = new Headers({
        'Content-Type': contentType,
        'X-Requested-With': 'XMLHttpRequest',
        ...headerAdditional,
      });
    }


    let options = new RequestOptions({ headers: headers, search: searchParams, body });
    return this.http.post(url, body, options);
  }

  /**
   * HTTP Post request
   * this will return observable without mapped response data
   * 
   * @param url URL
   * @param searchParams (Optional) Search parameters as Map
   * @param bodyParams (Optional) Body parameters as Map
   * @param contentType (Optional) Request Content Type. Possible value will be APPLICATION/JSON or FORM-URLENCODED @see RequestContentType
   * @param headerAdditional (Optional) Request header as Map
   */
  public httpPost<T>(url: string, searchParams?: { [key: string]: any }, bodyParams?: { [key: string]: any },
    contentType?: RequestContentType, headerAdditional?: { [key: string]: any }): Observable<T> {
    let observable = this.httpPostObservable<T>(url, searchParams, bodyParams, contentType, headerAdditional)
      .map(res => <T>res.json())
      .catch(this.handleError);

    return RxJSUtil.makeHot(observable);
  }

  // public httpRestPost<T>(url: string, eafAuthenM: {}, params?: {}, contentType?: RequestContentType): Observable<T> {
  //   contentType = contentType || RequestContentType.APPLICATION_JSON;
  //   let body: string = null;
  //   switch (contentType) {
  //     case RequestContentType.URL_ENCODED:
  //       body = urlEncode(params);
  //       break;
  //     case RequestContentType.APPLICATION_JSON:
  //     default:
  //       body = JSON.stringify(params);
  //   }
  //   let headers = new Headers({
  //     'Content-Type': contentType,
  //     'X-Requested-With': 'XMLHttpRequest',
  //     'clientId': eafAuthenM['clientId'],
  //     'Authorization': eafAuthenM['authorizationId']
  //   });
  //   let options = new RequestOptions({ headers: headers });
  //   let observable = this.http.post(url, body, options)
  //     .map(res => <T>res.json())
  //     .catch(this.handleError);

  //   return RxJSUtil.makeHot(observable);
  // }

  /**
   * Make a JSONP request (rarely use)
   * 
   * @param url URL
   * @param params (Optional) Search parameters
   * @param contentType Content type @see RequestContentType
   */
  public httpJSONP<T>(url: string, params?: { [key: string]: any }, contentType?: RequestContentType): Observable<T> {
    var search = new URLSearchParams()
    if (params != null) {
      for (let key in params) {
        if (params.hasOwnProperty(key)) {
          let value = params[key];
          search.set(key, value);
        }
      }
    }
    return this.jsonp.get(url + '?cbMethod=JSONP_CALLBACK', { search }).map((request) => request.json());
  }

  /**
   * Get an ArrayBuffer (super rarely use)
   * 
   * @param url URL
   * @param search (Optional) Search parameters
   */
  public httpGetArrayBuffer(url: string, search?: { [key: string]: any }): Observable<ArrayBuffer> {

    let options: RequestOptionsArgs = {
      search,
      responseType: ResponseContentType.ArrayBuffer,
    }

    return this.http.get(url, options).map((response) => response.arrayBuffer());
  }

  /**
  * Get an Blob (super ultra rarely use)
  * 
  * @param url URL
  * @param search (Optional) Search parameters
  */
  public httpGetBlob(url: string, search?: { [key: string]: any }): Observable<Blob> {

    let options: RequestOptionsArgs = {
      search,
      responseType: ResponseContentType.Blob,
    }

    return this.http.get(url, options).map((response) => response.blob());
  }

}
