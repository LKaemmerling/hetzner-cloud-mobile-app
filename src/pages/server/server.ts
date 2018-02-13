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

@Component({
  selector: 'page-server',
  templateUrl: 'server.html'
})
export class ServerPage {
  public server;
  public powerOn = true;
  public rescueMode = false;

  constructor(public navCtrl: NavController, public project: ProjectsService, public serverApiProvider: ServerApiProvider, public navParams: NavParams, public modalCtrl: ModalController, public loadingCtrl: LoadingController, public serverService: ServersService, public translate:TranslateService) {
    this.server = navParams.get('server');
    this.powerOn = (this.server.status == 'running');
    this.rescueMode = this.server.rescue_enabled;
  }

  public refresh(refresher) {
    this.serverApiProvider.getServer(this.server.id).then((data) => {
      this.server = data['server'];
      refresher.complete();
    });
  }

  public toggleStatus() {
    if (!this.powerOn) {
      this.serverApiProvider.shutdown(this.server.id);
    } else {
      this.serverApiProvider.powerOn(this.server.id);
    }
    //this.powerOn = !this.powerOn;
  }

  public toggleRescueMode() {
    if (!this.rescueMode) {
      this.serverApiProvider.disable_rescue(this.server.id);
    } else {
      this.serverApiProvider.enable_rescue(this.server.id);
    }
    //this.rescueMode = !this.rescueMode;
  }

  public openEditModal() {
    let modal = this.modalCtrl.create(editServerModal, {server: this.server});
    modal.present();
  }

  public powerSettingsModal() {
    let modal = this.modalCtrl.create(powerSettingsModal, {server: this.server});
    modal.present();
  }

  public rescueModeModal() {
    let modal = this.modalCtrl.create(rescueModeModal, {server: this.server});
    modal.present();
  }

  public resizeModal() {
    let modal = this.modalCtrl.create(resizeServerModal, {server: this.server});
    modal.present();
  }

  public backupSettingsModal() {
    let modal = this.modalCtrl.create(backupSettingsModal, {server: this.server});
    modal.present();
  }

  public changeIPv4ReverseDNSModal() {
    let modal = this.modalCtrl.create(changeIPv4ReverseDNSModal, {server: this.server});
    modal.present();
  }

  public changeIPv6ReverseDNSModal() {
    let modal = this.modalCtrl.create(changeIPv6ReverseDNSModal, {server: this.server});
    modal.present();
  }

  public metricsPage() {
    this.navCtrl.push(ServerMetricsPage, {server: this.server});
  }

  public delete() {
    let _delete: string = '';
    this.translate.get('ACTIONS.DELETE').subscribe(text => {
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
