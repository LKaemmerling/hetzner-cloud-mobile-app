import {Component} from '@angular/core';

import {LoadingController, ModalController, NavController, NavParams} from 'ionic-angular';
import {ProjectsService} from '../../../../modules/hetzner-cloud-data/project/projects.service';
import {FloatingIpApiProvider} from '../../../../modules/hetzner-cloud-api/floating-ip-api/floating-ip-api';
import {editFloatingIpModal} from '../editFloatingIp/editFloatingIp';
import {ServerApiProvider} from '../../../../modules/hetzner-cloud-api/server-api/server-api';
import {FloatingIPsPage} from '../floatingIPs';
import {changeIPv4ReverseDNSModal} from '../../server/reverseDNS/ipv4/changeIPv4ReverseDNSModal';
import {assignToServerModal} from '../assignToServer/assignToServer';
import {TranslateService} from '@ngx-translate/core';
import {NetworkProvider} from '../../../../modules/hetzner-app/network/network';
import {Server} from '../../../../modules/hetzner-cloud-data/servers/server';
import {TrackingService} from "../../../../modules/hetzner-app/tracking/tracking.service";
import {ServerDetailsPage} from "../../server/details/server-details";

/**
 * This page displays all informations about a given floating ip
 */
@Component({
  selector: 'page-floatingIP',
  templateUrl: 'floatingIP.html',
})
export class FloatingIPPage {
  /**
   * The given floating IP
   */
  public floating_ip: any;
  /**
   * The server that is connected with the floating ip - cloud be null
   * @type {Server}
   */
  public server: Server = null;

  /**
   * Constructor
   * @param {LoadingController} loadingCtrl
   * @param {ModalController} modal
   * @param {NavController} navCtrl
   * @param {ProjectsService} project
   * @param {NavParams} navParams
   * @param {TranslateService} translate
   * @param {FloatingIpApiProvider} floatingIpApiProvider
   * @param {ServerApiProvider} serverApiProvider
   * @param {NetworkProvider} networkProvider
   */
  constructor(
    protected loadingCtrl: LoadingController,
    protected modal: ModalController,
    protected navCtrl: NavController,
    protected project: ProjectsService,
    protected navParams: NavParams,
    protected translate: TranslateService,
    protected floatingIpApiProvider: FloatingIpApiProvider,
    protected serverApiProvider: ServerApiProvider,
    protected networkProvider: NetworkProvider,
    protected tracking: TrackingService
  ) {
    this.floating_ip = navParams.get('floating_ip');
    tracking.trackFeature('cloud.floating_ips.details');
    if (this.floating_ip.server !== null) {
      this.serverApiProvider.getServer(this.floating_ip.server).then(data => {
        this.server = data['server'];
      });
    }
  }

  /**
   * Reload the server from the API
   * @param refresher
   */
  public refresh() {
    if (this.floating_ip.server !== null) {
      this.serverApiProvider.getServer(this.floating_ip.server).then(data => {
        this.server = data['server'];
      });
    }
  }

  /**
   * Open the details of the server
   * @param {Server} server
   */
  openServer(server: Server) {
    this.navCtrl.push(ServerDetailsPage, {server: server});
  }

  /**
   * Open the edit modal for the floating ip
   */
  openEditFloatingIp() {
    if (this.networkProvider.has_connection) {
      this.modal.create(editFloatingIpModal, {floating_ip: this.floating_ip}).present();
    } else {
      this.networkProvider.displayNoNetworkNotice();
    }
  }

  /**
   * Open the assign modal
   */
  openAssignToServer() {
    if (this.networkProvider.has_connection) {
      this.modal.create(assignToServerModal, {floating_ip: this.floating_ip}).present();
    } else {
      this.networkProvider.displayNoNetworkNotice();
    }
  }

  /**
   * Open the ipv4 reverse dns change modal
   */
  changeIPv4ReverseDNSModal() {
    if (this.networkProvider.has_connection) {
      this.modal.create(changeIPv4ReverseDNSModal, {server: this.server}).present();
    } else {
      this.networkProvider.displayNoNetworkNotice();
    }
  }

  /**
   * Open the ipv6 reverse dns change modal
   */
  changeIPv6ReverseDNSModal() {
    if (this.networkProvider.has_connection) {
      this.modal.create(this.changeIPv6ReverseDNSModal(), {server: this.server}).present();
    } else {
      this.networkProvider.displayNoNetworkNotice();
    }
  }

  /**
   * Delete the floating ip
   */
  delete() {
    if (this.networkProvider.has_connection) {
      let _delete_confirmation: string = '';
      this.translate.get('ACTIONS.DELETE_CONFIRMATION').subscribe(text => {
        _delete_confirmation = text;
      });
      if (confirm(_delete_confirmation)) {
        let loader = this.loadingCtrl.create();
        loader.present();
        this.floatingIpApiProvider.deleteFloatingIp(this.floating_ip.id).then(data => {
          loader.dismiss();
          this.navCtrl.setRoot(FloatingIPsPage);
        });
      }
    } else {
      this.networkProvider.displayNoNetworkNotice();
    }
  }

  /**
   * Unassign the floating ip from all servers
   */
  unassign() {
    if (this.networkProvider.has_connection) {
      let _delete_confirmation: string = '';
      this.translate
        .get('PAGE.FLOATING_IPS.MODAL.DETAILS.ACTIONS.DELETE_ASSIGNMENT_CONFIRMATION')
        .subscribe(text => {
          _delete_confirmation = text;
        });
      if (confirm(_delete_confirmation)) {
        let loader = this.loadingCtrl.create();
        loader.present();
        this.floatingIpApiProvider.unassign(this.floating_ip.id).then(data => {
          loader.dismiss();
        });
      }
    } else {
      this.networkProvider.displayNoNetworkNotice();
    }
  }
}
