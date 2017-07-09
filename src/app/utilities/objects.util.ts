import { ultraDeepClone } from './ultra-deep-clone';

/**
 * Objects Utilities
 * 
 * @author NorrapatN
 * @since Thu May 25 2017
 */
export class ObjectsUtil {

  /**
   * Easy way to compare between 2 object
   * @param  {Object}  obj1
   * @param  {Object}  obj2
   * @return {boolean}      All thing same will return true
   */
  public static isEqualObject(obj1: Object, obj2: Object): boolean {
    if (obj1 === 'undefined' || obj2 === 'undefined') {
      console.warn(`Can't compare undefined object.`);
      // console.warn('obj1', obj1);
      // console.warn('obj2', obj2);
      return false;
    }
    let serializedObj1 = JSON.stringify(obj1);
    let serializedObj2 = JSON.stringify(obj2);
    let result = serializedObj1 === serializedObj2;
    if (!result) {
      // console.debug("serializedObj 1 : ", serializedObj1);
      // console.debug("serializedObj 2 : ", serializedObj2);
    }
    return result;
  }

  /**
   * Clone object. Result will be object only.
   * @param obj Object to clone
   */
  // public static clone<T>(obj: T): T {
  //   if ('undefined' == typeof (obj)) {
  //     console.warn(`Can't clone undefined object`);
  //     return obj;
  //   }
  //   return JSON.parse(JSON.stringify(obj));
  // }
  public static clone<T>(original: T): T {
        let cloneObject = null;
        if (original instanceof Array) {
            cloneObject = [];
            for (let member in original) {
                cloneObject.push(this.clone(original[member]));
            }
        } else if (original instanceof Object) {
            cloneObject = this.cloneObject(original);
        } else {
            cloneObject = original;
        }
        return cloneObject;
    }

    private static cloneObject<T>(original: T): T {

        let clone = Object.create(Object.getPrototypeOf(original));
        for (let member in original) {

            if (original[member] instanceof Function) {

            } else {
                clone[member] = this.clone(original[member]);
            }

        }
        return clone;
    }
  public static deepClone<T>(obj: T): T {
    return ultraDeepClone(obj);
  }

  public static dateToJsonFormat(dateObj: Date): string {
    // return JSON.parse(JSON.stringify({date: dateObj})).date;
    if (dateObj == null)
      return null;

    return dateObj.toJSON(); // Better Solution
  }

  /**
   * Clone and remove specified properties from object
   */
  public static omit<T>(obj: T, ...omitKey: string[]): T {
    ;
    return Object.keys(obj).reduce((result, key) => {
      if (omitKey.indexOf(key) < 0) {
        result[key] = obj[key];
      }

      return result;
    }, <T>{});
  }

  /**
   * Clone and keep only specified properties
   */
  public static pick<T>(obj: T, ...pickKey: string[]): T {
    return Object.keys(obj).reduce((result, key) => {
      if (pickKey.indexOf(key) > -1) {
        result[key] = obj[key];
      }

      return result;
    }, <T>{});
  }

  /**
   * Instantiate specified class
   * 
   * @param type Class
   */
  public static activator<T>(type: { new (): T }): T {
    return new type();
  }

  /**
   * Instantiate specified class
   * 
   * @param type Class
   * @param value Object of value to assign.
   */
  public static instantiate<T>(type: { new (): T }, value?: Object): T {
    let instantiatedObject: T = this.activator(type);
    if (value) {
      Object.assign(instantiatedObject, value);
    }
    return instantiatedObject;
  }

  /**
   * 
   */
  public static isEmptyObject(object: any): boolean {
    return !object || object === null || object === undefined;
  }

  public static assign<T>(original: T, clazz): T {
        let assignObject = null;

        if (original instanceof Array) {
            assignObject = [];
            for (let member in original) {
                let obj = Object.create(clazz.prototype);
                obj = Object.assign(obj, original[member])
                assignObject.push(obj);
            }
        } else if (original instanceof Object) {
            let obj = Object.create(clazz.prototype);
            assignObject = Object.assign(obj, original);
        } else {
            assignObject = original;
        }

        return assignObject;
    }


}
