import {Injectable} from '@angular/core';
import {HetznerApiProvider} from "../hetzner-api/hetzner-api";

/*
  Generated class for the StatusApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FloatingIpApiProvider extends HetznerApiProvider {

  /**
   * Get all Floating from the Hetzner API
   * @see https://docs.hetzner.cloud/#resources-floating-ips-get
   * @returns {Promise<any>}
   */
  getFloatingIps() {
    return this._get('floating_ips')
  }

  /**
   * Create a Floating IP
   * @see https://docs.hetzner.cloud/#resources-floating-ips-post
   * @param {string} type
   * @param {string} description
   * @param {number} serverId
   * @returns {Promise<any>}
   */
  createFloatingIp(type: string, description: string, serverId: number) {
    return this._post('floating_ips', {type: type, server: serverId, description: description})
  }

  /**
   * Deletes a Floating IP
   * @see https://docs.hetzner.cloud/#resources-floating-ips-delete
   * @param {number} floatingIpId
   * @returns {Promise<any>}
   */
  deleteFloatingIp(floatingIpId: number) {
    return this._delete('floating_ips/' + floatingIpId)
  }

  /**
   * Changes the description of a Floating IP
   * @see https://docs.hetzner.cloud/#resources-floating-ips-put
   * @param {number} serverId
   * @param {string} description
   * @returns {Promise<any>}
   */
  changeDescription(serverId: number, description: string) {
    return this._put('floating_ips/' + serverId, {description: description})
  }

  /**
   * Assigns a Floating IP to a server
   * @see https://docs.hetzner.cloud/#resources-floating-ip-actions-post
   * @param {number} floatingIpId
   * @param {number} serverId
   * @returns {Promise<any>}
   */
  assignToServer(floatingIpId: number, serverId: number) {
    return this._post('floating_ips/' + floatingIpId + '/actions/assign', {server: serverId})
  }

  /**
   * Unassigns a Floating IP, resulting in it being unreachable
   * @see https://docs.hetzner.cloud/#resources-floating-ip-actions-post-1
   * @param {number} floatingIpId
   * @returns {Promise<any>}
   */
  unassign(floatingIpId: number) {
    return this._post('floating_ips/' + floatingIpId + '/actions/unassign')
  }

  /**
   * Changes the hostname that will appear when getting the hostname belonging to this Floating IP
   * @see https://docs.hetzner.cloud/#resources-floating-ip-actions-post-2
   * @param {number} floatingIpId
   * @param {string} ip
   * @param {string} dns_ptr
   * @returns {Promise<any>}
   */
  changeReverseDNS(floatingIpId: number, ip: string, dns_ptr: string = null) {
    return this._post('floating_ips/' + floatingIpId + '/actions/change_dns_ptr', {ip: ip, dns_ptr: dns_ptr})
  }
}
