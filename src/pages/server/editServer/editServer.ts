import {Component} from '@angular/core';
import {ProjectsService} from "../../../models/project/ProjectsService";
import {LoadingController, NavController, NavParams, ViewController} from "ionic-angular";
import {ServerApiProvider} from "../../../providers/server-api/server-api";
import {Server} from "../../../models/servers/server";


@Component({
  selector: 'modal-editServer',
  templateUrl: 'editServer.html'
})
export class editServerModal {
  /**
   *
   */
  public server: Server;
  /**
   *
   * @type {string}
   */
  public error: string = null;

  /**
   *
   * @param {ProjectsService} project
   * @param {ViewController} viewCtrl
   * @param {ServerApiProvider} serverApiProvider
   * @param {NavParams} navParams
   * @param {NavController} navCtrl
   * @param {LoadingController} loadingCtrl
   */
  constructor(public project: ProjectsService, public viewCtrl: ViewController, public serverApiProvider: ServerApiProvider, public navParams: NavParams, public navCtrl: NavController, public loadingCtrl: LoadingController) {
    this.server = navParams.get('server');
  }

  /**
   *
   */
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

  /**
   *
   */
  public dismiss() {
    this.viewCtrl.dismiss();
  }
}
