/**
 * Arrays Utility for everyone
 * 
 * @author NorrapatN
 * @since Thu May 18 2017
 */

export class ArraysUtil {

  private constructor() { }

  /**
   * Split array per page
   * 
   * this will splice array into page
   */
  public static splitArrayPerPage<T>(inputArray: T[], itemPerPage: number): Array<T[]>;

  /**
   * Split array per page
   * 
   * With options
   */
  public static splitArrayPerPage<T>(inputArray: T[], itemPerPage: number, options?: {
    defaultValue?: any[],
    useCloneArray?: boolean
  }): Array<T[]>;

  public static splitArrayPerPage<T>(inputArray: T[], itemPerPage: number, options?: {
    defaultValue?: any[],
    useCloneArray?: boolean
  }): Array<T[]> {

    if (!inputArray || !Array.isArray(inputArray)) {
      return options && options.defaultValue;
    }

    if (options && options.useCloneArray === true) {
      inputArray = this.clone(inputArray);
    }

    let result: Array<T[]> = [];


    // for (; inputArray.length > 0;) {
    while (inputArray.length) {
      let stack = inputArray.splice(0, itemPerPage);

      result.push(stack);
    }

    return result;
  }

  /**
   * Clone data from array to another one
   * 
   * By using "while loop" Fastest algorithm.
   * @see https://jsperf.com/new-array-vs-splice-vs-slice/31
   * 
   * @param array Input array
   * @return Cloned array
   */
  public static clone<T>(arrayToClone: T[]): T[] {
    if (arrayToClone && Array.isArray(arrayToClone)) {
      let i: number = arrayToClone.length;
      let resultArray: T[] = [];

      while (i--) {
        resultArray[i] = arrayToClone[i];
      }

      return resultArray;
    } else {
      console.warn('Clone : input is not an array !');
      return arrayToClone;
    }
  }

  /**
   * Search class from Array
   * 
   * @deprecated Not worked on production build
   * 
   * @param needle The Class name or Class to find
   * @param hayStack The Array to find
   * @return The Class that found in array. Null if found nothing.
   */
  public static searchClass(needle: string | Function, hayStack: Function[]): Function {

    if (!hayStack || !hayStack.length || !needle) {
      return null;
    }

    let className;
    if (typeof needle === 'string') {
      className = needle;
    } else {
      className = needle.name;
    }

    let clazz: Function = hayStack.find(c => c.name === className);

    return clazz;
  }

}
