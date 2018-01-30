import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {ProjectsService} from "../../models/project/ProjectsService";

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {
  public apiUrl = 'https://api.hetzner.cloud/v1';

  constructor(public http: HttpClient, public projectService: ProjectsService) {
    console.log('Hello RestProvider Provider');
  }

  getServers() {
    return new Promise(resolve => {
      this.http.get(this.apiUrl + '/servers', {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.projectService.actual_project.api_key).set('Accept', 'application/json'),
      }).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  getServer(serverId) {
    return new Promise(resolve => {
      this.http.get(this.apiUrl + '/servers/' + serverId, {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.projectService.actual_project.api_key).set('Accept', 'application/json'),
      }).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  powerOn(serverId) {
    return new Promise(resolve => {
      this.http.post(this.apiUrl + '/servers/' + serverId + '/poweron', {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.projectService.actual_project.api_key).set('Accept', 'application/json'),
      }).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  powerOff(serverId) {
    return new Promise(resolve => {
      this.http.post(this.apiUrl + '/servers/' + serverId + '/poweroff', {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.projectService.actual_project.api_key).set('Accept', 'application/json'),
      }).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  reboot(serverId) {
    return new Promise(resolve => {
      this.http.post(this.apiUrl + '/servers/' + serverId + '/reboot', {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.projectService.actual_project.api_key).set('Accept', 'application/json'),
      }).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
}
