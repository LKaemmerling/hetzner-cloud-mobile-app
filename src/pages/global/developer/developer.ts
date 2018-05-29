import {Component} from '@angular/core';
import {Device} from '@ionic-native/device';
import {ConfigService} from '../../../modules/hetzner-app/config/config.service';
import {Storage} from '@ionic/storage';
import {NavController} from 'ionic-angular';
import {SettingsPage} from '../settings/settings';
import {TrackingService} from "../../../modules/hetzner-app/tracking/tracking.service";

/**
 * This is the developer mode page
 */
@Component({
  selector: 'page-developer',
  templateUrl: 'developer.html',
})
export class DeveloperPage {
  protected feature_flags = {};
  protected remote_feature_flags = [];

  /**
   * Constructor
   * @param {Device} device
   * @param {ConfigService} config
   */
  constructor(
    protected device: Device,
    protected config: ConfigService,
    protected storage: Storage,
    protected nav: NavController,
    protected tracking: TrackingService
  ) {
    this.feature_flags = this.config.getFeatureFlag();
    this.remote_feature_flags = Object.keys(this.config.getRemoteFeatureFlag()).map(key => this.config.getRemoteFeatureFlag()[key]);

    tracking.trackFeature('global.developer');
  }

  toggleFlag(name: string) {
    if (this.feature_flags[name] == false) {
      alert('This feature could be unstable! Use it on your own risk!');
    }
    this.config.setFeatureFlag(name, !this.feature_flags[name]);
    this.feature_flags = this.config.getFeatureFlag();
  }

  removeDeveloperMode() {
    this.storage.set('developer_mode', false);
    this.config.developer_mode = false;
    this.nav.setRoot(SettingsPage);
  }
}
