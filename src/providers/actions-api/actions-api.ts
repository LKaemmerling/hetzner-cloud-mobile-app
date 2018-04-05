import {Injectable} from '@angular/core';
import {HetznerApiProvider} from "../hetzner-api/hetzner-api";

/**
 * This is the provider that performs the api calls to the action api.
 */
@Injectable()
export class ActionsApiProvider extends HetznerApiProvider {


  /**
   * Returns all actions objects
   * @see https://docs.hetzner.cloud/#resources-actions-get
   * @returns {Promise<any>}
   */
  getActions() {
    return this._get('actions?sort=id:desc')

  }

}
