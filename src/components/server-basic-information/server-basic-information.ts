import {Component, Input} from '@angular/core';
import {Server} from '../../modules/hetzner-cloud-data/servers/server';

/**
 * The component shows all basic information about a server into two lines.
 */
@Component({
  selector: 'server-basic-information',
  templateUrl: 'server-basic-information.html',
})
export class ServerBasicInformationComponent {
  /**
   * The specific server
   * @type {Server}
   */
  @Input() server: Server;
}
