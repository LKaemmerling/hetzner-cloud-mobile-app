import {Storage} from "@ionic/storage";
import {Injectable} from '@angular/core';

import {ServerApiProvider} from "../../hetzner-robot-api/server-api/server-api";
import {StorageBoxApiProvider} from "../../hetzner-robot-api/storage-box-api/storage-box-api";

/**
 * Service that contains all storage methods for the servers.
 */
@Injectable()
export class StorageBoxService {
  /**
   * All servers
   * @type {any[]}
   */
  public storage_boxes: any;

  /**
   * Constructor
   * @param {Storage} storage
   * @param {ServerApiProvider} serverApiProvider
   */
  constructor(private storage: Storage, private storageBoxApi: StorageBoxApiProvider) {
    this.storage_boxes = [];
  }

  /**
   * Load all servers from the local storage
   */
  public loadStorageBoxes() {
    return this.storage.get('robot_storage_boxes').then((val) => {
      if (val !== undefined) {
        this.storage_boxes = val;
      }
    });
  }

  /**
   * Save all servers to the local storage
   */
  public saveStorageBoxes() {
    return this.storage.set('robot_storage_boxes', this.storage_boxes);
  }

  /**
   * Load all servers from the api and save it
   * @returns {Promise<void>}
   */
  public reloadStorageBoxes() {
    return this.storageBoxApi.getStorageBoxes().then((data) => {
      this.storage_boxes = data;
      this.saveStorageBoxes();
    });
  }

}
