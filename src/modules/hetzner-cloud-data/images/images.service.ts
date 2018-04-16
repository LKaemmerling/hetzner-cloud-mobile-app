import {Storage} from "@ionic/storage";
import {Injectable} from '@angular/core';
import {ImageApiProvider} from "../../hetzner-cloud-api/image-api/image-api";
import {Image} from "../servers/server";


/**
 * Service that contains all storage methods for the images.
 */
@Injectable()
export class ImagesService {
  /**
   * All images
   * @type {any[]}
   */
  public images: Array<any> = [];

  /**
   * Constructor
   * @param {Storage} storage
   * @param {ImageApiProvider} imageApiProvider
   */
  constructor(private storage: Storage, private imageApiProvider: ImageApiProvider) {
    this.images = [];
  }

  /**
   * Load all images from the storage
   */
  public loadImages() {
    return this.storage.get('images').then((val) => {
      if (val !== undefined) {
        this.images = val;
      }
    });
  }

  /**
   * Save all images to the storage.
   */
  public saveImages() {
    return this.storage.set('images', this.images);
  }

  /**
   * Load all images from the api and store it locally.
   * @returns {Promise<void>}
   */
  public reloadImages() {
    return this.imageApiProvider.getImages().then((data) => {
      this.images = data['images'];
      this.saveImages();
    });
  }

  /**
   * Return all images from a specific type.
   * @see https://docs.hetzner.cloud/#resources-images-get for all available types.
   * @param {string} type
   * @returns {Array<Image>}
   */
  public getImagesByType(type: string): Array<Image> {
    let tmp: Array<Image> = [];

    this.images.forEach((image) => {
      if (image.type == type) {
        tmp.push(image);
      }
    });
    return tmp;
  }

  /**
   * Return all backups created from a specific server.
   * @param {number} server_id
   * @returns {Array<Image>}
   */
  public getBackupsByServer(server_id: number): Array<Image> {
    let tmp: Array<Image> = [];

    this.getImagesByType('backup').forEach((image) => {
      if (image.created_from.id == server_id) {
        tmp.push(image);
      }
    });
    return tmp;
  }
}
