import {Injectable} from '@angular/core';
import {HetznerApiProvider} from "../hetzner-api/hetzner-api";

/**
 * This is the provider that performs the api calls to the floating ip api.
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
   * @param {string} location
   * @returns {Promise<any>}
   */
  createFloatingIp(type: string, description: string, serverId: number, location: string = null) {
    var payload;
    if (location == null) {
      payload = {type: type, serverId: serverId, description: description}
    } else {
      payload = {type: type, home_location: location, description: description}
    }
    return this._post('floating_ips', payload)
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
   * Assigns a Floating IP to a Server
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

  /**
   * Changes the protection configuration of the Floating IP.
   * @see https://docs.hetzner.cloud/#resources-floating-ip-actions-post-3
   * @param {number} floatingIpId
   * @param {boolean} _delete
   * @returns {Promise<any>}
   */
  changeProtection(floatingIpId:number, _delete:boolean){
    return this._post('floating_ips/' + floatingIpId + '/actions/change_protection', {delete: _delete})
  }
}
