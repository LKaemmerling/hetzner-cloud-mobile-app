import {Component} from '@angular/core';
import {ProjectsService} from "../../../models/project/ProjectsService";
import {LoadingController, NavController, NavParams, ViewController} from "ionic-angular";
import {ServerApiProvider} from "../../../providers/server-api/server-api";
import {ServerTypeApiProvider} from "../../../providers/server-type-api/server-type-api";
import {Server, ServerType} from "../../../models/servers/server";

@Component({
  selector: 'modal-resizeServer',
  templateUrl: 'resizeServer.html'
})
export class resizeServerModal {
  /**
   *
   */
  public server: Server;
  /**
   *
   * @type {any[]}
   */
  public server_types: Array<ServerType> = [];
  /**
   *
   */
  public server_type: ServerType;
  /**
   *
   */
  public upgrade_disk: boolean = false;
  /**
   *
   * @type {null}
   */
  public error: string = null;

  /**
   *
   * @param {ProjectsService} project
   * @param {ViewController} viewCtrl
   * @param {ServerApiProvider} serverApiProvider
   * @param {NavParams} navParams
   * @param {NavController} navCtrl
   * @param {ServerTypeApiProvider} serverTypeApiProvider
   * @param {LoadingController} loadingCtrl
   */
  constructor(public project: ProjectsService, public viewCtrl: ViewController, public serverApiProvider: ServerApiProvider, public navParams: NavParams, public navCtrl: NavController, public serverTypeApiProvider: ServerTypeApiProvider, public loadingCtrl: LoadingController) {
    this.server = navParams.get('server');
    serverTypeApiProvider.getServerTypes().then((data) => {
      data['server_types'].forEach((type, key) => {
        if (type.storage_type == this.server.server_type.storage_type) {
          this.server_types.push(type);
        }
      });
    })
  }

  /**
   *
   */
  public resizeServer() {

    if (this.server_type == null) {
      this.error = 'PAGE.SERVERS.MODAL.UPGRADE.ERRORS.REQUIRED_TYPE';
      return;
    }
    var loader = this.loadingCtrl.create();
    loader.present();
    if (this.upgrade_disk == null || this.upgrade_disk == undefined) {
      this.upgrade_disk = false;
    }
    this.serverApiProvider.changeServerType(this.server.id, this.server_type.id, this.upgrade_disk).then((data) => {
      loader.dismiss();
    }, (error) => {
      this.error = 'PAGE.SERVERS.MODAL.UPGRADE.ERRORS.NETWORK_ERROR';
    });

    this.dismiss();
  }

  public dismiss() {
    this.viewCtrl.dismiss();
  }
}
