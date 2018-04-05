import {Injectable} from '@angular/core';
import {HetznerApiProvider} from "../hetzner-api/hetzner-api";

/**
 * This is the provider that performs the api calls to the server type api.
 */
@Injectable()
export class ServerTypeApiProvider extends HetznerApiProvider {
  /**
   * Gets all Server type objects
   * @see https://docs.hetzner.cloud/#resources-server-types-get
   * @param {string} searchTerm
   * @returns {Promise<any>}
   */
  getServerTypes(searchTerm: string = null) {
    return this._get('server_types' + (searchTerm == null ? '' : '?name=' + searchTerm))
  }

}
