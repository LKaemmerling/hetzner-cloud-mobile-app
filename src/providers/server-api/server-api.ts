import {Injectable} from '@angular/core';
import {HetznerApiProvider} from "../hetzner-api/hetzner-api";

/*
  Generated class for the ServerApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServerApiProvider extends HetznerApiProvider {


  getServers(searchTerm: string = null) {
    return this._get('servers' + (searchTerm == null ? '' : '?name=' + searchTerm))
  }

  getServer(serverId: number) {
    return this._get('servers/' + serverId)
  }

  createServer(name: string, server_type_id: number, location_id: number, start_after_create: boolean, image_id: number, ssh_keys: Array<number>) {
    return this._post('servers', {
      name: name,
      server_type: server_type_id,
      location: location_id,
      start_after_create: start_after_create,
      image: image_id,
      ssh_keys: ssh_keys
    })
  }

  changeServerName(serverId: number, newName: string) {

    return this._put('servers/' + serverId, {
      name: newName
    })
  }

  changeServerType(serverId: number, server_type_id: number, upgrade_disk: boolean) {
    return this._post('servers/' + serverId + '/actions/change_type', {
      upgrade_disk: upgrade_disk,
      server_type: server_type_id,
    })
  }

  powerOn(serverId: number) {
    return this._post('servers/' + serverId + '/actions/poweron');
  }

  powerOff(serverId: number) {
    return this._post('servers/' + serverId + '/actions/poweroff');
  }

  shutdown(serverId: number) {
    return this._post('servers/' + serverId + '/actions/shutdown');
  }

  reset(serverId: number) {
    return this._post('servers/' + serverId + '/actions/reset');
  }

  reboot(serverId) {
    return this._post('servers/' + serverId + '/actions/reboot');
  }

  resetPassword(serverId: number) {
    return this._post('servers/' + serverId + '/actions/reset_password');
  }

  enable_rescue(serverId: number) {
    return this._post('servers/' + serverId + '/actions/enable_rescue');
  }

  disable_rescue(serverId: number) {
    return this._post('servers/' + serverId + '/actions/disable_rescue');
  }

  disable_backups(serverId: number) {
    return this._post('servers/' + serverId + '/actions/disable_backups');
  }

  enable_backups(serverId: number, backup_window: string) {
    return this._post('servers/' + serverId + '/actions/enable_backups', {
      backup_window: backup_window
    });
  }

  create_image(serverId: number, type: string = 'snapshot') {
    return this._post('servers/' + serverId + '/actions/create_image', {type: type});
  }

  create_snapshot(serverId: number) {
    return this.create_image(serverId);
  }

  create_backup(serverId: number) {
    return this.create_image(serverId, 'backup')
  }

  rebuild(serverId: number, imageId: number) {
    return this._post('servers/' + serverId + '/actions/rebuild', {image: imageId});
  }

  delete(serverId: number) {
    return this._delete('servers/' + serverId);
  }
}
