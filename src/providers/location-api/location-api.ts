import {Injectable} from '@angular/core';
import {HetznerApiProvider} from "../hetzner-api/hetzner-api";

/**
 * This is the provider that performs the api calls to the location api.
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
