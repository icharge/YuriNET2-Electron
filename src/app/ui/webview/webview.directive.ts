import { Directive, Input } from "@angular/core";

/**
 * Dummy Web view directive for Electron's <webview />
 */
@Directive({
  selector: 'webview',
})
export class WebviewDirective {

  @Input()
  src: string;

}
