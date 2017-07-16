import { Component, HostBinding } from '@angular/core';
/**
 * Window component
 */
@Component({
  selector: 'window-frame',
  templateUrl: './window.component.html',
  moduleId: module.id,
})
export class WindowComponent {

  @HostBinding('class.frame')
  classFrame = true;

  @HostBinding('class.no-selection')
  classNoSelection = true;

}
