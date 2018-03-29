import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Network} from "@ionic-native/network";
import {Observable} from "rxjs/Observable";
import {TranslateService} from "@ngx-translate/core";
import {ConfigService} from "../config/config.service";

/**
 * This Provider contains all logic for the network available info like "app has connection"
 */
@Injectable()
export class NetworkProvider {
  /**
   *
   * @type {boolean}
   */
  public has_connection: boolean = false;
  /**
   * @type {Observable<any>}
   */
  public onDisconnectListener: Observable<any>;
  /**
   * @type {Observable<any>}
   */
  public onConnectListener: Observable<any>;

  /**
   *
   * @param {HttpClient} http
   * @param {Network} network
   * @param {TranslateService} translate
   * @param {ConfigService} config
   */
  constructor(protected http: HttpClient, protected network: Network, protected translate: TranslateService, protected config: ConfigService) {
  }

  /**
   *
   */
  public init() {
    this.registerListener();
    this.checkIfConnectionIsAvailable();
  }

  /**
   *
   */
  public checkIfConnectionIsAvailable() {
    this.http.get(this.config.api_url).subscribe(data => {
      this.has_connection = true;
    }, err => {
      if (err.error.error.code == "not_found") {
        this.has_connection = true;
      } else {
        this.has_connection = false;
      }

    });
  }

  /**
   *
   */
  protected registerListener() {
    this.onDisconnectListener = this.network.onDisconnect()
    this.onDisconnectListener.subscribe(() => {
      this.has_connection = false;
      this.translate.get('GLOBAL.NO_CONNECTION').subscribe((text) => {
        confirm(text);
      })
    });
    this.onConnectListener = this.network.onConnect();
    this.onConnectListener.subscribe(() => {
      this.has_connection = true;
    })
  }

  /**
   *
   * @param api_key
   * @returns {Promise<any>}
   */
  public quickTestApiKey(api_key) {
    return new Promise((resolve, reject) => {
      this.http.get(this.config.api_url + '/locations', {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + api_key)
      }).subscribe(data => {
        resolve();
      }, err => {
        reject();
      });
    });
  }
}
