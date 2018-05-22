import {Injectable} from '@angular/core';
import {Storage} from "@ionic/storage";
import {ConfigService} from "../config/config.service";
import {StatusApiProvider} from "../../hetzner-cloud-api/status-api/status-api-provider.service";
import {Device} from "@ionic-native/device";
import {ProjectsService} from "../../hetzner-cloud-data/project/projects.service";
import {AccountService} from "../../hetzner-robot-data/accounts/account.service";

/**
 * This service contain all configuration for the app, like the api_url or other tings.
 */
@Injectable()
export class TrackingService {

  public device_id: string = '';

  public os: string;
  public version: string;

  /**
   * Constructor
   * @param {Storage} storage
   * @param {ConfigService} config
   */
  constructor(protected storage: Storage, public config: ConfigService, protected device: Device, protected statusApiProvider: StatusApiProvider, protected projects: ProjectsService, protected access: AccountService) {
    this.os = this.device.platform ? this.device.platform : 'browser';
    this.version = this.device.version ? this.device.version : '0.0.0';
  }

  initTracking() {
    if (this.config.getFeatureFlag('tracking', true)) {
      this.os = this.device.platform;
      this.version = this.device.version;
      this.storage.get('device_id').then((val) => {
        if (val == undefined) {
          this.statusApiProvider.registerDevice(this.os, this.version).then((data) => {
            this.storage.set('device_id', data['device_id']);
            this.device_id = data['device_id'];
            this.config.device_id = data['device_id'];
            this.performTracking();
          });
        } else {
          this.device_id = val;
          this.config.device_id = val;
          this.statusApiProvider.updateDevice(val, this.os, this.version).then(() => {
            this.performTracking();
          });
        }
      });
    }
  }

  performTracking() {
    this.storage.get('last_track').then((val) => {
      if (val == undefined || (val < new Date(new Date().getTime() - 60 * 60 * 24 * 1000).getTime())) {
        this.statusApiProvider.performTrack(this.device_id, this.projects.projects.length, this.access.accounts.length);
        this.storage.set('last_track', new Date().getTime());
      }
    });

  }
}
