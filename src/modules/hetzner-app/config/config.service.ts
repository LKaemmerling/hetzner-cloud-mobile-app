import {Injectable} from '@angular/core';
import {Storage} from "@ionic/storage";
import {AppVersion} from "@ionic-native/app-version";

/**
 * This service contain all configuration for the app, like the api_url or other tings.
 */
@Injectable()
export class ConfigService {
  /**
   * The current version String
   * @type {string}
   */
  public version = '1.6.0-DEV-VERSION';
  /**
   * The currently used language
   * @type {string}
   */
  public language = 'en';
  /**
   *
   * @type {string[]}
   */
  public available_languages = ['de', 'en'];
  /**
   * The basic url for the api calls
   * @type {string}
   */
  public api_url: string = 'https://api.hetzner.cloud/v1';
  /**
   * This contains all configuration for the One Signal Push Notification service
   * @type any
   */
  public oneSignal = {
    appId: 'e8714cee-7480-45da-bad0-19ba3c3e89c4',
    googleProjectId: '1069973161280'
  }
  /**
   * This contains the message about the developer mode.
   * @type {boolean}
   */
  public developer_mode = false;

  /**
   * Constructor
   * @param {Storage} storage
   * @param {AppVersion} appVersion
   */
  constructor(protected storage: Storage, public appVersion: AppVersion) {
  }

  /**
   * Load the configuration from the storage
   */
  public init() {
    return new Promise((resolve => {
      this.storage.get('developer_mode').then(val => {
        if (val != undefined) {
          this.developer_mode = val;
        }
        this.storage.get('lang').then(lang => {
          if (lang != undefined && lang != null) {
            this.language = lang;
          } else {
            if ((<any>window).Intl && typeof (<any>window).Intl === 'object') {
              let language = navigator.language.substring(0, 2).toLowerCase();
              if (this.available_languages.indexOf(language) != -1) {
                this.language = language;
                console.log(language);
              }
            }
          }
          resolve();
          this.appVersion.getVersionNumber().then(
            (_version) => {
              this.version = _version;
            }
          );
        });
      });
    }));

  }
}
