import {Component, Input} from '@angular/core';

/**
 * Generated class for the ServerStatusIndicatorComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'server-status-indicator',
  templateUrl: 'server-status-indicator.html'
})
export class ServerStatusIndicatorComponent {

  @Input() status: string;

  constructor() {
  }

}
