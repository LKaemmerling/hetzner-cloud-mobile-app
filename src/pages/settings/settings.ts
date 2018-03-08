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

  public version: string = 'DEV-VERSION';
  public finger_print: number = -1;

  public language: string = 'de';
  public new_projects_design: boolean = false;
  public experimental_shareable_projects: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public appVersion: AppVersion, public fingerprint: FingerprintAIO, public storage: Storage, public loadingCtrl: LoadingController, public translate: TranslateService, public oneSignal: OneSignal) {
    appVersion.getVersionNumber().then((_version) => {
      this.version = _version;
    });
    storage.get('lang').then(value => {
      if (value != undefined) {
        this.language = value;
      }
    });
    storage.get('experimental_project_design').then(value => {
      if (value != undefined) {
        this.new_projects_design = value;
      }
    });
    storage.get('experimental_shareable_projects').then(value => {
      if (value != undefined) {
        this.experimental_shareable_projects = value;
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

  openDeleteAllPage() {
    this.navCtrl.push(DeleteAllDataPage);
  }

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

  changeOpenProjectDesign() {
    let loader = this.loadingCtrl.create();
    loader.present();
    this.storage.set('experimental_project_design', this.new_projects_design);
    loader.dismiss();
  }

  changeShareableProjects() {
    let loader = this.loadingCtrl.create();
    loader.present();
    this.storage.set('experimental_shareable_projects', this.experimental_shareable_projects);
    loader.dismiss();

  }
}
