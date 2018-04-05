import {Injectable} from '@angular/core';
import {HetznerApiProvider} from "../hetzner-api/hetzner-api";

/**
 * This is the provider that performs the api calls to the server api.
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
  /**
   * Creates a new Server. Returns preliminary information about the Server as well as an action that covers progress of creation.
   * @see https://docs.hetzner.cloud/#resources-servers-post
   * @param {string} name
   * @param {number} server_type_id
   * @param {number} datacenter_id
   * @param {boolean} start_after_create
   * @param {number} image_id
   * @param {Array<number>} ssh_keys
   * @returns {Promise<any>}
   */
  createServerWithDatacenter(name: string, server_type_id: number, datacenter_id: number, start_after_create: boolean, image_id: number, ssh_keys: Array<number>) {
    return this._post('servers', {
      name: name,
      server_type: server_type_id,
      datacenter: datacenter_id,
      start_after_create: start_after_create,
      image: image_id,
      ssh_keys: ssh_keys
    })
  }
  /**
   * Changes a Servername
   * @param {number} serverId
   * @param {string} newName
   * @returns {Promise<any>}
   */
  changeServerName(serverId: number, newName: string) {

    return this._put('servers/' + serverId, {
      name: newName
    })
  }

  /**
   * Change the Type of an Server
   * @param {number} serverId
   * @param {number} server_type_id
   * @param {boolean} upgrade_disk
   * @returns {Promise<any>}
   */
  changeServerType(serverId: number, server_type_id: number, upgrade_disk: boolean) {
    return this._post('servers/' + serverId + '/actions/change_type', {
      upgrade_disk: upgrade_disk,
      server_type: server_type_id,
    })
  }

  /**
   * Power on a Server
   * @param {number} serverId
   * @returns {Promise<any>}
   */
  powerOn(serverId: number) {
    return this._post('servers/' + serverId + '/actions/poweron');
  }

  /**
   * Power off a server
   * @param {number} serverId
   * @returns {Promise<any>}
   */
  powerOff(serverId: number) {
    return this._post('servers/' + serverId + '/actions/poweroff');
  }

  /**
   * Gracefully shutdown a server
   * @param {number} serverId
   * @returns {Promise<any>}
   */
  shutdown(serverId: number) {
    return this._post('servers/' + serverId + '/actions/shutdown');
  }

  /**
   * Reset a server
   * @param {number} serverId
   * @returns {Promise<any>}
   */
  reset(serverId: number) {
    return this._post('servers/' + serverId + '/actions/reset');
  }

  /**
   * Reboot a server
   * @param serverId
   * @returns {Promise<any>}
   */
  reboot(serverId) {
    return this._post('servers/' + serverId + '/actions/reboot');
  }

  /**
   * Reset the root password of a server
   * @param {number} serverId
   * @returns {Promise<any>}
   */
  resetPassword(serverId: number) {
    return this._post('servers/' + serverId + '/actions/reset_password');
  }

  /**
   * Enable the rescue mode
   * @param {number} serverId
   * @returns {Promise<any>}
   */
  enable_rescue(serverId: number) {
    return this._post('servers/' + serverId + '/actions/enable_rescue');
  }

  /**
   * Disable the rescue mode
   * @param {number} serverId
   * @returns {Promise<any>}
   */
  disable_rescue(serverId: number) {
    return this._post('servers/' + serverId + '/actions/disable_rescue');
  }

  /**
   * Disable the backups
   * @param {number} serverId
   * @returns {Promise<any>}
   */
  disable_backups(serverId: number) {
    return this._post('servers/' + serverId + '/actions/disable_backup');
  }

  /**
   * Enable the backups
   * @param {number} serverId
   * @param {string} backup_window
   * @returns {Promise<any>}
   */
  enable_backups(serverId: number, backup_window: string) {
    return this._post('servers/' + serverId + '/actions/enable_backup', {
      backup_window: backup_window
    });
  }

  /**
   * Create a image from the given server
   * @param {number} serverId
   * @param {string} type
   * @returns {Promise<any>}
   */
  create_image(serverId: number, type: string = 'snapshot') {
    return this._post('servers/' + serverId + '/actions/create_image', {type: type});
  }

  /**
   * Create a snapshot for the given server
   * @param {number} serverId
   * @returns {Promise<any>}
   */
  create_snapshot(serverId: number) {
    return this.create_image(serverId);
  }

  /**
   * Create a backup for the given server
   * @param {number} serverId
   * @returns {Promise<any>}
   */
  create_backup(serverId: number) {
    return this.create_image(serverId, 'backup')
  }

  /**
   * Rebuild the server from an image
   * @param {number} serverId
   * @param {number} imageId
   * @returns {Promise<any>}
   */
  rebuild(serverId: number, imageId: number) {
    return this._post('servers/' + serverId + '/actions/rebuild', {image: imageId});
  }

  /**
   * Delete the server
   * @param {number} serverId
   * @returns {Promise<any>}
   */
  delete(serverId: number) {
    return this._delete('servers/' + serverId);
  }

  /**
   * Change the reverse DNS of a server
   * @param {number} serverId
   * @param {string} ip
   * @param {string} dns_ptr
   */
  changeReverseDNS(serverId: number, ip: string, dns_ptr: string = null) {
    return this._post('servers/' + serverId + '/actions/change_dns_ptr', {ip: ip, dns_ptr: dns_ptr})
  }

  /**
   * Get the metrics from the given server
   * @param {number} serverId
   * @param {string} type
   * @param {string} start
   * @param {string} end
   * @param {number} step
   * @returns {Promise<any>}
   */
  getMetrics(serverId: number, type: string, start: string, end: string, step: number = 86400) {
    return this._get('servers/' + serverId + '/metrics?type=' + type + '&start=' + start + '&end=' + end + '&step=' + step);
  }

  /**
   * Request a console
   * @param {number} serverId
   * @returns {Promise<any>}
   */
  requestConsole(serverId: number) {
    return this._post('servers/' + serverId + '/actions/request_console');
  }
}
