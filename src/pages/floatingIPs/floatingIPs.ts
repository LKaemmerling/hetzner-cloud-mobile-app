import {Component} from '@angular/core';
import {ProjectsService} from "../../models/project/ProjectsService";
import {ActionSheetController, ModalController, NavController} from "ionic-angular";

import {addFloatingIPModal} from "./addFloatingIp/addFloatingIP";
import {FloatingIpApiProvider} from "../../providers/floating-ip-api/floating-ip-api";
import {FloatingIPPage} from "./floatingIp/floatingIP";

@Component({
  selector: 'page-floatingIPs',
  templateUrl: 'floatingIPs.html'
})
export class FloatingIPsPage {
  public _floating_ips = [];
  public loading:boolean = false;
  public loading_done:boolean = false;
  constructor(public project: ProjectsService, public modal: ModalController, public floatingIpApiProvider: FloatingIpApiProvider, public navCtrl: NavController, public actionSheetCtrl: ActionSheetController) {
    this.loadFloatingIPs();
  }

  public loadFloatingIPs() {
    this.loading = true;
    this.floatingIpApiProvider.getFloatingIps().then((data) => {
      this._floating_ips = data['floating_ips'];
      this.loading = false;
      this.loading_done = true;
      setTimeout(() => this.loading_done = false,3000);
    });
  }

  openAddFloatingIP() {
    let modal = this.modal.create(addFloatingIPModal);
    modal.onDidDismiss(() => {
      this.loadFloatingIPs();
    });
    modal.present();
  }

  openFloatingIP(floatingIp) {
    this.navCtrl.push(FloatingIPPage, {floating_ip: floatingIp});
  }

  public refresh(refresher) {
    this.loadFloatingIPs();
    refresher.complete();
  }

  public delete(floatingIp) {
    if (confirm('Möchten Sie diese Floating IP wirklich unwiderruflich löschen?')) {
      this.floatingIpApiProvider.deleteFloatingIp(floatingIp.id).then((data) => {
    this.loadFloatingIPs();
      });
    }
  }

  public openActionSheets(floatingIp) {

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
