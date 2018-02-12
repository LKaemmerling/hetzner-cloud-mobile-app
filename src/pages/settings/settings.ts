import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {DeleteAllDataPage} from "../delete-all-data/delete-all-data";
import {AppVersion} from "@ionic-native/app-version";
import {FingerprintAIO} from "@ionic-native/fingerprint-aio";

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

  public version: string = 'DEV-VERSION';

  constructor(public navCtrl: NavController, public navParams: NavParams, public appVersion: AppVersion, public fingerprint: FingerprintAIO) {
    appVersion.getVersionNumber().then((_version) => {
      this.version = _version;
    });
  }

  openDeleteAllPage() {
    this.navCtrl.push(DeleteAllDataPage);
  }

  public openFingerprint() {
    this.fingerprint.show({
      clientId: "Fingerprint-Demo"
    }).then(result => {
      console.log(result);
    }).catch(err => {
      console.log(err);
    });
  }

}
