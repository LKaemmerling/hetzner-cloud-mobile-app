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

  async performAutomaticUpdate() {
    const config = {
      channel: 'Beta'
    };
    await Pro.deploy.init(config);
    /*
      This code performs an entire Check, Download, Extract, Redirect flow for
      you so you don't have to program the entire flow yourself. This should
      work for a majority of use cases.
    */

    try {
      const resp = await Pro.deploy.checkAndApply(true, (progress) => {
        this.downloadProgress = progress;
      });

      if (resp.update) {
        // We found an update, and are in process of redirecting you since you put true!
      } else {
        // No update available
      }
    } catch (err) {
      // We encountered an error.
      // Here's how we would log it to Ionic Pro Monitoring while also catching:

      // Pro.monitoring.exception(err);
    }
  }

}
