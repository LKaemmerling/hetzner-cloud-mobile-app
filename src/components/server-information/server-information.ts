import {Component, Input} from '@angular/core';
import {Server} from "../../modules/hetzner-cloud-data/servers/server";

/**
 * Generated class for the ServerInformationComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'server-information',
  templateUrl: 'server-information.html'
})
export class ServerInformationComponent {

  @Input() server: Server;

}
