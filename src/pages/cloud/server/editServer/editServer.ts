import {Component} from '@angular/core';
import {ProjectsService} from "../../../../modules/hetzner-cloud-data/project/projects.service";
import {LoadingController, NavController, NavParams, ViewController} from "ionic-angular";
import {ServerApiProvider} from "../../../../modules/hetzner-cloud-api/server-api/server-api";
import {Protection, Server} from "../../../../modules/hetzner-cloud-data/servers/server";

/**
 * This makes it possible to rename a server
 */
@Component({
  selector: 'modal-editServer',
  templateUrl: 'editServer.html'
})
export class editServerModal {
  /**
   * The server that should be edited
   */
  public server: Server;

  /**
   * When there was an error this contains the message
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
   * @param {LoadingController} loadingCtrl
   */
  constructor(protected project: ProjectsService, protected viewCtrl: ViewController, protected serverApiProvider: ServerApiProvider, protected navParams: NavParams, protected navCtrl: NavController, protected loadingCtrl: LoadingController) {
    this.server = navParams.get('server');
  }

  /**
   * Make the api call and validate the name
   */
  public updateServer() {
    if (this.server.name == null || this.server.name.length < 3 || /(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9])$/g.test(this.server.name) == false) {
      this.error = 'PAGE.SERVERS.MODAL.ADD.ERRORS.REQUIRED_NAME';
      return;
    }
    let loader = this.loadingCtrl.create();
    loader.present();
    this.serverApiProvider.changeServerName(this.server.id, this.server.name).then(() => {
      this.serverApiProvider.changeProtection(this.server.id, this.server.protection.delete, this.server.protection.delete).then(() => {
        loader.dismiss();
        this.dismiss();
      });
    });

  }

  /**
   * Dismiss the modal
   */
  public dismiss() {
    this.viewCtrl.dismiss();
  }
}
