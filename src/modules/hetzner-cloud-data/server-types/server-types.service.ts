import {Storage} from "@ionic/storage";
import {Injectable} from '@angular/core';
import {ImageApiProvider} from "../../../providers/image-api/image-api";
import {LocationApiProvider} from "../../../providers/location-api/location-api";
import {ServerTypeApiProvider} from "../../../providers/server-type-api/server-type-api";

@Injectable()
export class ServerTypesService {
  /**
   *
   * @type {any[]}
   */
  public server_types: Array<any> = [];

  /**
   *
   * @param {Storage} storage
   * @param {LocationApiProvider} locationApiProvider
   */
  constructor(private storage: Storage, private serverTypeApiProvider: ServerTypeApiProvider) {
    this.server_types = [];
  }

  /**
   *
   */
  public loadServerTypes() {
    return this.storage.get('server_types').then((val) => {
      if (val !== undefined) {
        this.server_types = val;
      }
    });
  }

  /**
   *
   */
  public saveServerTypes() {
    return this.storage.set('server_types', this.server_types);
  }

  /**
   *
   * @returns {Promise<void>}
   */
  public reloadServerTypes() {
    return this.serverTypeApiProvider.getServerTypes().then((data) => {
      this.server_types = data['server_types'];
      this.saveServerTypes();
    });
  }
}
