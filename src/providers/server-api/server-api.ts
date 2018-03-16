import {Injectable} from '@angular/core';
import {HetznerApiProvider} from "../hetzner-api/hetzner-api";

/*
  Generated class for the ServerApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServerApiProvider extends HetznerApiProvider {

  /**
   * Returns all existing Server objects
   * @see https://docs.hetzner.cloud/#resources-servers-get
   * @param {string} searchTerm
   * @returns {Promise<any>}
   */
  getServers(searchTerm: string = null) {
    return this._get('servers' + (searchTerm == null ? '' : '?name=' + searchTerm))
  }

  /**
   * Returns a specific Server object. The Server must exist inside the project
   * @see https://docs.hetzner.cloud/#resources-servers-get-1
   * @param {number} serverId
   * @returns {Promise<any>}
   */
  getServer(serverId: number) {
    return this._get('servers/' + serverId)
  }

  /**
   * Creates a new Server. Returns preliminary information about the Server as well as an action that covers progress of creation.
   * @see https://docs.hetzner.cloud/#resources-servers-post
   * @param {string} name
   * @param {number} server_type_id
   * @param {number} location_id
   * @param {boolean} start_after_create
   * @param {number} image_id
   * @param {Array<number>} ssh_keys
   * @returns {Promise<any>}
   */
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
    return this._post('servers/' + serverId + '/actions/disable_backup');
  }

  enable_backups(serverId: number, backup_window: string) {
    return this._post('servers/' + serverId + '/actions/enable_backup', {
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

  changeReverseDNS(serverId: number, ip: string, dns_ptr: string = null) {
    return this._post('servers/' + serverId + '/actions/change_dns_ptr', {ip: ip, dns_ptr: dns_ptr})
  }

  getMetrics(serverId: number, type: string, start: string, end: string, step:number = 86400) {
    return this._get('servers/' + serverId + '/metrics?type=' + type + '&start=' + start + '&end=' + end+ '&step=' + step);
  }

  requestConsole(serverId: number){
    return this._post('servers/' + serverId + '/actions/request_console');
  }
}
