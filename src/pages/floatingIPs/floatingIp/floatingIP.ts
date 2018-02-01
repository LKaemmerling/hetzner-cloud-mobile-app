import {Component} from '@angular/core';

import {LoadingController, ModalController, NavController, NavParams} from "ionic-angular";
import {ProjectsService} from "../../../models/project/ProjectsService";
import {FloatingIpApiProvider} from "../../../providers/floating-ip-api/floating-ip-api";
import {editFloatingIpModal} from "../editFloatingIp/editFloatingIp";
import {ServerApiProvider} from "../../../providers/server-api/server-api";
import {ServerPage} from "../../server/server";
import {FloatingIPsPage} from "../floatingIPs";
import {changeIPv4ReverseDNSModal} from "../../server/reverseDNS/ipv4/changeIPv4ReverseDNSModal";
import {assignToServerModal} from "../assignToServer/assignToServer";

@Component({
  selector: 'page-floatingIP',
  templateUrl: 'floatingIP.html'
})
export class FloatingIPPage {
  public floating_ip: any;
  public server: any = null;

  constructor(public project: ProjectsService, public modal: ModalController, public floatingIpApiProvider: FloatingIpApiProvider, navParams: NavParams, public serverApiProvider: ServerApiProvider, public navCtrl: NavController, public loadingCtrl: LoadingController, public modalCtrl: ModalController) {
    this.floating_ip = navParams.get('floating_ip');
    if (this.floating_ip.server !== null) {
      this.serverApiProvider.getServer(this.floating_ip.server).then((data) => {
        this.server = data['server']
      });
    }
  }

  public refresh(refresher) {
    if (this.floating_ip.server !== null) {
      this.serverApiProvider.getServer(this.floating_ip.server).then((data) => {
        this.server = data['server']
        refresher.complete();
      });
    }
  };

  public openServer(server) {
    this.navCtrl.push(ServerPage, {server: server});
  }

  public openEditFloatingIp() {
    this.modal.create(editFloatingIpModal, {floating_ip: this.floating_ip}).present();
  }

  public openAssignToServer() {
    this.modal.create(assignToServerModal, {floating_ip: this.floating_ip}).present();
  }

  public changeIPv4ReverseDNSModal() {
    this.modalCtrl.create(changeIPv4ReverseDNSModal, {server: this.server}).present();
  }

  public changeIPv6ReverseDNSModal() {
    this.modalCtrl.create(this.changeIPv6ReverseDNSModal(), {server: this.server}).present();
  }

  public delete() {
    if (confirm('Möchten Sie diese Floating IP wirklich unwideruflich löschen?')) {
      let loader = this.loadingCtrl.create();
      loader.present();
      this.floatingIpApiProvider.deleteFloatingIp(this.floating_ip.id).then((data) => {
        loader.dismiss();
        this.navCtrl.setRoot(FloatingIPsPage);
      });
    }
  }

  public unassign() {
    if (confirm('Möchten Sie diese Floating IP wirklich keinem Server zuweisen? Der Server wird dadurch unter dieser IP nicht mehr erreichbar.')) {
      let loader = this.loadingCtrl.create();
      loader.present();
      this.floatingIpApiProvider.unassign(this.floating_ip.id).then((data) => {
        loader.dismiss();
      });
    }
  }
}
