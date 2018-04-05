import {Storage} from "@ionic/storage";
import {Injectable} from '@angular/core';
import {LocationApiProvider} from "../../../providers/location-api/location-api";


/**
 * Service that contains all storage methods for the locations.
 */
@Injectable()
export class LocationsService {
  /**
   * All locations
   * @type {any[]}
   */
  public locations: Array<any> = [];

  /**
   * Constructor
   * @param {Storage} storage
   * @param {LocationApiProvider} locationApiProvider
   */
  constructor(private storage: Storage, private locationApiProvider: LocationApiProvider) {
    this.locations = [];
  }

  /**
   *  Load all locations from the local storage.
   */
  public loadLocations() {
    return this.storage.get('locations').then((val) => {
      if (val !== undefined) {
        this.locations = val;
      }
    });
  }

  /**
   * Save all locations to the local storage.
   */
  public saveLocations() {
    return this.storage.set('locations', this.locations);
  }

  /**
   * Reload all locations from the api and save it into the local storage.
   * @returns {Promise<void>}
   */
  public reloadLocations() {
    return this.locationApiProvider.getLocations().then((data) => {
      this.locations = data['locations'];
      this.saveLocations();
    });
  }
}
