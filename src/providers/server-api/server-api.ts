import {HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {HetznerApiProvider} from "../hetzner-api/hetzner-api";

/*
  Generated class for the ServerApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServerApiProvider extends HetznerApiProvider{


  getServers(searchTerm = null) {
    return new Promise(resolve => {
      this.http.get(this.apiUrl + '/servers' + (searchTerm == null ? '' : '?name=' + searchTerm), {
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

  createServer(name, server_type, location, start_after_create, image, ssh_keys) {
    return new Promise(resolve => {
      this.http.post(this.apiUrl + '/servers', {
        name: name,
        server_type: server_type,
        location: location,
        start_after_create: start_after_create,
        image: image,
        ssh_keys: ssh_keys
      }, {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.projectService.actual_project.api_key).set('Accept', 'application/json'),
      }).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  changeServerName(serverId, newName) {

    return new Promise(resolve => {
      this.http.put(this.apiUrl + '/servers/' + serverId, {
        name: newName
      }, {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.projectService.actual_project.api_key).set('Accept', 'application/json'),
      }).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  changeServerType(serverId, server_type, upgrade_disk) {
    return new Promise(resolve => {
      this.http.post(this.apiUrl + '/servers/' + serverId + '/actions/change_type', {
        upgrade_disk: upgrade_disk,
        server_type: server_type,
      }, {
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
      this.http.post(this.apiUrl + '/servers/' + serverId + '/actions/poweron', {}, {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.projectService.actual_project.api_key).set('Accept', 'application/json'),
      }).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  shutdown(serverId) {
    return new Promise(resolve => {
      this.http.post(this.apiUrl + '/servers/' + serverId + '/actions/shutdown', {}, {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.projectService.actual_project.api_key).set('Accept', 'application/json'),
      }).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  reset(serverId) {
    return new Promise(resolve => {
      this.http.post(this.apiUrl + '/servers/' + serverId + '/actions/reset', {}, {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.projectService.actual_project.api_key).set('Accept', 'application/json'),
      }).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  resetPassword(serverId) {
    return new Promise(resolve => {
      this.http.post(this.apiUrl + '/servers/' + serverId + '/actions/reset_password', {}, {
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
      this.http.post(this.apiUrl + '/servers/' + serverId + '/actions/poweroff', {}, {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.projectService.actual_project.api_key).set('Accept', 'application/json'),
      }).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  enable_rescue(serverId) {
    return new Promise(resolve => {
      this.http.post(this.apiUrl + '/servers/' + serverId + '/actions/enable_rescue', {}, {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.projectService.actual_project.api_key).set('Accept', 'application/json'),
      }).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  disable_rescue(serverId) {
    return new Promise(resolve => {
      this.http.post(this.apiUrl + '/servers/' + serverId + '/actions/disable_rescue', {}, {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.projectService.actual_project.api_key).set('Accept', 'application/json'),
      }).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  disable_backups(serverId) {
    return new Promise(resolve => {
      this.http.post(this.apiUrl + '/servers/' + serverId + '/actions/disable_backups', {}, {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.projectService.actual_project.api_key).set('Accept', 'application/json'),
      }).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  enable_backups(serverId, backup_window) {
    return new Promise(resolve => {
      this.http.post(this.apiUrl + '/servers/' + serverId + '/actions/enable_backups', {
        backup_window: backup_window
      }, {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.projectService.actual_project.api_key).set('Accept', 'application/json'),
      }).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  create_snapshot(serverId) {
    return new Promise(resolve => {
      this.http.post(this.apiUrl + '/servers/' + serverId + '/actions/create_image', {}, {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.projectService.actual_project.api_key).set('Accept', 'application/json'),
      }).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  create_backup(serverId) {
    return new Promise(resolve => {
      this.http.post(this.apiUrl + '/servers/' + serverId + '/actions/create_image', {type: 'backup'}, {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.projectService.actual_project.api_key).set('Accept', 'application/json'),
      }).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  rebuild(serverId, imageId) {
    return new Promise(resolve => {
      this.http.post(this.apiUrl + '/servers/' + serverId + '/actions/rebuild', {
        image: imageId
      }, {
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
      this.http.post(this.apiUrl + '/servers/' + serverId + '/actions/reboot', {}, {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.projectService.actual_project.api_key).set('Accept', 'application/json'),
      }).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  delete(serverId) {
    return new Promise(resolve => {
      this.http.delete(this.apiUrl + '/servers/' + serverId, {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.projectService.actual_project.api_key).set('Accept', 'application/json'),
      }).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
}
