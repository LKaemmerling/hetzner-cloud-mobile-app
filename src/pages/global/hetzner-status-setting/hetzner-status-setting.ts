import {Component} from '@angular/core';
import {NavController, NavParams, Platform} from 'ionic-angular';
import {OneSignal} from '@ionic-native/onesignal';
import {Storage} from '@ionic/storage';

/**
 * This is the hetzner status setting page, where you can en/disable notifications for some types of notifications
 */

@Component({
  selector: 'page-hetzner-status-setting',
  templateUrl: 'hetzner-status-setting.html',
})
export class HetznerStatusSettingPage {
  /**
   * All available categories
   * @type {{key: string; lang: string; value: boolean}[]}
   */
  public categories = [
    {
      key: 'Allgemein',
      lang: 'PAGE.STATUS.MODAL.SETTINGS.CATEGORY.GENERAL',
      value: false,
    },
    {
      key: 'App',
      lang: 'PAGE.STATUS.MODAL.SETTINGS.CATEGORY.MY_HETZNER',
      value: false,
    },
    {
      key: 'Basis Infrastruktur',
      lang: 'PAGE.STATUS.MODAL.SETTINGS.CATEGORY.BASIC_INFRASTRUCTURE',
      value: false,
    },
    {
      key: 'Erweiterte Infrastruktur',
      lang: 'PAGE.STATUS.MODAL.SETTINGS.CATEGORY.ADVANCED_INFRASTRUCTURE',
      value: false,
    },
    {
      key: 'Netzwerk',
      lang: 'PAGE.STATUS.MODAL.SETTINGS.CATEGORY.NETWORK',
      value: false,
    },
    {
      key: 'Webhosting und Managed Server',
      lang: 'PAGE.STATUS.MODAL.SETTINGS.CATEGORY.WEB_HOSTING_AND_MANAGED_SERVER',
      value: false,
    },
    {
      key: 'Domain Registration Robot',
      lang: 'PAGE.STATUS.MODAL.SETTINGS.CATEGORY.DOMAIN_REGISTRATION_ROBOT',
      value: false,
    },
    {
      key: 'vServer',
      lang: 'PAGE.STATUS.MODAL.SETTINGS.CATEGORY.V_SERVER',
      value: false,
    },
    {
      key: 'Cloud',
      lang: 'PAGE.STATUS.MODAL.SETTINGS.CATEGORY.CLOUD',
      value: false,
    },
  ];
  /**
   * Is the sound enabled?
   * @type {boolean}
   */
  public sound: boolean = true;
  /**
   * Is vibration enabled?
   * @type {boolean}
   */
  public vibrate: boolean = true;
  /**
   * Is this component currently sending?
   * @type {boolean}
   */
  public _send: boolean;

  /**
   * Constructor
   * @param {NavController} navCtrl
   * @param {NavParams} navParams
   * @param {OneSignal} oneSignal
   * @param {Storage} storage
   * @param {Platform} platform
   */
  constructor(
    protected navCtrl: NavController,
    protected navParams: NavParams,
    protected oneSignal: OneSignal,
    protected storage: Storage,
    protected platform: Platform
  ) {
    this.storage.get('hetzner_status_settings').then(data => {
      if (data != undefined && data != null) {
        this.categories = data;
      }
    });
    this.storage.get('hetzner_status_settings_sound').then(data => {
      if (data != undefined && data != null) {
        this.sound = data;
      }
    });
    this.storage.get('hetzner_status_settings_vibrate').then(data => {
      if (data != undefined && data != null) {
        this.vibrate = data;
      }
    });
  }

  /**
   * Save the form and send all to onesignal and to the storage
   */
  save() {
    this._send = false;
    let prompt = false;
    this.oneSignal.enableSound(this.sound);
    this.oneSignal.enableVibrate(this.vibrate);
    this.categories.forEach((value, key) => {
      this.oneSignal.sendTag(value.key, '' + value.value);
      if (value.value == true) {
        prompt = true;
      }
    });
    this.storage.get('lang').then(value => {
      if (value != undefined) {
        this.oneSignal.sendTag('lang', '' + value);
      }
    });
    this._send = true;
    if (prompt && this.platform.is('ios')) {
      this.oneSignal.promptForPushNotificationsWithUserResponse();
    }
    this.storage.set('hetzner_status_settings', this.categories);
    this.storage.set('hetzner_status_settings_sound', this.sound);
    this.storage.set('hetzner_status_settings_vibrate', this.vibrate);
  }
}
