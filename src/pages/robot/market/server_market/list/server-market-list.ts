import {Component} from '@angular/core';
import {ActionSheetController, ModalController, NavController, NavParams} from 'ionic-angular';
import {TranslateService} from '@ngx-translate/core';
import {SshKeysService} from "../../../../../modules/hetzner-robot-data/ssh-keys/ssh-keys.service";
import {NetworkProvider} from "../../../../../modules/hetzner-app/network/network";
import {MarketApiProvider} from "../../../../../modules/hetzner-robot-api/market-api/market-api";
import {ServerMarketOrderPage} from "../order/server-market-order";
import {TrackingService} from "../../../../../modules/hetzner-app/tracking/tracking.service";

/**
 * This page lists all ssh keys
 */

@Component({
  selector: 'page-server-market-list',
  templateUrl: 'server-market-list.html',
})
export class ServerMarketListPage {
  /**
   * All available ssh keys
   * @type {any[]}
   */
  public market_entries: any = [];

  public search: string = '';

  public _search: any = [];
  /**
   * Is the component in the loading process?
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
   * @param {ActionSheetController} actionSheetCtrl
   * @param {ModalController} modalCtrl
   * @param {NavController} navCtrl
   * @param {NavParams} navParams
   * @param {SshKeysService} sshKeysService
   * @param {TranslateService} translate
   * @param {SshKeyApiProvider} sshKeyProvider
   * @param {NetworkProvider} networkProvider
   */
  constructor(
    protected actionSheetCtrl: ActionSheetController,
    protected modalCtrl: ModalController,
    protected navCtrl: NavController,
    protected navParams: NavParams,
    protected sshKeysService: SshKeysService,
    protected translate: TranslateService,
    protected networkProvider: NetworkProvider,
    protected serverMarketApi: MarketApiProvider,
    protected tracking: TrackingService
  ) {
    tracking.trackFeature('robot.server_market.list');
  }

  /**
   * Load all ssh keys from the service
   */
  loadServers() {
    this.loading = true;
    this.serverMarketApi.market(this.search).then((data) => {
      this._search = this.market_entries = data;
      this.loading = false;
      this.loading_done = true;
      setTimeout(() => (this.loading_done = false), 3000);
    });
  }


  /**
   * Search of a string in the server name
   * @param ev
   */
  doSearch(ev) {
    // Reset items back to all of the items
    this._search = this.market_entries;
    // set val to the value of the ev target
    var val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this._search = this.market_entries.filter(item => {
        if (item == null) {
          return false;
        }
        return item.product.description.join(' ').toLowerCase().indexOf(val.toLowerCase()) > -1;
      });
    }
  }

  /**
   * Event fires when the view will be enterd
   */
  public ionViewWillEnter() {
    this.loadServers();
  }


  public openOrder(market_entry) {
    this.navCtrl.push(ServerMarketOrderPage, {'product_id': market_entry.id})
  }
}
