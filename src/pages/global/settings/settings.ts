import {Component, Inject} from '@angular/core';
import {LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {DeleteAllDataPage} from '../delete-all-data/delete-all-data';
import {FingerprintAIO} from '@ionic-native/fingerprint-aio';
import {Storage} from '@ionic/storage';
import {TranslateService} from '@ngx-translate/core';
import {OneSignal} from '@ionic-native/onesignal';
import {ConfigService} from '../../../modules/hetzner-app/config/config.service';
import {DeveloperPage} from '../developer/developer';
import {PrivacyPage} from "./privacy/privays";
import {Clipboard} from "@ionic-native/clipboard";
import {TrackingService} from "../../../modules/hetzner-app/tracking/tracking.service";
import {DOCUMENT} from "@angular/common";
import {SplashScreen} from "@ionic-native/splash-screen";

/**
 * This is the settings page, that contain all possible settings of the app
 */

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  /**
   * -1 if the finger print Auth isn't available, 0 if is available but not enabled, 1 if available and enabled
   * @type {number}
   */
  public finger_print: number = -1;

  public tracking: boolean = true;
  /**
   *
   * @type {boolean}
   */
  public analytics: boolean = true;
  /**
   * This stores the clicks on the version
   * @type {number}
   */
  private developer_mode_clicks = 0;
  /**
   * The Language Key
   * @type {string}
   */
  public language: string = 'de';
  /**
   * Is the compact server design used?
   * @type {boolean}
   */
  public compact_server_design: boolean = false;
  /**
   * Is it allowed to get the cloud status?
   * @type {boolean}
   */
  public cloud_status: boolean = false;
  /**
   * Is dark design enabled?
   * @type {boolean}
   */
  public dark_design: boolean = false;

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
   * @param {Clipboard} clipboard
   */
  constructor(
    protected navCtrl: NavController,
    protected navParams: NavParams,
    protected fingerprint: FingerprintAIO,
    protected storage: Storage,
    protected loadingCtrl: LoadingController,
    protected config: ConfigService,
    protected translate: TranslateService,
    protected toastController: ToastController,
    protected oneSignal: OneSignal,
    protected clipboard: Clipboard,
    protected _tracking: TrackingService,
    @Inject(DOCUMENT) protected document: Document,
    protected splashscreen: SplashScreen
  ) {
    _tracking.trackFeature('global.settings');
    this.dark_design = this.config.getFeatureFlag('dark_design', false);
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
    this.tracking = this.config.getFeatureFlag('tracking', true);
    this.cloud_status = this.config.getFeatureFlag('cloud_status', false);
    this.fingerprint
      .isAvailable()
      .then(resp => {
        this.finger_print = 0;
        storage.get('auth').then(value => {
          if (value != undefined && value == 'enabled') {
            this.finger_print = 1;
          } else {
            this.finger_print = 0;
          }
        });
      })
      .then(() => (this.finger_print = -1));
  }

  /**
   * Open the delete-all-data-page
   */
  openDeleteAllPage() {
    this.navCtrl.push(DeleteAllDataPage);
  }

  /**
   * Change the language of the app
   */
  changeLanguage() {
    let loader = this.loadingCtrl.create();
    loader.present();
    this.storage.set('lang', this.language);
    this.translate.use(this.language);
    this.storage.get('hetzner_status_settings').then(data => {
      if (data != undefined && data != null) {
        this.oneSignal.sendTag('lang', this.language);
      }
    });
    loader.dismiss();
  }

  changeAnalytics() {
    this.storage.set('analytics', this.analytics);
  }

  /**
   * Open the fingerprint auth
   */
  openFingerprint() {
    this.fingerprint
      .show({
        clientId: 'Hetzner-Cloud-Mobile',
        clientSecret: 'password', //Only necessary for Android
        disableBackup: false, //Only for Android(optional)
        localizedFallbackTitle: 'Use Pin', //Only for iOS
        localizedReason: 'Please authenticate', //Only for iOS
      })
      .then(result => {
        var auth = 'disabled';
        if (this.finger_print == 1) {
          auth = 'enabled';
        }
        this.storage.set('auth', auth);
      })
      .catch(err => {
        alert('Error: ' + err);
      });
  }

  /**
   * Change and save the server design
   */
  changeServersDesign() {
    let loader = this.loadingCtrl.create();
    loader.present();
    this.storage.set('compact_server_design', this.compact_server_design);
    loader.dismiss();
  }

  /**
   * Setup the developer mode.
   */
  setUpDeveloperMode() {
    let steps = 7;
    this.developer_mode_clicks++;

    if (this.developer_mode_clicks >= steps) {
      this.storage.set('developer_mode', true);
      this.config.developer_mode = true;
      this.toastController.create({message: 'Developer mode is now active', duration: 2000}).present();
      return;
    } else if (this.developer_mode_clicks > steps - 3) {
      this.toastController
        .create({
          message: 'Only ' + (steps - this.developer_mode_clicks) + ' more',
          duration: 200,
        })
        .present();
      return;
    }
  }

  openDeveloperMode() {
    this.navCtrl.push(DeveloperPage);
  }

  changeCloudStatus() {
    this.config.setFeatureFlag('cloud_status', this.cloud_status);
  }

  changeTracking() {
    this.config.setFeatureFlag('tracking', this.tracking);
  }

  changeDarkDesignState() {
    this.splashscreen.show();
    this.config.setFeatureFlag('dark_design', this.dark_design);
    this.document.body.classList.remove(this.config.getFeatureFlag('dark_design', false) ? 'light-design' : 'dark-design');
    this.document.body.classList.add(this.config.getFeatureFlag('dark_design', false) ? 'dark-design' : 'light-design');
    setTimeout(() => this.splashscreen.hide(),2000);
  }

  openPrivacyPage() {
    this.navCtrl.push(PrivacyPage);
  }

  copyDeviceId() {
    this.clipboard.copy(this.config.device_id);
    this.toastController.create({message: 'OK'}).present();
  }
}
