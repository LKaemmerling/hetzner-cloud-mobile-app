import {Component} from '@angular/core';
import {NavController, NavParams, Platform} from 'ionic-angular';
import {OneSignal} from "@ionic-native/onesignal";
import {Storage} from "@ionic/storage";

/**
 * Generated class for the HetznerStatusSettingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-hetzner-status-setting',
  templateUrl: 'hetzner-status-setting.html',
})
export class HetznerStatusSettingPage {

  public categories = [
    {
      "key": "Allgemein",
      "value": false,
    },
    {
      "key": "Basis Infrastruktur",
      "value": false,
    },
    {
      "key": "Erweiterte Infrastruktur",
      "value": false,
    },
    {
      "key": "Netzwerk",
      "value": false,
    },
    {
      "key": "Webhosting und Managed Server",
      "value": false,
    },
    {
      "key": "Domain Registration Robot",
      "value": false,
    },
    {
      "key": "vServer",
      "value": false,
    },
    {
      "key": "Cloud",
      "value": false,
    }
  ];
  public _send: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, protected oneSignal: OneSignal, protected storage: Storage, protected platform: Platform) {
    this.storage.get('hetzner_status_settings').then((data) => {
      if (data != undefined && data != null) {
        this.categories = data;
      }
    })
  }

  save() {
    this._send = false;
    let prompt = false;
    this.categories.forEach((value, key) => {
      this.oneSignal.sendTag(value.key, "" + value.value);
      if (value.value == true) {
        prompt = true;
      }
    });
    this._send = true;
    if (prompt && this.platform.is('ios')) {
      this.oneSignal.promptForPushNotificationsWithUserResponse();
    }
    this.storage.set('hetzner_status_settings', this.categories);
  }
}
