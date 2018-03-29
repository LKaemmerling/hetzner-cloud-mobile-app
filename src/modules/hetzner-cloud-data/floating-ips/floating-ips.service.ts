import {Storage} from "@ionic/storage";
import {Injectable} from '@angular/core';
import {ImageApiProvider} from "../../../providers/image-api/image-api";
import {FloatingIpApiProvider} from "../../../providers/floating-ip-api/floating-ip-api";

@Injectable()
export class FloatingIpsService {
  /**
   *
   * @type {any[]}
   */
  public floating_ips: Array<any> = [];

  /**
   *
   * @param {Storage} storage
   * @param {FloatingIpApiProvider} floatingIpsApiProvider
   */
  constructor(private storage: Storage, private floatingIpsApiProvider: FloatingIpApiProvider) {
    this.floating_ips = [];
  }

  /**
   *
   */
  public loadFloatingIps() {
    return this.storage.get('floating_ips').then((val) => {
      if (val !== undefined) {
        this.floating_ips = val;
      }
    });
  }

  /**
   *
   */
  public saveFloatingIps() {
    return this.storage.set('floating_ips', this.floating_ips);
  }

  /**
   *
   * @returns {Promise<void>}
   */
  public reloadFloatingIps() {
    return this.floatingIpsApiProvider.getFloatingIps().then((data) => {
      this.floating_ips = data['floating_ips'];
      this.saveFloatingIps();
    });
  }
}
