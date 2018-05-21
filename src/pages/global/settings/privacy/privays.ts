import {Component} from '@angular/core';
import {NavController} from "ionic-angular";

/**
 * This is the settings page, that contain all possible settings of the app
 */

@Component({
  selector: 'page-privacy',
  templateUrl: 'privays.html',
})
export class PrivacyPage {
  /**
   * Constructor
   * @param {NavController} navCtrl
   * @param {NavParams} navParams
   * @param {FingerprintAIO} fingerprint
   * @param {Storage} storage
   * @param {LoadingController} loadingCtrl
   * @param {ConfigService} config
   * @param {TranslateService} translate
   * @param {ToastController} toastController
   * @param {OneSignal} oneSignal
   */
  constructor(
    protected navCtrl: NavController
  ) {
  }
}
