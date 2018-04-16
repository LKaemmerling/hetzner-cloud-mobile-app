import {Component} from '@angular/core';
import {Device} from "@ionic-native/device";
import {ConfigService} from "../../../modules/hetzner-app/config/config.service";
import {Pro} from "@ionic/pro";

/**
 * This is the developer mode page
 */
@Component({
  selector: 'page-developer',
  templateUrl: 'developer.html',
})
export class DeveloperPage {
  /**
   * Constructor
   * @param {Device} device
   * @param {ConfigService} config
   */
  constructor(protected device: Device, protected config: ConfigService) {

  }
}
