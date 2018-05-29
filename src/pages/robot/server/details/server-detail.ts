import {Component} from '@angular/core';
import {LoadingController, ModalController, NavParams} from 'ionic-angular';
import {fadeIn, fadeOut} from 'ng-animate';
import {ServerApiProvider} from '../../../../modules/hetzner-robot-api/server-api/server-api';
import {ServerEditModal} from "../edit/server-edit";
import {ServerActionsResetModal} from "../actions/reset/server-actions-reset";
import {TrackingService} from "../../../../modules/hetzner-app/tracking/tracking.service";

/**
 * This is the project page, where you can create, activate, share and delete projects
 */
@Component({
  selector: 'page-server-detail',
  templateUrl: 'server-detail.html',

})
export class ServerDetailPage {
  /**
   * All available servers
   * @type {any[]}
   */
  public server: any;

  /**
   * Is the component in the loading process?
   * @type {boolean}
   */
  public loader: any;

  /**
   * Constructor
   * @param {NavParams} NavParams
   * @param {ServerApiProvider} serverApi
   * @param {LoadingController} loadingCtrl
   * @param {ModalController} modalCtrl
   */
  constructor(
    protected NavParams: NavParams,
    protected serverApi: ServerApiProvider,
    protected loadingCtrl: LoadingController,
    protected modalCtrl: ModalController,
    protected tracking:TrackingService
  ) {
    this.server = this.NavParams.get('server');
    tracking.trackFeature('robot.server.details');
  }

  loadServer() {
    this.loader = this.loadingCtrl.create();
    this.loader.present();
    this.serverApi.getServer(this.server.server_ip).then(val => {
      this.server = val['server'];
      this.loader.dismiss();
    });
  }

  /**
   *
   */
  openEditModal() {
    let modal = this.modalCtrl.create(ServerEditModal, {server: this.server});
    modal.onDidDismiss(() => {
      this.loadServer();
    });
    modal.present();
  }

  openResetModal() {
    let modal = this.modalCtrl.create(ServerActionsResetModal, {server: this.server});
    modal.onDidDismiss(() => {
      this.loadServer();
    });
    modal.present();
  }
}
