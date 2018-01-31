import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {ProjectsService} from "../../models/project/ProjectsService";

/*
  Generated class for the HetznerApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export abstract class HetznerApiProvider {
  public apiUrl = 'https://api.hetzner.cloud/v1';

  constructor(public http: HttpClient, public projectService: ProjectsService) {
  }

  _get(method) {
    return new Promise(resolve => {
      this.http.get(this.apiUrl + '/' + method, {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.projectService.actual_project.api_key).set('Accept', 'application/json'),
      }).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  _post(method, body = {}) {
    return new Promise(resolve => {
      this.http.post(this.apiUrl + '/' + method, body, {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.projectService.actual_project.api_key).set('Accept', 'application/json'),
      }).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  _put(method, body) {
    return new Promise(resolve => {
      this.http.put(this.apiUrl + '/' + method, body, {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.projectService.actual_project.api_key).set('Accept', 'application/json'),
      }).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  _delete(method, body = {}) {
    return new Promise(resolve => {
      this.http.delete(this.apiUrl + '/' + method, {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.projectService.actual_project.api_key).set('Accept', 'application/json'),
      }).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
}
