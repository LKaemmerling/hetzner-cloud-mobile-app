import {Component} from '@angular/core';
import {NavController, NavParams, Platform} from 'ionic-angular';
import {Storage} from "@ionic/storage";
import {HetznerStatusSettingPage} from "../hetzner-status-setting/hetzner-status-setting";
import {StatusApiProvider} from "../../providers/status-api/status-api";

/**
 * Generated class for the HetznerStatusPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-hetzner-status',
  templateUrl: 'hetzner-status.html',
})
export class HetznerStatusPage {
  public messages;

  constructor(public navCtrl: NavController, public navParams: NavParams, protected statusApi: StatusApiProvider, protected storage: Storage, protected platform: Platform) {
    this.load();
  }

  openSettings() {
    this.navCtrl.push(HetznerStatusSettingPage);
  }

  public refresh(refresher) {
    this.load();
    refresher.complete();
  }

  public load() {
    this.statusApi.getStatus().then((data) => {
      this.messages = data;
    }, (error) => {
      if (error.error instanceof ErrorEvent) {
        // A client-side or network error occurred. Handle it accordingly.
        alert('An error occurred:'+ error.error.message);
      } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        alert(
          `Backend returned code ${error.status}, ` +
          `body was: ${error.error}`);
      }
    });
  }
}
