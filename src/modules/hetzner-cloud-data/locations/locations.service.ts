import {Storage} from "@ionic/storage";
import {Injectable} from '@angular/core';
import {ImageApiProvider} from "../../../providers/image-api/image-api";
import {LocationApiProvider} from "../../../providers/location-api/location-api";

@Injectable()
export class LocationsService {
  /**
   *
   * @type {any[]}
   */
  public locations: Array<any> = [];

  /**
   *
   * @param {Storage} storage
   * @param {LocationApiProvider} locationApiProvider
   */
  constructor(private storage: Storage, private locationApiProvider: LocationApiProvider) {
    this.locations = [];
  }

  /**
   *
   */
  public loadLocations() {
    return this.storage.get('locations').then((val) => {
      if (val !== undefined) {
        this.locations = val;
      }
    });
  }

  /**
   *
   */
  public saveLocations() {
    return this.storage.set('locations', this.locations);
  }

  /**
   *
   * @returns {Promise<void>}
   */
  public reloadLocations() {
    return this.locationApiProvider.getLocations().then((data) => {
      this.locations = data['locations'];
      this.saveLocations();
    });
  }
}
