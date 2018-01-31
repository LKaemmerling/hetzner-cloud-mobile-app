import {Injectable} from '@angular/core';
import {HetznerApiProvider} from "../hetzner-api/hetzner-api";

/*
  Generated class for the FloatingIpApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FloatingIpApiProvider extends HetznerApiProvider {

  /**
   *
   * FloatingIPs
   */

  getFloatingIps() {
    return this._get('floating_ips')
  }

  createFloatingIp(type: string, description: string, serverId: number) {
    return this._post('floating_ips', {type: type, server: serverId, description: description})
  }

  deleteFloatingIp(floatingIpId: number) {
    return this._delete('floating_ips/' + floatingIpId)
  }

}
