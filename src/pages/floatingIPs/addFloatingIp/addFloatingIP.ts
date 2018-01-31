import {Component} from '@angular/core';
import {ProjectsService} from "../../../models/project/ProjectsService";
import {ViewController} from "ionic-angular";
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

  constructor(public project: ProjectsService, public viewCtrl: ViewController, public floatingIpApiProvider: FloatingIpApiProvider, public serverApiProvider: ServerApiProvider) {
    this.serverApiProvider.getServers().then((data) => {
      this.servers = data['servers'];
    });
  }

  public createFloatingIP() {
    this.floatingIpApiProvider.createFloatingIp(this.type, this.description, this.server.id).then((data) => {
      this.dismiss();
    });

  }

  public dismiss() {
    this.viewCtrl.dismiss();
  }
}
