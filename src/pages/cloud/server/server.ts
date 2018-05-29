import {Component} from '@angular/core';
import {LoadingController, ModalController, NavController, NavParams} from 'ionic-angular';
import {ProjectsService} from '../../../modules/hetzner-cloud-data/project/projects.service';
import {editServerModal} from './editServer/editServer';
import {powerSettingsModal} from './powerSettings/powerSettings';
import {rescueModeModal} from './rescueMode/rescueMode';
import {resizeServerModal} from './resizeServer/resizeServer';
import {backupSettingsModal} from './backupSettings/backupSettings';
import {ServerApiProvider} from '../../../modules/hetzner-cloud-api/server-api/server-api';
import {changeIPv4ReverseDNSModal} from './reverseDNS/ipv4/changeIPv4ReverseDNSModal';
import {changeIPv6ReverseDNSModal} from './reverseDNS/ipv6/changeIPv6ReverseDNS';
import {ServersService} from '../../../modules/hetzner-cloud-data/servers/servers.service';
import {ServersPage} from './serverList/servers';
import {ServerMetricsPage} from './server-metrics/server-metrics';
import {TranslateService} from '@ngx-translate/core';
import {consoleModal} from './console/console';
import {Server} from '../../../modules/hetzner-cloud-data/servers/server';
import {NetworkProvider} from '../../../modules/hetzner-app/network/network';
import {ConfigService} from "../../../modules/hetzner-app/config/config.service";
import {StatusApiProvider} from "../../../modules/hetzner-cloud-api/status-api/status-api-provider.service";
import {TrackingService} from "../../../modules/hetzner-app/tracking/tracking.service";

/**
 * This page displays all information about the selected server
 */
@Component({
  selector: 'page-server',
  templateUrl: 'server.html',
})
export class ServerPage {
  /**
   * The server that is visible in this page
   */
  public server: Server;

  public cloud_host_enabled: number = -1;

  public cloud_host: string = '';

  public cloud_host_loading: boolean = false;

  /**
   * Constructor
   * @param {LoadingController} loadingCtrl
   * @param {ModalController} modalCtrl
   * @param {NavController} navCtrl
   * @param {NavParams} navParams
   * @param {ConfigService} configService
   * @param {ProjectsService} project
   * @param {ServersService} serverService
   * @param {TranslateService} translate
   * @param {NetworkProvider} networkProvider
   * @param {ServerApiProvider} serverApiProvider
   * @param {StatusApiProvider} statusApiProvider
   */
  constructor(
    protected loadingCtrl: LoadingController,
    protected modalCtrl: ModalController,
    protected navCtrl: NavController,
    protected navParams: NavParams,
    protected configService: ConfigService,
    protected project: ProjectsService,
    protected serverService: ServersService,
    protected translate: TranslateService,
    protected networkProvider: NetworkProvider,
    protected serverApiProvider: ServerApiProvider,
    protected tracking: TrackingService
  ) {
    this.server = navParams.get('server');
    tracking.trackFeature('cloud.server.details');
    this.cloud_host_enabled = 0;
    if (this.configService.getFeatureFlag('cloud_status', false)) {
      this.cloud_host_enabled = 1;
      this.cloud_host_loading = true;
      this.serverService.get_cloud_host(this.server).then((cloud_host_id) => {
        this.cloud_host = <string>cloud_host_id;
        this.cloud_host_loading = false;
      });
    }
  }

  /**
   * Reload the data for this specific server from the api
   */
  public refresh() {
    this.serverApiProvider.getServer(this.server.id).then(data => {
      this.server = data['server'];
    });
  }

  /**
   * Open the Edit Server Modal
   */
  public openEditModal() {
    if (this.networkProvider.has_connection) {
      let modal = this.modalCtrl.create(editServerModal, {server: this.server});
      modal.present();
    } else {
      this.networkProvider.displayNoNetworkNotice();
    }
  }

  /**
   * Open the Power Settings Modal
   */
  public powerSettingsModal() {
    if (this.networkProvider.has_connection) {
      let modal = this.modalCtrl.create(powerSettingsModal, {server: this.server});
      modal.present();
    } else {
      this.networkProvider.displayNoNetworkNotice();
    }
  }

  /**
   * Open Rescue Mode Modal
   */
  public rescueModeModal() {
    if (this.networkProvider.has_connection) {
      let modal = this.modalCtrl.create(rescueModeModal, {server: this.server});
      modal.present();
    } else {
      this.networkProvider.displayNoNetworkNotice();
    }
  }

  /**
   * Open the Modal for Server Upgrades
   */
  public resizeModal() {
    if (this.networkProvider.has_connection) {
      let modal = this.modalCtrl.create(resizeServerModal, {server: this.server});
      modal.present();
    } else {
      this.networkProvider.displayNoNetworkNotice();
    }
  }

  /**
   * Open the Modal for the Backup Settings
   */
  public backupSettingsModal() {
    if (this.networkProvider.has_connection) {
      let modal = this.modalCtrl.create(backupSettingsModal, {server: this.server});
      modal.present();
    } else {
      this.networkProvider.displayNoNetworkNotice();
    }
  }

  /**
   * Open the Modal for the IPv4 Reverse DNS Changes
   */
  public changeIPv4ReverseDNSModal() {
    if (this.networkProvider.has_connection) {
      let modal = this.modalCtrl.create(changeIPv4ReverseDNSModal, {server: this.server});
      modal.present();
    } else {
      this.networkProvider.displayNoNetworkNotice();
    }
  }

  /**
   * Open the Modal for the IPv6 Reverse DNS Changes
   */
  public changeIPv6ReverseDNSModal() {
    if (this.networkProvider.has_connection) {
      let modal = this.modalCtrl.create(changeIPv6ReverseDNSModal, {server: this.server});
      modal.present();
    } else {
      this.networkProvider.displayNoNetworkNotice();
    }
  }

  /**
   * Open the Page for the Server Metrics
   */
  public metricsPage() {
    if (this.networkProvider.has_connection) {
      this.navCtrl.push(ServerMetricsPage, {server: this.server});
    } else {
      this.networkProvider.displayNoNetworkNotice();
    }
  }

  /**
   * Open the Page for the VNC Console
   */
  public consolePage() {
    if (this.networkProvider.has_connection) {
      this.navCtrl.push(consoleModal, {server: this.server});
    } else {
      this.networkProvider.displayNoNetworkNotice();
    }
  }

  /**
   * Ask for Confirmation of Server Deletion
   */
  public delete() {
    if (this.networkProvider.has_connection) {
      let _delete: string = '';
      this.translate.get('ACTIONS.DELETE_CONFIRMATION').subscribe(text => {
        _delete = text;
      });
      if (confirm(_delete)) {
        var loader = this.loadingCtrl.create();
        loader.present();
        this.serverApiProvider.delete(this.server.id).then(data => {
          loader.dismiss();
          this.serverApiProvider.getServers().then(data => {
            this.serverService.servers = data['servers'];
            this.serverService.saveServers();
            this.navCtrl.setRoot(ServersPage);
          });
        });
      }
    } else {
      this.networkProvider.displayNoNetworkNotice();
    }
  }
}
