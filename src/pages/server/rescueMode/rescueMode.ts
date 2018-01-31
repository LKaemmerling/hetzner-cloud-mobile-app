import {Component} from '@angular/core';
import {ProjectsService} from "../../../models/project/ProjectsService";
import {App, NavController, NavParams, ViewController} from "ionic-angular";
import {RestProvider} from "../../../providers/rest/rest";


@Component({
  selector: 'modal-rescueMode',
  templateUrl: 'rescueMode.html'
})
export class rescueModeModal {
  public server: any;

  constructor(public project: ProjectsService, public viewCtrl: ViewController, public rest: RestProvider, public navParams: NavParams, public navCtrl: NavController, public appCtrl: App) {
    this.server = navParams.get('server');
  }


  public rescueActivate() {
    this.rest.enable_rescue(this.server.id);
    this.viewCtrl.dismiss();
  }

  public rescueActivateAndReset() {
    this.rest.enable_rescue(this.server.id);
    this.rest.reset(this.server.id);
    this.viewCtrl.dismiss();
  }

  public resetRootpassword() {
    this.rest.resetPassword(this.server.id);
    this.viewCtrl.dismiss();
  }

  public powerOff() {
    this.rest.powerOff(this.server.id);
    this.viewCtrl.dismiss();
  }

  public dismiss() {
    this.viewCtrl.dismiss();
  }
}
