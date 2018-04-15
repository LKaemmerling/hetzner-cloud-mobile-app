import {Component} from '@angular/core';
import {Device} from "@ionic-native/device";
import {ConfigService} from "../../../modules/hetzner-app/config/config.service";
import {Pro} from "@ionic/pro";

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

  public downloadProgress = 0;

  constructor(protected device: Device, protected config: ConfigService) {

  }

  performAutomaticUpdate() {
    const config = {
      'appId': '359b3ec5',
      channel: 'Beta'
    };
    Pro.deploy.init(config).then(() => {
      /*
     This code performs an entire Check, Download, Extract, Redirect flow for
     you so you don't have to program the entire flow yourself. This should
     work for a majority of use cases.
   */

      try {

        Pro.deploy.checkAndApply(true, (progress) => {
          this.downloadProgress = progress;
        }).then((resp) => {
          if (resp.update) {
            alert('Update found!');
          } else {
            alert('Update not found!');
          }
        });


      } catch (err) {
        alert('Err!');
      }
    });

  }

}
