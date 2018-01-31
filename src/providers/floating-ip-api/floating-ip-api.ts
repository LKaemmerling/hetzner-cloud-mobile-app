import {HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {HetznerApiProvider} from "../hetzner-api/hetzner-api";

/*
  Generated class for the FloatingIpApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FloatingIpApiProvider extends HetznerApiProvider{

  /**
   *
   * FloatingIPs
   */

  getFloatingIps() {
    return new Promise(resolve => {
      this.http.get(this.apiUrl + '/floating_ips', {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.projectService.actual_project.api_key).set('Accept', 'application/json'),
      }).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  createFloatingIp(type, description, server) {
    return new Promise(resolve => {
      this.http.post(this.apiUrl + '/floating_ips', {type: type, server: server, description: description}, {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.projectService.actual_project.api_key).set('Accept', 'application/json'),
      }).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  deleteFloatingIp(floatingIp) {
    return new Promise(resolve => {
      this.http.delete(this.apiUrl + '/floating_ips/' + floatingIp, {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.projectService.actual_project.api_key).set('Accept', 'application/json'),
      }).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

}
