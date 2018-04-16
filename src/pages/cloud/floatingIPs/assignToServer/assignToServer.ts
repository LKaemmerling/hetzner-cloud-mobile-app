import {Component} from '@angular/core';
import {ProjectsService} from "../../../../modules/hetzner-cloud-data/project/projects.service";
import {LoadingController, NavController, NavParams, ViewController} from "ionic-angular";
import {FloatingIpApiProvider} from "../../../../modules/hetzner-cloud-api/floating-ip-api/floating-ip-api";
import {Server} from "../../../../modules/hetzner-cloud-data/servers/server";
import {ServersService} from "../../../../modules/hetzner-cloud-data/servers/servers.service";

/**
 * This modal makes it possible to assign a new server to this floating ip
 */
@Component({
  selector: 'modal-assignToServer',
  templateUrl: 'assignToServer.html'
})
export class assignToServerModal {
  /**
   * The given floating ip
   */
  public floatingIp: any;
  /**
   * All available servers
   * @type {Server[]}
   */
  public servers: Array<Server> = null;

  /**
   * Constructor
   * @param {NavController} navCtrl
   * @param {LoadingController} loadingCtrl
   * @param {ViewController} viewCtrl
   * @param {ProjectsService} project
   * @param {ServersService} serversService
   * @param {FloatingIpApiProvider} floatingIpProvider
   * @param {NavParams} navParams
   */
  constructor(
    protected navCtrl: NavController,
    protected loadingCtrl: LoadingController,
    protected viewCtrl: ViewController,
    protected project: ProjectsService,
    protected serversService: ServersService,
    protected floatingIpProvider: FloatingIpApiProvider,
    protected navParams: NavParams
  ) {
    this.floatingIp = navParams.get('floating_ip');
    this.servers = this.serversService.servers;
  }

  /**
   * Make the api call
   */
  public assignToServer() {
    let loader = this.loadingCtrl.create();
    loader.present();
    this.floatingIpProvider.assignToServer(this.floatingIp.id, this.floatingIp.server).then(() => {
      loader.dismiss();
      this.dismiss();
    });

  }

  /**
   * Dismiss the modal
   */
  public dismiss() {
    this.viewCtrl.dismiss();
  }
}
