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

}
