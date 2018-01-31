import {Component} from '@angular/core';
import {ProjectsService} from "../../../models/project/ProjectsService";
import {App, NavController, NavParams, ViewController} from "ionic-angular";
import {RestProvider} from "../../../providers/rest/rest";


@Component({
  selector: 'modal-powerSettings',
  templateUrl: 'powerSettings.html'
})
export class powerSettingsModal {
  public server: any;

  constructor(public project: ProjectsService, public viewCtrl: ViewController, public rest: RestProvider, public navParams: NavParams, public navCtrl: NavController, public appCtrl: App) {
    this.server = navParams.get('server');
  }


  public softReboot() {
    this.rest.reboot(this.server.id);
    this.viewCtrl.dismiss();
  }

  public reset() {
    this.rest.reset(this.server.id);
    this.viewCtrl.dismiss();
  }

  public shutdown() {
    this.rest.shutdown(this.server.id);
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
