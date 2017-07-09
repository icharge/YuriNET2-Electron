/**
 * Validation Utility functions
 * 
 * Every validation functions can be using from here
 * 
 * @author NorrapatN
 * @since Tue Jul 04 2017
 */
export class ValidationUtil {

  public static readonly EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  private constructor() { }

  public static emailValidate(email: string): boolean {
    return this.EMAIL_REGEXP.test(email);
  }

}
