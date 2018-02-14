import {Injectable} from '@angular/core';
import {HetznerApiProvider} from "../hetzner-api/hetzner-api";

/*
  Generated class for the ActionsApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
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
