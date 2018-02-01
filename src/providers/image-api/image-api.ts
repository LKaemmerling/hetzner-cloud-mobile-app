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
   *
   * Images
   */

  getImages(searchTerm: string = null) {
    return this._get('images' + (searchTerm == null ? '' : '?name=' + searchTerm))
  }

  public delete(imageId: number) {
    return this._delete('images/' + imageId)
  }

  public update(imageId: number, description: string) {
    return this._put('images/' + imageId, {description: description});
  }

}
