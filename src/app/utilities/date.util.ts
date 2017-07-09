import { StringUtil } from './string.util';
/**
 * Date / Time Utilities
 * @author NorrapatN
 * @since Thu May 25 2017
 */
export class DateUtil {

  public static isValidDate(date: Date): boolean {
    return date instanceof Date && !isNaN(date.valueOf());
  }

  /**
   * Create Date string formatted as pattern 'YYYY-MM-DD HH24:mm:ss'
   * @param date Date
   */
  public static formatDate(dateObject: Date): string {
    if (!DateUtil.isValidDate(dateObject)) {
      return null;
    }

    let year = dateObject.getFullYear();
    let month = dateObject.getMonth() + 1;
    let date = dateObject.getDate();

    let hours = dateObject.getHours();
    let minutes = dateObject.getMinutes();
    let seconds = dateObject.getSeconds();
    return [year, month, date].join('-') + ' ' + [hours, minutes, seconds].join(':');
  }


  /**
  * @author Bundit.Ng
  * @since  Tue Jun 13 2017
  * Copyright (c) 2017 Avalant Co.,Ltd.
  *
  * calculateAgeFromBirthDate
  * @return number Age, That's calculate from input date
  * @param birthDate string (yyyy-mm-dd)
  */
  public static calculateAgeFromBirthDate(birthDateInput: string): number {
    if (!StringUtil.isEmptyString(birthDateInput)) {
      let today = new Date();
      let birthDate = new Date(birthDateInput);
      let age = today.getFullYear() - birthDate.getFullYear();
      let m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age;
    }
  }

  /**
   * Convert formatted string date into Date object.
   * 
   * @param strDate Formatted date string
   * @return {Date} A date object or null for invalid date
   */
  public static stringToDate(strDate: string): Date {
    let convertedDate = new Date(strDate);
    return this.isValidDate(convertedDate) ? convertedDate : null;
  }

  /**
   * Convert Date object into Formatted string date 'YYYY-MM-DD HH24:mm:ss'.
   * 
   * @param dateObj A Date object
   * @return {String} Formatted string date 'YYYY-MM-DD HH24:mm:ss' or null for invalid date.
   */
  public static dateToString(dateObj: Date): string {
    return this.formatDate(dateObj);
  }

}