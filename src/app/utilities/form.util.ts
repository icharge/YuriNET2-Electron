/**
 * Form Utility
 * 
 * @author NorrapatN
 * @since Thu Jun 29 2017
 */
export class FormUtil {
  constructor() { }

  public static setSelectionEnd(inputElement: HTMLInputElement | EventTarget): void {
    if (inputElement) {
      let input = <HTMLInputElement>inputElement;
      let value = input.value;

      // !! This setSelectionRange is not worked !!
      // input.setSelectionRange(value.length, value.length);

      if ((<any>input).createTextRange) {
        let range = (<any>input).createTextRange();
        range.move('character', value.length);
        range.select();
      } else {
        input.focus();
      }
    }
  }
}
