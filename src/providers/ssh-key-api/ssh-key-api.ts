import {Injectable} from '@angular/core';
import {HetznerApiProvider} from "../hetzner-api/hetzner-api";

/*
  Generated class for the SshKeyApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SshKeyApiProvider extends HetznerApiProvider {


  /**
   *
   * SSHKeys
   */

  getSSHKeys(searchTerm: string = null) {
    return this._get('ssh_keys' + (searchTerm == null ? '' : '?name=' + searchTerm))
  }

}
