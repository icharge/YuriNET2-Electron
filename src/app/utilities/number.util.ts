import { StringUtil } from './string.util';
/**
 * Number Utility
 * @author NorrapatN
 * @since Thu May 18 2017
 */
export class NumberUtil {

  private constructor() { }

  /**
   * Check is that value of number is Valid.
   * @param value Value of number
   */
  public static isValid(value: number): boolean {
    return !isNaN(Number(value));
  }

  /**
   * Generate random number that
   * 
   * @param min Minimum of value to generate
   * @param max Maximum of value to generate
   */
  public static randomRange(min: number, max: number): number {
    return Math.floor(Math.random() * max) + min;
  }

  /**
   * Convert String number to Primitive number
   * 
   * @param stringNumber Number in String value
   * @param defaultValue (Optional) Default value to return if number is invalid. Def. is NaN.
   */
  public static convertToNumber(stringNumber: string, defaultValue?: number): number {
    let ret = Number(stringNumber);
    if (defaultValue != null) {
      return !isNaN(ret) ? ret : defaultValue;
    } else {
      return ret;
    }
  }

  /**
   * Strip any character on string and convert into Number.
   * 
   * @param text A string
   */
  public static catchNumber(text: string): number {
    if (typeof text === 'number') {
      return text;
    }
    return text && Number(text.replace(/[^0-9.]+/g, ''));
  }


  /**
  * number to string format. "34782348" diplay to "34,782,348"
  * @author Bundit.Ng
  * @since  Thu Jul 06 2017
  * @param text A string
  */
  public static displayNumberFormatNoDigit(text: string | number): string {
    return ((text || '') + '').replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }

  /**
  * number to string format. "34782348.1" diplay to "34,782,348.10"
  * @author Bundit.Ng
  * @since  Thu Jul 06 2017
  * @param text A string
  */
  public static displayNumberFormat2Digit(text: string | number): string {
    let textList = ((text || '0') + '').split('.');
    let result = ((textList[0] || '0') + '').replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    let digitStr = textList[1];
    result = result + '.' + this.append(digitStr, '0', 2);
    return result;
  }
  private static append(inStr: string, appendChar: string, count: number): string {
    let result = (inStr || '');
    if (StringUtil.isEmptyString(appendChar)) return inStr;
    while (result.length < count) {
      result = result + appendChar;
    }
    return result;
  }

}

