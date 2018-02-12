import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {DeleteAllDataPage} from "../delete-all-data/delete-all-data";
import {AppVersion} from "@ionic-native/app-version";
import {FingerprintAIO} from "@ionic-native/fingerprint-aio";
import {Storage} from "@ionic/storage";

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
  public finger_print: number = -1;

  constructor(public navCtrl: NavController, public navParams: NavParams, public appVersion: AppVersion, public fingerprint: FingerprintAIO, public storage: Storage) {
    appVersion.getVersionNumber().then((_version) => {
      this.version = _version;
    });
    this.fingerprint.isAvailable().then(resp => {
      if (resp == 'OK') {
        this.finger_print = 0;
        storage.get('auth').then((value => {
          if (value != undefined && value == 'enabled') {
            this.finger_print = 1;
          } else {
            this.finger_print = 0;
          }
        }))
      }
    });
  }

  openDeleteAllPage() {
    this.navCtrl.push(DeleteAllDataPage);
  }

  public openFingerprint() {
    alert('This feature is experiential! ');
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

}
