import {Component} from '@angular/core';
import {LoadingController, ModalController, NavController, NavParams} from 'ionic-angular';
import {ProjectsService} from "../../models/project/ProjectsService";
import {editServerModal} from "./editServer/editServer";
import {powerSettingsModal} from "./powerSettings/powerSettings";
import {rescueModeModal} from "./rescueMode/rescueMode";
import {resizeServerModal} from "./resizeServer/resizeServer";
import {backupSettingsModal} from "./backupSettings/backupSettings";
import {ServerApiProvider} from "../../providers/server-api/server-api";
import {changeIPv4ReverseDNSModal} from "./reverseDNS/ipv4/changeIPv4ReverseDNSModal";
import {changeIPv6ReverseDNSModal} from "./reverseDNS/ipv6/changeIPv6ReverseDNS";
import {ServersService} from "../../models/servers/ServersService";
import {ServersPage} from "./serverList/servers";
import {ServerMetricsPage} from "./server-metrics/server-metrics";
import {TranslateService} from "@ngx-translate/core";
import {consoleModal} from "./console/console";
import {Server} from "../../models/servers/server";

@Component({
  selector: 'page-server',
  templateUrl: 'server.html'
})
export class ServerPage {
  /**
   *
   */
  public server: Server;

  /**
   *
   * @param navCtrl
   * @param project
   * @param serverApiProvider
   * @param navParams
   * @param modalCtrl
   * @param loadingCtrl
   * @param serverService
   * @param translate
   */
  constructor(public navCtrl: NavController, public project: ProjectsService, public serverApiProvider: ServerApiProvider, public navParams: NavParams, public modalCtrl: ModalController, public loadingCtrl: LoadingController, public serverService: ServersService, public translate: TranslateService) {
    this.server = navParams.get('server');
  }

  /**
   *
   * @param refresher
   */
  public refresh(refresher) {
    this.serverApiProvider.getServer(this.server.id).then((data) => {
      this.server = data['server'];
      refresher.complete();
    });
  }

  /**
   * Open the Edit Server Modal
   */
  public openEditModal() {
    let modal = this.modalCtrl.create(editServerModal, {server: this.server});
    modal.present();
  }

  /**
   * Open the Power Settings Modal
   */
  public powerSettingsModal() {
    let modal = this.modalCtrl.create(powerSettingsModal, {server: this.server});
    modal.present();
  }

  /**
   * Open Rescue Mode Modal
   */
  public rescueModeModal() {
    let modal = this.modalCtrl.create(rescueModeModal, {server: this.server});
    modal.present();
  }

  /**
   * Open the Modal for Server Upgrades
   */
  public resizeModal() {
    let modal = this.modalCtrl.create(resizeServerModal, {server: this.server});
    modal.present();
  }

  /**
   * Open the Modal for the Backup Settings
   */
  public backupSettingsModal() {
    let modal = this.modalCtrl.create(backupSettingsModal, {server: this.server});
    modal.present();
  }

  /**
   * Open the Modal for the IPv4 Reverse DNS Changes
   */
  public changeIPv4ReverseDNSModal() {
    let modal = this.modalCtrl.create(changeIPv4ReverseDNSModal, {server: this.server});
    modal.present();
  }

  /**
   * Open the Modal for the IPv6 Reverse DNS Changes
   */
  public changeIPv6ReverseDNSModal() {
    let modal = this.modalCtrl.create(changeIPv6ReverseDNSModal, {server: this.server});
    modal.present();
  }

  /**
   * Open the Page for the Server Metrics
   */
  public metricsPage() {
    this.navCtrl.push(ServerMetricsPage, {server: this.server});
  }

  /**
   * Open the Page for the VNC Console
   */
  public consolePage() {
    this.navCtrl.push(consoleModal, {server: this.server});
  }

  /**
   * Ask for Confirmation of Server Deletion
   */
  public delete() {
    let _delete: string = '';
    this.translate.get('ACTIONS.DELETE_CONFIRMATION').subscribe(text => {
      _delete = text;
    });
    if (confirm(_delete)) {
      var loader = this.loadingCtrl.create();
      loader.present();
      this.serverApiProvider.delete(this.server.id).then((data) => {
        loader.dismiss();
        this.serverApiProvider.getServers().then((data) => {
          this.serverService.servers = data['servers'];
          this.serverService.saveServers();
          this.navCtrl.setRoot(ServersPage);
        });
      });

    }
  }
}
