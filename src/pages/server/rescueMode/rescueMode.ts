import {Component} from '@angular/core';
import {ProjectsService} from "../../../models/project/ProjectsService";
import {App, NavController, NavParams, ViewController} from "ionic-angular";
import {ServerApiProvider} from "../../../providers/server-api/server-api";


@Component({
  selector: 'modal-rescueMode',
  templateUrl: 'rescueMode.html'
})
export class rescueModeModal {
  public server: any;

  constructor(public project: ProjectsService, public viewCtrl: ViewController, public serverApiProvider: ServerApiProvider, public navParams: NavParams, public navCtrl: NavController, public appCtrl: App) {
    this.server = navParams.get('server');
  }


  public rescueActivate() {
    this.serverApiProvider.enable_rescue(this.server.id);
    this.viewCtrl.dismiss();
  }

  public rescueActivateAndReset() {
    this.serverApiProvider.enable_rescue(this.server.id);
    this.serverApiProvider.reset(this.server.id);
    this.viewCtrl.dismiss();
  }

  public resetRootpassword() {
    this.serverApiProvider.resetPassword(this.server.id);
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
