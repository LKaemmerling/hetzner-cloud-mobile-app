import {Component} from '@angular/core';
import {LoadingController, NavController, NavParams} from 'ionic-angular';
import {DeleteAllDataPage} from "../delete-all-data/delete-all-data";
import {AppVersion} from "@ionic-native/app-version";
import {FingerprintAIO} from "@ionic-native/fingerprint-aio";
import {Storage} from "@ionic/storage";
import {TranslateService} from "@ngx-translate/core";
import {OneSignal} from "@ionic-native/onesignal";

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  /**
   * Contains the Version String of the app
   * @type {string}
   */
  public version: string = 'DEV-VERSION';
  /**
   * -1 if the finger print Auth isn't available, 0 if is available but not enabled, 1 if available and enabled
   * @type {number}
   */
  public finger_print: number = -1;
  /**
   * The Language Key
   * @type {string}
   */
  public language: string = 'de';
  /**
   *
   * @type {boolean}
   */
  public compact_server_design: boolean = false;

  /**
   *
   * @param {NavController} navCtrl
   * @param {NavParams} navParams
   * @param {AppVersion} appVersion
   * @param {FingerprintAIO} fingerprint
   * @param {Storage} storage
   * @param {LoadingController} loadingCtrl
   * @param {TranslateService} translate
   * @param {OneSignal} oneSignal
   */
  constructor(public navCtrl: NavController, public navParams: NavParams, public appVersion: AppVersion, public fingerprint: FingerprintAIO, public storage: Storage, public loadingCtrl: LoadingController, public translate: TranslateService, public oneSignal: OneSignal) {
    appVersion.getVersionNumber().then((_version) => {
      this.version = _version;
    });
    storage.get('lang').then(value => {
      if (value != undefined) {
        this.language = value;
      }
    });
    storage.get('compact_server_design').then(value => {
      if (value != undefined) {
        this.compact_server_design = value;
      }
    });

    this.fingerprint.isAvailable().then(resp => {

      this.finger_print = 0;
      storage.get('auth').then((value => {
        if (value != undefined && value == 'enabled') {
          this.finger_print = 1;
        } else {
          this.finger_print = 0;
        }
      }))

    }).then(() => this.finger_print = -1);
  }

  /**
   *
   */
  openDeleteAllPage() {
    this.navCtrl.push(DeleteAllDataPage);
  }

  /**
   *
   */
  changeLanguage() {
    let loader = this.loadingCtrl.create();
    loader.present();
    this.storage.set('lang', this.language);
    this.translate.use(this.language);
    this.storage.get('hetzner_status_settings').then((data) => {
      if (data != undefined && data != null) {
        this.oneSignal.sendTag('lang', this.language);
      }
    });
    loader.dismiss();
  }

  /**
   *
   */
  openFingerprint() {
    this.fingerprint.show({
      clientId: 'Hetzner-Cloud-Mobile',
      clientSecret: 'password', //Only necessary for Android
      disableBackup: false,  //Only for Android(optional)
      localizedFallbackTitle: 'Use Pin', //Only for iOS
      localizedReason: 'Please authenticate' //Only for iOS
    }).then(result => {
      var auth = 'disabled';
      if (this.finger_print == 1) {
        auth = 'enabled';
      }
      this.storage.set('auth', auth);
    }).catch(err => {
      alert('Error: ' + err);
    });
  }

  /**
   *
   */
  changeServersDesign() {
    let loader = this.loadingCtrl.create();
    loader.present();
    this.storage.set('compact_server_design', this.compact_server_design);
    loader.dismiss();
  }

}
