import {Component} from '@angular/core';
import {ProjectsService} from "../../../models/project/ProjectsService";
import {LoadingController, NavController, NavParams, ViewController} from "ionic-angular";
import {ServerApiProvider} from "../../../providers/server-api/server-api";
import {Server} from "../../../models/servers/server";


@Component({
  selector: 'modal-powerSettings',
  templateUrl: 'powerSettings.html'
})
export class powerSettingsModal {
  /**
   *
   */
  public server: Server;

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
  public reset() {
    var loader = this.loadingCtrl.create();
    loader.present();
    this.serverApiProvider.reset(this.server.id).then(() => {
      loader.dismiss();
      this.dismiss();
    });

  }

  /**
   *
   */
  public shutdown() {
    var loader = this.loadingCtrl.create();
    loader.present();
    this.serverApiProvider.shutdown(this.server.id).then(() => {
      loader.dismiss();
      this.dismiss();
    });

  }

  /**
   *
   */
  public powerOff() {
    var loader = this.loadingCtrl.create();
    loader.present();
    this.serverApiProvider.powerOff(this.server.id).then(() => {
      loader.dismiss();
      this.dismiss();
    });
  }

  /**
   *
   */
  public powerOn() {
    var loader = this.loadingCtrl.create();
    loader.present();
    this.serverApiProvider.powerOn(this.server.id).then(() => {
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
