import {Storage} from "@ionic/storage";
import {Injectable} from '@angular/core';
import {ImageApiProvider} from "../../../providers/image-api/image-api";

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
}
