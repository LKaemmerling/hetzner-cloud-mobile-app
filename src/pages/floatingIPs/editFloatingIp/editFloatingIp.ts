import {Component} from '@angular/core';
import {ProjectsService} from "../../../models/project/ProjectsService";
import {LoadingController, NavController, NavParams, ViewController} from "ionic-angular";
import {FloatingIpApiProvider} from "../../../providers/floating-ip-api/floating-ip-api";


@Component({
  selector: 'modal-editFloatingIp',
  templateUrl: 'editFloatingIp.html'
})
export class editFloatingIpModal {
  public floatingIp: any;

  constructor(public project: ProjectsService, public viewCtrl: ViewController, public floatingIpProvider: FloatingIpApiProvider, public navParams: NavParams, public navCtrl: NavController, public loadingCtrl: LoadingController) {
    this.floatingIp = navParams.get('floating_ip');
  }


  public updateIP() {
    let loader = this.loadingCtrl.create();
    loader.present();
    this.floatingIpProvider.changeDescription(this.floatingIp.id, this.floatingIp.description).then(() => {
      loader.dismiss();
      this.dismiss();
    });

  }

  public dismiss() {
    this.viewCtrl.dismiss();
  }
}
