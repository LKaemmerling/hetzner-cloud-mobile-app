import {Component} from '@angular/core';
import {ProjectsService} from "../../../models/project/ProjectsService";
import {NavController, NavParams, ViewController} from "ionic-angular";
import {ServerApiProvider} from "../../../providers/server-api/server-api";


@Component({
  selector: 'modal-editServer',
  templateUrl: 'editServer.html'
})
export class editServerModal {
  public server: any;

  constructor(public project: ProjectsService, public viewCtrl: ViewController, public serverApiProvider: ServerApiProvider, public navParams: NavParams, public navCtrl: NavController) {
    this.server = navParams.get('server');
  }


  public updateServer() {
    this.serverApiProvider.changeServerName(this.server.id, this.server.name);
    this.viewCtrl.dismiss();
  }

  public dismiss() {
    this.viewCtrl.dismiss();
  }
}
