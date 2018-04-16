import {Component} from '@angular/core';
import {ProjectsService} from "../../../../modules/hetzner-cloud-data/project/projects.service";
import {LoadingController, NavController, NavParams, ViewController} from "ionic-angular";
import {ServerApiProvider} from "../../../../modules/hetzner-cloud-api/server-api/server-api";
import {ServerTypeApiProvider} from "../../../../modules/hetzner-cloud-api/server-type-api/server-type-api";
import {Server, ServerType} from "../../../../modules/hetzner-cloud-data/servers/server";

/**
 * With this modal you can resize a server
 */
@Component({
  selector: 'modal-resizeServer',
  templateUrl: 'resizeServer.html'
})
export class resizeServerModal {
  /**
   * The server that should be resized
   */
  public server: Server;
  /**
   * All available server types
   * @type {any[]}
   */
  public server_types: Array<ServerType> = [];
  /**
   * The new server type
   */
  public server_type: ServerType;
  /**
   * Determine if the disk should be upgraded as well or not
   */
  public upgrade_disk: boolean = false;
  /**
   * If there is an error, this contains the message
   * @type {string}
   */
  public error: string = null;

  /**
   * Constructor
   * @param {ProjectsService} project
   * @param {ViewController} viewCtrl
   * @param {ServerApiProvider} serverApiProvider
   * @param {NavParams} navParams
   * @param {NavController} navCtrl
   * @param {ServerTypeApiProvider} serverTypeApiProvider
   * @param {LoadingController} loadingCtrl
   */
  constructor(protected project: ProjectsService, protected viewCtrl: ViewController, protected serverApiProvider: ServerApiProvider, protected navParams: NavParams, protected navCtrl: NavController, protected serverTypeApiProvider: ServerTypeApiProvider, protected loadingCtrl: LoadingController) {
    this.server = navParams.get('server');
    this.server_type = this.server.server_type;
    console.log(this.server.server_type);
    serverTypeApiProvider.getServerTypes().then((data) => {
      data['server_types'].forEach((type, key) => {
        if (type.storage_type == this.server.server_type.storage_type) {
          this.server_types.push(type);
        }
      });
    })
  }

  /**
   * Make the api call and validate the payload
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

  /**
   * Dismiss the modal
   */
  public dismiss() {
    this.viewCtrl.dismiss();
  }
}
