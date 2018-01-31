import {HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {HetznerApiProvider} from "../hetzner-api/hetzner-api";

/*
  Generated class for the ServerTypeApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServerTypeApiProvider extends HetznerApiProvider{

  getServerTypes(searchTerm = null) {
    return new Promise(resolve => {
      this.http.get(this.apiUrl + '/server_types' + (searchTerm == null ? '' : '?name=' + searchTerm), {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.projectService.actual_project.api_key).set('Accept', 'application/json'),
      }).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

}
