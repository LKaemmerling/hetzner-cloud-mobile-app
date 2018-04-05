import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {ActionsApiProvider} from "../../providers/actions-api/actions-api";
import {NetworkProvider} from "../../modules/hetzner-app/network/network";

/**
 * This page displays all actions from the selected project
 */
@Component({
  selector: 'page-actions',
  templateUrl: 'actions.html',
})
export class ActionsPage {
  /**
   * All actions
   */
  public actions: Array<any>;
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
   * @param {ActionsApiProvider} actionsApi
   * @param {NetworkProvider} network
   */
  constructor(protected navCtrl: NavController,
              protected navParams: NavParams,
              protected actionsApi: ActionsApiProvider,
              protected network: NetworkProvider) {
    this.loadActions();
  }

  /**
   * Load the Actions from the API
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
