import {Injectable} from '@angular/core';
import {BaseApiProvider} from "../base-api/base-api";

/**
 * This is the provider that performs the api calls to the server api.
 */
@Injectable()
export class StorageBoxApiProvider extends BaseApiProvider {

  /**
   * Returns all existing Server objects
   * @see https://robot.your-server.de/doc/webservice/en.html#get-server
   * @param {string} searchTerm
   * @returns {Promise<any>}
   */
  getStorageBoxes() {
    return this._get('storagebox')
  }

  /**
   * Returns a specific Server object. The Server must exist inside the account
   * @see https://robot.your-server.de/doc/webservice/en.html#get-server-server-ip
   * @param {string} serverIp
   * @returns {Promise<any>}
   */
  getStorageBox(boxId: number) {
    return this._get('storagebox/' + boxId)
  }

}
