import {Component} from '@angular/core';
import {ProjectsService} from "../../../modules/hetzner-cloud-data/project/projects.service";
import {LoadingController, NavController, NavParams, ViewController} from "ionic-angular";
import {FloatingIpApiProvider} from "../../../providers/floating-ip-api/floating-ip-api";
import {ServerApiProvider} from "../../../providers/server-api/server-api";


@Component({
  selector: 'modal-assignToServer',
  templateUrl: 'assignToServer.html'
})
export class assignToServerModal {
  public floatingIp: any;
  public servers: Array<any> = null;

  constructor(public project: ProjectsService, public viewCtrl: ViewController, public floatingIpProvider: FloatingIpApiProvider, public navParams: NavParams, public navCtrl: NavController, public loadingCtrl: LoadingController, public serverApiProvider: ServerApiProvider) {
    this.floatingIp = navParams.get('floating_ip');
    this.serverApiProvider.getServers().then((data) => {
      this.servers = data['servers'];
    })
  }


  public assignToServer() {
    let loader = this.loadingCtrl.create();
    loader.present();
    this.floatingIpProvider.assignToServer(this.floatingIp.id, this.floatingIp.server).then(() => {
      loader.dismiss();
      this.dismiss();
    });

  }

  public dismiss() {
    this.viewCtrl.dismiss();
  }
}
