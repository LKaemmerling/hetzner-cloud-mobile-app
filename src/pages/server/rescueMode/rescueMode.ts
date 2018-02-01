import {Component} from '@angular/core';
import {ProjectsService} from "../../../models/project/ProjectsService";
import {LoadingController, NavController, NavParams, ViewController} from "ionic-angular";
import {ServerApiProvider} from "../../../providers/server-api/server-api";


@Component({
  selector: 'modal-rescueMode',
  templateUrl: 'rescueMode.html'
})
export class rescueModeModal {
  public server: any;
  public root_password: string = null;

  constructor(public project: ProjectsService, public viewCtrl: ViewController, public serverApiProvider: ServerApiProvider, public navParams: NavParams, public navCtrl: NavController, public loadingCtrl: LoadingController) {
    this.server = navParams.get('server');
  }


  public rescueActivate() {
    var loader = this.loadingCtrl.create();
    loader.present();
    this.serverApiProvider.enable_rescue(this.server.id).then((data) => {
      loader.dismiss();
      this.dismiss();
    });
  }

  public rescueActivateAndReset() {
    var loader = this.loadingCtrl.create();
    loader.present();
    this.serverApiProvider.enable_rescue(this.server.id).then(() => {
      this.serverApiProvider.reset(this.server.id).then(() => {
        loader.dismiss();
        this.dismiss();
      });
    });


  }

  public resetRootpassword() {
    var loader = this.loadingCtrl.create();
    loader.present();
    this.serverApiProvider.resetPassword(this.server.id).then((data) => {
      loader.dismiss();
      this.root_password = data['action'].root_password
    });

  }

  public dismiss() {
    this.viewCtrl.dismiss();
  }
}
