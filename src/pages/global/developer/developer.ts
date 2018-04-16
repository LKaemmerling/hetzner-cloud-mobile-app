import {Component} from '@angular/core';
import {Device} from "@ionic-native/device";
import {ConfigService} from "../../../modules/hetzner-app/config/config.service";


/**
 * This is the developer mode page
 */
@Component({
  selector: 'page-developer',
  templateUrl: 'developer.html',
})
export class DeveloperPage {

  protected feature_flags = {};

  /**
   * Constructor
   * @param {Device} device
   * @param {ConfigService} config
   */
  constructor(protected device: Device, protected config: ConfigService) {
    this.feature_flags = this.config.getFeatureFlag();
  }

  toggleFlag(name: string) {
    this.config.setFeatureFlag(name, !this.feature_flags[name]);
    this.feature_flags = this.config.getFeatureFlag();
  }

}
