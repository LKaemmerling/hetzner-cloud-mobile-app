import {Storage} from "@ionic/storage";
import {Injectable} from '@angular/core';
import {FloatingIpApiProvider} from "../../../providers/floating-ip-api/floating-ip-api";

/**
 * Service that contains all storage methods for the floating ips.
 */
@Injectable()
export class FloatingIpsService {
  /**
   * All Floating IPs
   * @type {any[]}
   */
  public floating_ips: Array<any> = [];

  /**
   * Constructor
   * @param {Storage} storage
   * @param {FloatingIpApiProvider} floatingIpsApiProvider
   */
  constructor(private storage: Storage, private floatingIpsApiProvider: FloatingIpApiProvider) {
    this.floating_ips = [];
  }

  /**
   * Load all from local storage
   */
  public loadFloatingIps() {
    return this.storage.get('floating_ips').then((val) => {
      if (val !== undefined) {
        this.floating_ips = val;
      }
    });
  }

  /**
   * Save to local storage
   */
  public saveFloatingIps() {
    return this.storage.set('floating_ips', this.floating_ips);
  }

  /**
   * Get the Data from the API
   * @returns {Promise<void>}
   */
  public reloadFloatingIps() {
    return this.floatingIpsApiProvider.getFloatingIps().then((data) => {
      this.floating_ips = data['floating_ips'];
      this.saveFloatingIps();
    });
  }
}
