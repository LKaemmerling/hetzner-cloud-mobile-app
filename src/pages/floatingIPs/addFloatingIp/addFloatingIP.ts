import {Component} from '@angular/core';
import {ProjectsService} from "../../../models/project/ProjectsService";
import {LoadingController, ViewController} from "ionic-angular";
import {FloatingIpApiProvider} from "../../../providers/floating-ip-api/floating-ip-api";
import {ServerApiProvider} from "../../../providers/server-api/server-api";

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

  constructor(public project: ProjectsService, public viewCtrl: ViewController, public floatingIpApiProvider: FloatingIpApiProvider, public serverApiProvider: ServerApiProvider, public loadingCtrl: LoadingController) {
    this.serverApiProvider.getServers().then((data) => {
      this.servers = data['servers'];
    });
  }

  public createFloatingIP() {
    this.error = null;
    if (this.description == null || this.description.length == 0) {
      this.error = 'Bitte geben Sie einen Namen ein.';
      return;
    }
    if (this.server == null || this.server.id == 0) {
      this.error = 'Bitte wählen Sie einen Server aus.';
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
