import {Component} from '@angular/core';
import {ProjectsService} from "../../../modules/hetzner-cloud-data/project/projects.service";
import {LoadingController, ViewController} from "ionic-angular";
import {FloatingIpApiProvider} from "../../../providers/floating-ip-api/floating-ip-api";
import {ServerApiProvider} from "../../../providers/server-api/server-api";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'modal-addFloatingIP',
  templateUrl: 'addFloatingIP.html'
})
export class addFloatingIPModal {
  public type;
  public server;
  public description;
  public servers;

  public error: string = null;

  constructor(public project: ProjectsService, public viewCtrl: ViewController, public floatingIpApiProvider: FloatingIpApiProvider, public serverApiProvider: ServerApiProvider, public loadingCtrl: LoadingController, protected translate: TranslateService) {
    this.serverApiProvider.getServers().then((data) => {
      this.servers = data['servers'];
    });
  }

  public createFloatingIP() {
    this.error = null;
    if (this.description == null || this.description.length == 0) {
      this.error = 'PAGE.FLOATING_IPS.MODAL.ADD.ERRORS.REQUIRED_DESCRIPTION';
      return;
    }
    if (this.type == null || this.type.length == 0) {
      this.error = 'PAGE.FLOATING_IPS.MODAL.ADD.ERRORS.REQUIRED_NETWORK_PROTOCOL';
      return;
    }
    if (this.server == null || this.server.id == 0) {
      this.error = 'PAGE.FLOATING_IPS.MODAL.ADD.ERRORS.REQUIRED_SERVER';
      return;
    }
    let loader = this.loadingCtrl.create();
    loader.present();
    this.floatingIpApiProvider.createFloatingIp(this.type, this.description, this.server.id).then((data) => {
      this.dismiss();
      loader.dismiss();
    });

  }

  public dismiss() {
    this.viewCtrl.dismiss();
  }
}
