import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {ActionsApiProvider} from "../../providers/actions-api/actions-api";
import {NetworkProvider} from "../../modules/hetzner-app/network/network";

/**
 * Generated class for the ActionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-actions',
  templateUrl: 'actions.html',
})
export class ActionsPage {
  /**
   *
   */
  public actions: Array<any>;
  /**
   *
   * @type {boolean}
   */
  public loading: boolean = false;
  /**
   *
   * @type {boolean}
   */
  public loading_done: boolean = false;

  /**
   *
   * @param {NavController} navCtrl
   * @param {NavParams} navParams
   * @param {ActionsApiProvider} actionsApi
   */
  constructor(protected navCtrl: NavController,
              protected navParams: NavParams,
              protected actionsApi: ActionsApiProvider,
              protected network: NetworkProvider) {
    this.loadActions();
  }

  /**
   * Load the Actions frome the API
   */
  loadActions() {
    this.loading = true;
    this.actionsApi.getActions().then((data) => {
      this.actions = data['actions'];
      this.loading = false;
      this.loading_done = true;
      setTimeout(() => this.loading_done = false, 3000);
    })
  }
}
