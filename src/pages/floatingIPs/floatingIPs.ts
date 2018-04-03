import {Component} from '@angular/core';
import {ProjectsService} from "../../modules/hetzner-cloud-data/project/projects.service";
import {ActionSheetController, ModalController, NavController} from "ionic-angular";

import {addFloatingIPModal} from "./addFloatingIp/addFloatingIP";
import {FloatingIpApiProvider} from "../../providers/floating-ip-api/floating-ip-api";
import {FloatingIPPage} from "./floatingIp/floatingIP";
import {FloatingIpsService} from "../../modules/hetzner-cloud-data/floating-ips/floating-ips.service";
import {NetworkProvider} from "../../modules/hetzner-app/network/network";

@Component({
  selector: 'page-floatingIPs',
  templateUrl: 'floatingIPs.html'
})
export class FloatingIPsPage {
  /**
   *
   * @type {any[]}
   */
  public _floating_ips = [];
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
   * @param {ActionSheetController} actionSheetCtrl
   * @param {NavController} navCtrl
   * @param {ModalController} modal
   * @param {ProjectsService} project
   * @param {FloatingIpsService} floatingApiService
   * @param {FloatingIpApiProvider} floatingIpApiProvider
   * @param {NetworkProvider} networkProvider
   */
  constructor(
    protected actionSheetCtrl: ActionSheetController,
    protected navCtrl: NavController,
    protected modal: ModalController,
    protected project: ProjectsService,
    protected floatingApiService: FloatingIpsService,
    protected floatingIpApiProvider: FloatingIpApiProvider,
    protected networkProvider: NetworkProvider
  ) {
    this
      ._floating_ips = this.floatingApiService.floating_ips;
  }

  /**
   *
   */
  loadFloatingIPs() {
    this.loading = true;
    this.floatingApiService.reloadFloatingIps().then((data) => {
      this._floating_ips = data['floating_ips'];
      this.loading = false;
      this.loading_done = true;
      setTimeout(() => this.loading_done = false, 3000);
    });
  }

  /**
   *
   */
  openAddFloatingIP() {
    if (this.networkProvider.has_connection) {
      let modal = this.modal.create(addFloatingIPModal);
      modal.onDidDismiss(() => {
        this.loadFloatingIPs();
      });
      modal.present();
    } else {
      this.networkProvider.displayNoNetworkNotice();
    }
  }

  /**
   *
   * @param floatingIp
   */
  openFloatingIP(floatingIp) {
    this.navCtrl.push(FloatingIPPage, {floating_ip: floatingIp});
  }

  /**
   *
   * @param floatingIp
   */
  public delete(floatingIp) {
    /** @TODO **/
    if (this.networkProvider.has_connection) {
      if (confirm('Möchten Sie diese Floating IP wirklich unwiderruflich löschen?')) {
        this.floatingIpApiProvider.deleteFloatingIp(floatingIp.id).then((data) => {
          this.loadFloatingIPs();
        });
      }
    } else {
      this.networkProvider.displayNoNetworkNotice();
    }
  }

  /**
   *
   * @param floatingIp
   */
  public openActionSheets(floatingIp) {
    /** @TODO **/
    var actions = {
      title: 'Aktionen für die Floating IP ' + floatingIp.name,
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: 'Löschen',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            this.delete(floatingIp);
          }
        },
        {
          text: 'Edit',
          icon: 'brush',
          handler: () => {
            this.openFloatingIP(floatingIp);
          }
        },
        {
          text: 'Abbrechen',
          role: 'cancel', // will always sort to be on the bottom
          icon: 'close',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    }
    let actionSheet = this.actionSheetCtrl.create(actions);
    actionSheet.present();
  }
}
