import {Injectable} from '@angular/core';
import {Storage} from "@ionic/storage";
import {AppVersion} from "@ionic-native/app-version";
import {Platform} from "ionic-angular";
import {Pro} from "@ionic/pro";

/**
 * This service contain all configuration for the app, like the api_url or other tings.
 */
@Injectable()
export class ConfigService {

  public device_id: string = '';
  /**
   * The current version String
   * @type {string}
   */
  public version = '2.2.0';
  public build = '0000001';
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
  };
  public deployChannel = "";
  public branch = 'Production';
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
    robot: true,
    robot_orders_test: false,
    cloud_status: false,
    tracking: true,
    dark_design: false
  };
  public remoteFeatureFlags = [];
  /**
   *
   * @type {boolean}
   */
  public runs_on_device = false;
  public downloadProgress = 0;

  /**
   * Constructor
   * @param {Storage} storage
   * @param {AppVersion} appVersion
   */
  constructor(protected storage: Storage, public appVersion: AppVersion, protected platform: Platform) {
    this.checkChannel();
  }


  async checkChannel() {
    try {
      const res = await Pro.deploy.info();
      this.deployChannel = res.channel;
      this.branch = this.deployChannel;
    } catch (err) {
      // We encountered an error.
      // Here's how we would log it to Ionic Pro Monitoring while also catching:

      // Pro.monitoring.exception(err);
    }
  }

  async toggleBeta() {
    const config = {
      appId: '359b3ec5',
      channel: this.branch
    }

    try {
      await Pro.deploy.init(config);
      await this.checkChannel();
      await this.performAutomaticUpdate(); // Alternatively, to customize how this works, use performManualUpdate()
    } catch (err) {
      // We encountered an error.
      // Here's how we would log it to Ionic Pro Monitoring while also catching:

      // Pro.monitoring.exception(err);
    }

  }

  async performAutomaticUpdate() {

    /*
      This code performs an entire Check, Download, Extract, Redirect flow for
      you so you don't have to program the entire flow yourself. This should
      work for a majority of use cases.
    */

    try {
      const resp = await Pro.deploy.checkAndApply(true, progress => {
        this.downloadProgress = progress;
      });

      if (resp.update) {
        // We found an update, and are in process of redirecting you since you put true!
      } else {
        // No update available
      }
    } catch (err) {
      // We encountered an error.
      // Here's how we would log it to Ionic Pro Monitoring while also catching:

      // Pro.monitoring.exception(err);
    }
  }

  /**
   * Load the configuration from the storage
   */
  public init() {
    return new Promise((resolve => {
      if (this.platform.is('ios') == false && this.platform.is('android') == false) {
        // if(true == true){
        this.robot_api_url = 'http://localhost:8100/robot';
        this.runs_on_device = false;
      } else {
        this.runs_on_device = true;
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
                } else {
                  this.language = 'en';
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
      this.platform.setUserAgent("My Hetzner" + this.version + ' Build ' + this.build);
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

  getRemoteFeatureFlag(key: string = null, _default: any = null) {
    if (key == null) {
      return this.remoteFeatureFlags;
    }
    if (this.remoteFeatureFlags[key] !== undefined) {
      return this.remoteFeatureFlags[key].value;
    }
    return _default;
  }

  setRemoteFeatureFlag(data: any) {
    this.remoteFeatureFlags[data.key] = data;
  }
}
