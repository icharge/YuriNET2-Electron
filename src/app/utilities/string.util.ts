import { ObjectsUtil } from './objects.util';
/**
 * @author Bundit.Ng
 * @since  Mon Jun 05 2017
 * Copyright (c) 2017 Avalant Co.,Ltd.
 */

export class StringUtil {

  private constructor() { }

  public static valueToString(body: any): any {
    Object.keys(body).forEach(propKey => {
      let elmVal = body[propKey];
      if (elmVal != null) {//Array
        if (elmVal.constructor == Object || elmVal.constructor == Array) {
          this.valueToString(elmVal);
        } else if (elmVal.constructor == Number) {
          body[propKey] = elmVal + '';
        }
      }
    });
    return body;
  }

  public static isEmptyString(strInput: string): boolean {
    return ObjectsUtil.isEmptyObject(strInput) || strInput.toString().trim() === '' || strInput.toString().trim().length == 0;
  }

  public static trim(text: string): string {
    return text && text.trim() || '';
  }

}
