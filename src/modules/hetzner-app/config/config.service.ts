import {Injectable} from '@angular/core';
import {Storage} from "@ionic/storage";
import {AppVersion} from "@ionic-native/app-version";
import {Platform} from "ionic-angular";

/**
 * This service contain all configuration for the app, like the api_url or other tings.
 */
@Injectable()
export class ConfigService {
  /**
   * The current version String
   * @type {string}
   */
  public version = '2.0.0-DEV-VERSION';
  public build = '0000001';
  /**
   * The currently used language
   * @type {string}
   */
  public language = 'de';
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
   * The basic url for all robot api call
   * @type {string}
   */
  public robot_api_url: string = 'https://robot-ws.your-server.de';
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
   *
   * @type {boolean}
   */
  public analytics = true;
  public feature_flags = {
    robot: true
  };
  /**
   *
   * @type {boolean}
   */
  public runs_on_device = false;

  /**
   * Constructor
   * @param {Storage} storage
   * @param {AppVersion} appVersion
   */
  constructor(protected storage: Storage, public appVersion: AppVersion, protected platform: Platform) {
  }

  /**
   * Load the configuration from the storage
   */
  public init() {
    return new Promise((resolve => {
      if (this.platform.is('ios') == false && this.platform.is('android') == false) {
        this.robot_api_url = 'http://localhost:8100/robot';
        this.runs_on_device = false;
      } else {
        this.runs_on_device = true;
      }
      this.storage.get('developer_mode').then(val => {
        if (val != undefined) {
          this.developer_mode = val;
        }
        this.storage.get('analytics').then(val => {
          if (val != undefined) {
            this.analytics = val;
          }
          this.storage.get('feature_flags').then(feature_flags => {
            this.feature_flags = Object.assign(this.feature_flags, feature_flags);
            this.storage.get('lang').then(lang => {
              if (lang != undefined && lang != null) {
                this.language = lang;
              } else {
                if ((<any>window).Intl && typeof (<any>window).Intl === 'object') {
                  let language = navigator.language.substring(0, 2).toLowerCase();
                  if (this.available_languages.indexOf(language) != -1) {
                    this.language = language;
                  }
                }
              }
              resolve();
            });
          });
          this.appVersion.getVersionNumber().then(
            (_version) => {
              this.version = _version;
            }
          );
          this.appVersion.getVersionCode().then(
            (_version) => {
              this.build = _version;
            }
          );
        });
      });
    }));
  }

  getFeatureFlag(name: string = null, _default: any = null) {
    if (name == null) {
      return this.feature_flags;
    }
    if (this.feature_flags[name] !== undefined) {
      return this.feature_flags[name];
    }
    return _default;
  }

  setFeatureFlag(name: string, value: any) {
    this.feature_flags[name] = value;
    this.storage.set('feature_flags', this.feature_flags);
  }
}
