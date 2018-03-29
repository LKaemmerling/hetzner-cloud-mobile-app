import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Network} from "@ionic-native/network";
import {Observable} from "rxjs/Observable";
import {TranslateService} from "@ngx-translate/core";

/*
  Generated class for the NetworkProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
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
   */
  constructor(public http: HttpClient, protected network: Network, protected translate: TranslateService) {
  }

  public init() {
    this.registerListener();
    this.checkIfConnectionIsAvailable();
  }

  /**
   *
   */
  public checkIfConnectionIsAvailable() {
    this.http.get('https://api.hetzner.cloud').subscribe(data => {
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
}
