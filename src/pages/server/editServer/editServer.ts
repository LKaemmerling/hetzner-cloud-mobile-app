import {Component} from '@angular/core';
import {ProjectsService} from "../../../models/project/ProjectsService";
import {LoadingController, NavController, NavParams, ViewController} from "ionic-angular";
import {ServerApiProvider} from "../../../providers/server-api/server-api";


@Component({
  selector: 'modal-editServer',
  templateUrl: 'editServer.html'
})
export class editServerModal {
  public server: any;

  public error: string = null;

  constructor(public project: ProjectsService, public viewCtrl: ViewController, public serverApiProvider: ServerApiProvider, public navParams: NavParams, public navCtrl: NavController, public loadingCtrl: LoadingController) {
    this.server = navParams.get('server');
  }


  public updateServer() {
    if (this.server.name == null || this.server.name == '') {
      this.error = 'PAGE.SERVERS.MODAL.EDIT.ERRORS.REQUIRED_NAME';
      return;
    }
    let loader = this.loadingCtrl.create();
    loader.present();
    this.serverApiProvider.changeServerName(this.server.id, this.server.name).then(() => {
      loader.dismiss();
      this.dismiss();
    });

  }

  public dismiss() {
    this.viewCtrl.dismiss();
  }
}
