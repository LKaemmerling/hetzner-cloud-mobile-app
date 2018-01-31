import {Component} from '@angular/core';
import {ProjectsService} from "../../../models/project/ProjectsService";
import {NavController, NavParams, ViewController} from "ionic-angular";
import {ServerApiProvider} from "../../../providers/server-api/server-api";


@Component({
  selector: 'modal-powerSettings',
  templateUrl: 'powerSettings.html'
})
export class powerSettingsModal {
  public server: any;

  constructor(public project: ProjectsService, public viewCtrl: ViewController, public serverApiProvider: ServerApiProvider, public navParams: NavParams, public navCtrl: NavController) {
    this.server = navParams.get('server');
  }


  public softReboot() {
    this.serverApiProvider.reboot(this.server.id);
    this.viewCtrl.dismiss();
  }

  public reset() {
    this.serverApiProvider.reset(this.server.id);
    this.viewCtrl.dismiss();
  }

  public shutdown() {
    this.serverApiProvider.shutdown(this.server.id);
    this.viewCtrl.dismiss();
  }

  public powerOff() {
    this.serverApiProvider.powerOff(this.server.id);
    this.viewCtrl.dismiss();
  }

  public dismiss() {
    this.viewCtrl.dismiss();
  }
}
