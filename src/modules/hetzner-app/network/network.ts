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
   * Determine if the app has a network connection or not
   * @type {boolean}
   */
  public has_connection: boolean = false;
  /**
   * The event listener for disconnecting to the network
   * @type {Observable<any>}
   */
  public onDisconnectListener: Observable<any>;
  /**
   * The event listener for connection to the network
   * @type {Observable<any>}
   */
  public onConnectListener: Observable<any>;

  /**
   * Constructor
   * @param {HttpClient} http
   * @param {Network} network
   * @param {TranslateService} translate
   * @param {ConfigService} config
   */
  constructor(protected http: HttpClient, protected network: Network, protected translate: TranslateService, protected config: ConfigService) {
  }

  /**
   * Init all for the network needed
   */
  public init() {
    this.registerListener();
    this.checkIfConnectionIsAvailable();
  }

  /**
   * Performs a basic get call against the hetzner api for checking the network connection
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
   * Register all needed event listener
   */
  protected registerListener() {
    this.onDisconnectListener = this.network.onDisconnect()
    this.onDisconnectListener.subscribe(() => {
      this.has_connection = false;
      this.displayNoNetworkNotice();
    });
    this.onConnectListener = this.network.onConnect();
    this.onConnectListener.subscribe(() => {
      this.has_connection = true;
    })
  }

  /**
   * Displays a translated notice that there is a no connection to the network
   */
  public displayNoNetworkNotice() {
    this.translate.get('GLOBAL.NO_CONNECTION').subscribe((text) => {
      alert(text);
    })
  }

  /**
   * This method quick test the given api key, if the given key is valid
   * @param {string} api_key
   * @returns {Promise<any>}
   */
  public quickTestApiKey(api_key: string) {
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
