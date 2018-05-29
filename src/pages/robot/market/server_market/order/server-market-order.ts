import {Component} from '@angular/core';
import {ActionSheetController, ModalController, NavController, NavParams} from 'ionic-angular';
import {TranslateService} from '@ngx-translate/core';
import {SshKeysService} from "../../../../../modules/hetzner-robot-data/ssh-keys/ssh-keys.service";
import {NetworkProvider} from "../../../../../modules/hetzner-app/network/network";
import {MarketApiProvider} from "../../../../../modules/hetzner-robot-api/market-api/market-api";
import {ConfigService} from "../../../../../modules/hetzner-app/config/config.service";
import {TrackingService} from "../../../../../modules/hetzner-app/tracking/tracking.service";

/**
 * This page lists all ssh keys
 */

@Component({
  selector: 'page-server-market-order',
  templateUrl: 'server-market-order.html',
})
export class ServerMarketOrderPage {
  /**
   * All available ssh keys
   * @type {any[]}
   */
  public product: any;

  public ssh_keys: any = [];

  public selected_keys: any = [];

  public loading: boolean = false;
  public order_success: number = 0;

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
    protected config: ConfigService,
    protected tracking: TrackingService
  ) {
    this.ssh_keys = this.sshKeysService.ssh_keys;
    tracking.trackFeature('robot.server_market.order');
    this.serverMarketApi.marketProduct(this.navParams.get('product_id')).then((val) => {
      this.product = val['product'];
      this.loading = true;
    })
  }

  /**
   * Load all ssh keys from the service
   */
  doOrder() {
    let _confirmation = '';
    this.translate.get('ROBOT.PAGE.ORDER_SERVER_MARKET.CONFIRMATION').subscribe(text => {
      _confirmation = text;
    });
    if (confirm(_confirmation)) {
      this.order_success = -1;
      this.serverMarketApi.orderMarket(this.product.id, this.selected_keys, '', '', '', '', this.config.getFeatureFlag('robot_orders_test', false)).then((data) => {
        this.order_success = 1;
        this.loading = false;
      });
    }
  }

}
