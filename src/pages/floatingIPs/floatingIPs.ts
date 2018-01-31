import {Component} from '@angular/core';
import {ProjectsService} from "../../models/project/ProjectsService";
import {ItemSliding, ModalController} from "ionic-angular";

import {addFloatingIPModal} from "./addFloatingIp/addFloatingIP";
import {FloatingIpApiProvider} from "../../providers/floating-ip-api/floating-ip-api";

@Component({
  selector: 'page-floatingIPs',
  templateUrl: 'floatingIPs.html'
})
export class FloatingIPsPage {
  public _floating_ips = [];

  constructor(public project: ProjectsService, public modal: ModalController, public floatingIpApiProvider: FloatingIpApiProvider) {
    this.loadFloatingIPs();
  }

  public loadFloatingIPs() {
    this.floatingIpApiProvider.getFloatingIps().then((data) => {
      this._floating_ips = data['floating_ips'];
    });
  }

  openAddFloatingIP() {
    this.modal.create(addFloatingIPModal).present();
  }

  public refresh(refresher) {
    this.loadFloatingIPs();
    refresher.complete();
  }

  public delete(floatingIp, slidingItem: ItemSliding) {
    if (confirm('Möchten Sie diese Floating IP wirklich unwideruflich löschen?')) {
      this.floatingIpApiProvider.deleteFloatingIp(floatingIp.id).then((data) => {
        slidingItem.close();
      });
    }
  }
}
