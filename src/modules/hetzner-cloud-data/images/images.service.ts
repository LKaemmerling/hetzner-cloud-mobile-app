import {Storage} from "@ionic/storage";
import {Injectable} from '@angular/core';
import {ImageApiProvider} from "../../../providers/image-api/image-api";
import {Image} from "../servers/server";

@Injectable()
export class ImagesService {
  /**
   *
   * @type {any[]}
   */
  public images: Array<any> = [];

  /**
   *
   * @param {Storage} storage
   * @param {ImageApiProvider} imageApiProvider
   */
  constructor(private storage: Storage, private imageApiProvider: ImageApiProvider) {
    this.images = [];
  }

  /**
   *
   */
  public loadImages() {
    return this.storage.get('images').then((val) => {
      if (val !== undefined) {
        this.images = val;
      }
    });
  }

  /**
   *
   */
  public saveImages() {
    return this.storage.set('images', this.images);
  }

  /**
   *
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
