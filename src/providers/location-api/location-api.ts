import {Injectable} from '@angular/core';
import {HetznerApiProvider} from "../hetzner-api/hetzner-api";

/*
  Generated class for the LocationApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LocationApiProvider extends HetznerApiProvider {
  /**
   * Returns all location objects
   * @see https://docs.hetzner.cloud/#resources-locations-get
   * @param {string} searchTerm
   * @returns {Promise<any>}
   */
  getLocations(searchTerm: string = null) {
    return this._get('locations' + (searchTerm == null ? '' : '?name=' + searchTerm))
  }
}
