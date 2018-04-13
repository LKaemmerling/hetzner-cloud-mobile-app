import { Component } from '@angular/core';
import {Device} from "@ionic-native/device";
import {ConfigService} from "../../../modules/hetzner-app/config/config.service";

/**
 * Generated class for the DeveloperPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-developer',
  templateUrl: 'developer.html',
})
export class DeveloperPage {


  constructor(protected device:Device, protected config:ConfigService) {
  }



}
