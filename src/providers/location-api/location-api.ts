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
   *
   * Locations
   */

  getLocations(searchTerm: string = null) {
    return this._get('locations' + (searchTerm == null ? '' : '?name=' + searchTerm))
  }
}
