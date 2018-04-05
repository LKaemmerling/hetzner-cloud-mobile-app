import {Component} from '@angular/core';
import {NavController, NavParams, Platform} from 'ionic-angular';
import {Storage} from "@ionic/storage";
import {HetznerStatusSettingPage} from "../hetzner-status-setting/hetzner-status-setting";
import {StatusApiProvider} from "../../providers/status-api/status-api";
import {InAppBrowser} from "@ionic-native/in-app-browser";
import {TranslateService} from "@ngx-translate/core";
import {NetworkProvider} from "../../modules/hetzner-app/network/network";

/**
 * This is the hetzner status page in the app
 */

@Component({
  selector: 'page-hetzner-status',
  templateUrl: 'hetzner-status.html',
})
export class HetznerStatusPage {
  /**
   * Contains all messages from the hetzner status api
   */
  public messages;
  /**
   * Is there currently something loading?
   * @type {boolean}
   */
  public loading: boolean = false;
  /**
   * Is the loading done?
   * @type {boolean}
   */
  public loading_done: boolean = false;

  /**
   * Constructor
   * @param {NavController} navCtrl
   * @param {NavParams} navParams
   * @param {StatusApiProvider} statusApi
   * @param {Storage} storage
   * @param {Platform} platform
   * @param {InAppBrowser} browser
   * @param {TranslateService} translate
   * @param {NetworkProvider} network
   */
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

  /**
   * Open the status settings
   */
  openSettings() {
    this.navCtrl.push(HetznerStatusSettingPage);
  }

  /**
   * Load all messages from the status api
   */
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

  /**
   * Open the given url in the in-app-browser
   * @param {string} url
   */
  public openPage(url: string) {
    this.browser.create(url).show();
  }
}
