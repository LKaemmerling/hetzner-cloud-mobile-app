import {Injectable} from '@angular/core';
import {HetznerApiProvider} from "../hetzner-api/hetzner-api";

/*
  Generated class for the ImageApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ImageApiProvider extends HetznerApiProvider {


  /**
   * Returns all image objects
   * @see https://docs.hetzner.cloud/#resources-images-get
   * @param {string} searchTerm
   * @returns {Promise<any>}
   */
  getImages(searchTerm: string = null) {
    return this._get('images' + (searchTerm == null ? '' : '?name=' + searchTerm))
  }

  /**
   * Deletes an Image. Only images of type snapshot and backup can be deleted
   * @see https://docs.hetzner.cloud/#resources-images-delete
   * @param {number} imageId
   * @returns {Promise<any>}
   */
  delete(imageId: number) {
    return this._delete('images/' + imageId)
  }

  /**
   * Updates the Image. You may change the description or convert a Backup image to a Snapshot Image. Only images of type snapshot and backup can be updated
   * @see https://docs.hetzner.cloud/#resources-images-put
   * @param {number} imageId
   * @param {string} description
   * @returns {Promise<any>}
   */
  public update(imageId: number, description: string) {
    return this._put('images/' + imageId, {description: description});
  }

}
