import {Component} from '@angular/core';
import {ProjectsService} from "../../../models/project/ProjectsService";
import {LoadingController, NavController, NavParams, ViewController} from "ionic-angular";
import {ServerApiProvider} from "../../../providers/server-api/server-api";


@Component({
  selector: 'modal-powerSettings',
  templateUrl: 'powerSettings.html'
})
export class powerSettingsModal {
  public server: any;

  constructor(public project: ProjectsService, public viewCtrl: ViewController, public serverApiProvider: ServerApiProvider, public navParams: NavParams, public navCtrl: NavController, public loadingCtrl: LoadingController) {
    this.server = navParams.get('server');
  }


  public softReboot() {
    var loader = this.loadingCtrl.create();
    loader.present();
    this.serverApiProvider.reboot(this.server.id).then(() => {
      loader.dismiss();
      this.dismiss();
    });

  }

  public reset() {
    var loader = this.loadingCtrl.create();
    loader.present();
    this.serverApiProvider.reset(this.server.id).then(() => {
      loader.dismiss();
      this.dismiss();
    });

  }

  public shutdown() {
    var loader = this.loadingCtrl.create();
    loader.present();
    this.serverApiProvider.shutdown(this.server.id).then(() => {
      loader.dismiss();
      this.dismiss();
    });

  }

  public powerOff() {
    var loader = this.loadingCtrl.create();
    loader.present();
    this.serverApiProvider.powerOff(this.server.id).then(() => {
      loader.dismiss();
      this.dismiss();
    });

  }

  public dismiss() {
    this.viewCtrl.dismiss();
  }
}
