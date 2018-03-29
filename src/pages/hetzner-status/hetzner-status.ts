import {Component} from '@angular/core';
import {NavController, NavParams, Platform} from 'ionic-angular';
import {Storage} from "@ionic/storage";
import {HetznerStatusSettingPage} from "../hetzner-status-setting/hetzner-status-setting";
import {StatusApiProvider} from "../../providers/status-api/status-api";
import {InAppBrowser} from "@ionic-native/in-app-browser";
import {TranslateService} from "@ngx-translate/core";
import {NetworkProvider} from "../../modules/hetzner-app/network/network";

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
  public loading: boolean = false;
  public loading_done: boolean = false;

  constructor(protected navCtrl: NavController,
              protected navParams: NavParams,
              protected statusApi: StatusApiProvider,
              protected storage: Storage,
              protected platform: Platform,
              protected browser: InAppBrowser,
              protected translate: TranslateService,
              protected network: NetworkProvider) {
    this.loadMessages();
  }

  openSettings() {
    this.navCtrl.push(HetznerStatusSettingPage);
  }

  public loadMessages() {
    if (this.network.has_connection) {
      this.loading = true;
      this.storage.get('lang').then(value => {
        let lang = 'de';
        if (value != undefined) {
          lang = value;
        }
        this.statusApi.getStatus(lang).then((data) => {
          this.messages = data;
          this.loading = false;
          this.loading_done = true;
          setTimeout(() => this.loading_done = false, 3000);
        }, (error) => {
          if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            alert('An error occurred:' + error.error.message);
          } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            alert(
              `Backend returned code ${error.status}, ` +
              `body was: ${error.error}`);
          }
        });
      });
    }
  }

  public openPage(url: string) {
    this.browser.create(url).show();
  }
}
