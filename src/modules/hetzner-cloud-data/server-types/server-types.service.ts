import {Storage} from "@ionic/storage";
import {Injectable} from '@angular/core';
import {ServerTypeApiProvider} from "../../hetzner-cloud-api/server-type-api/server-type-api";
/**
 * Service that contains all storage methods for the server types.
 */
@Injectable()
export class ServerTypesService {
  /**
   * all server types
   * @type {any[]}
   */
  public server_types: Array<any> = [];

  /**
   * Constructor
   * @param {Storage} storage
   * @param {ServerTypeApiProvider} serverTypeApiProvider
   */
  constructor(private storage: Storage, private serverTypeApiProvider: ServerTypeApiProvider) {
    this.server_types = [];
  }

  /**
   * Load all server types from the storage
   */
  public loadServerTypes() {
    return this.storage.get('server_types').then((val) => {
      if (val !== undefined) {
        this.server_types = val;
      }
    });
  }

  /**
   * Save all server types to the storage
   */
  public saveServerTypes() {
    return this.storage.set('server_types', this.server_types);
  }

  /**
   * Load all server types from the api and save it.
   * @returns {Promise<void>}
   */
  public reloadServerTypes() {
    return this.serverTypeApiProvider.getServerTypes().then((data) => {
      this.server_types = data['server_types'];
      this.saveServerTypes();
    });
  }
}
