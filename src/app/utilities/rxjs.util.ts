import { Observable, Subject } from 'rxjs';
/**
 * RxJS Utilities
 * 
 * @author NorrapatN
 * @since Wed May 24 2017
 */
export class RxJSUtil {

  private constructor() { }

  /**
   * Make Cold observable to Hot observable
   * 
   * On caller function will not need to make ".subscribe(...)" to execute procedure
   * 
   * @param cold Observable
   */
  public static makeHot<T>(cold: Observable<T>) {
    const subject = new Subject<T>();
    cold.subscribe(subject);
    return new Observable<T>((observer) => subject.subscribe(observer));
  }

  /**
   * Make Async to Sync (like a waterfall)
   * 
   * !!! NOT RECOMMENDED !!!. Do if necessary.
   * 
   * @author mattpodwysocki
   * @see https://github.com/Reactive-Extensions/RxJS/issues/73#issuecomment-30093431
   */
  public static waterfall(series: ((fn?: Function) => Observable<any>)[]): Observable<any> {
    return Observable.defer(function () {
      let acc = series[0]();
      for (let i = 1, len = series.length; i < len; i++) {
        (function (func) {
          acc = acc.flatMap(function (x) {
            return func(x);
          });
        }(series[i]));
      }

      return acc;
    });
  }

}
