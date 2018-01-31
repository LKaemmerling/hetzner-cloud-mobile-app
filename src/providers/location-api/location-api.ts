import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {HetznerApiProvider} from "../hetzner-api/hetzner-api";

/*
  Generated class for the LocationApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LocationApiProvider extends HetznerApiProvider {
  /**
   *
   * Locations
   */

  getLocations(searchTerm = null) {
    return new Promise(resolve => {
      this.http.get(this.apiUrl + '/locations' + (searchTerm == null ? '' : '?name=' + searchTerm), {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.projectService.actual_project.api_key).set('Accept', 'application/json'),
      }).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
}
