import {Component, Input} from '@angular/core';

/**
 * Generated class for the ServerBasicInformationComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'server-basic-information',
  templateUrl: 'server-basic-information.html'
})
export class ServerBasicInformationComponent {

  @Input() server: string;

}
