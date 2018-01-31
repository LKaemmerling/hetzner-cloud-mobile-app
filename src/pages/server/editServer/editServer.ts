import {Component} from '@angular/core';
import {ProjectsService} from "../../../models/project/ProjectsService";
import {App, NavController, NavParams, ViewController} from "ionic-angular";
import {RestProvider} from "../../../providers/rest/rest";


@Component({
  selector: 'modal-editServer',
  templateUrl: 'editServer.html'
})
export class editServerModal {
  public server: any;

  constructor(public project: ProjectsService, public viewCtrl: ViewController, public rest: RestProvider, public navParams: NavParams, public navCtrl: NavController,  public appCtrl: App) {
    this.server = navParams.get('server');
  }


  public updateServer() {
    this.rest.changeServerName(this.server.id, this.server.name);
    this.viewCtrl.dismiss();
  }

  public dismiss() {
    this.viewCtrl.dismiss();
  }
}
