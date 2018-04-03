import {Component} from '@angular/core';

import {LoadingController, ModalController, NavController, NavParams} from "ionic-angular";
import {ProjectsService} from "../../../modules/hetzner-cloud-data/project/projects.service";
import {FloatingIpApiProvider} from "../../../providers/floating-ip-api/floating-ip-api";
import {editFloatingIpModal} from "../editFloatingIp/editFloatingIp";
import {ServerApiProvider} from "../../../providers/server-api/server-api";
import {ServerPage} from "../../server/server";
import {FloatingIPsPage} from "../floatingIPs";
import {changeIPv4ReverseDNSModal} from "../../server/reverseDNS/ipv4/changeIPv4ReverseDNSModal";
import {assignToServerModal} from "../assignToServer/assignToServer";
import {TranslateService} from "@ngx-translate/core";
import {NetworkProvider} from "../../../modules/hetzner-app/network/network";
import {Server} from "../../../modules/hetzner-cloud-data/servers/server";

@Component({
  selector: 'page-floatingIP',
  templateUrl: 'floatingIP.html'
})
export class FloatingIPPage {
  /**
   *
   */
  public floating_ip: any;
  /**
   *
   * @type {Server}
   */
  public server: Server = null;

  /**
   *
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
    protected networkProvider: NetworkProvider) {
    this.floating_ip = navParams.get('floating_ip');
    if (this.floating_ip.server !== null) {
      this.serverApiProvider.getServer(this.floating_ip.server).then((data) => {
        this.server = data['server']
      });
    }
  }

  /**
   *
   * @param refresher
   */
  public refresh() {
    if (this.floating_ip.server !== null) {
      this.serverApiProvider.getServer(this.floating_ip.server).then((data) => {
        this.server = data['server']
      });
    }
  };

  /**
   *
   * @param {Server} server
   */
  openServer(server: Server) {
    this.navCtrl.push(ServerPage, {server: server});
  }

  /**
   *
   */
  openEditFloatingIp() {
    if (this.networkProvider.has_connection) {
      this.modal.create(editFloatingIpModal, {floating_ip: this.floating_ip}).present();
    } else {
      this.networkProvider.displayNoNetworkNotice();
    }
  }

  /**
   *
   */
  openAssignToServer() {
    if (this.networkProvider.has_connection) {
      this.modal.create(assignToServerModal, {floating_ip: this.floating_ip}).present();
    } else {
      this.networkProvider.displayNoNetworkNotice();
    }

  }

  /**
   *
   */
  changeIPv4ReverseDNSModal() {
    if (this.networkProvider.has_connection) {

      this.modal.create(changeIPv4ReverseDNSModal, {server: this.server}).present();
    } else {
      this.networkProvider.displayNoNetworkNotice();
    }

  }

  /**
   *
   */
  changeIPv6ReverseDNSModal() {
    if (this.networkProvider.has_connection) {

      this.modal.create(this.changeIPv6ReverseDNSModal(), {server: this.server}).present();
    } else {
      this.networkProvider.displayNoNetworkNotice();
    }
  }

  /**
   *
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
        this.floatingIpApiProvider.deleteFloatingIp(this.floating_ip.id).then((data) => {
          loader.dismiss();
          this.navCtrl.setRoot(FloatingIPsPage);
        });
      }
    } else {
      this.networkProvider.displayNoNetworkNotice();
    }
  }

  /**
   *
   */
  unassign() {
    if (this.networkProvider.has_connection) {

      let _delete_confirmation: string = '';
      this.translate.get('PAGE.FLOATING_IPS.MODAL.DETAILS.ACTIONS.DELETE_ASSIGNMENT_CONFIRMATION').subscribe(text => {
        _delete_confirmation = text;
      });
      if (confirm(_delete_confirmation)) {
        let loader = this.loadingCtrl.create();
        loader.present();
        this.floatingIpApiProvider.unassign(this.floating_ip.id).then((data) => {
          loader.dismiss();
        });
      }

    } else {
      this.networkProvider.displayNoNetworkNotice();
    }
  }
}
