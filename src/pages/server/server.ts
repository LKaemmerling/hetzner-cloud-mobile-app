import {Component} from '@angular/core';
import {ModalController, NavController, NavParams} from 'ionic-angular';
import {ProjectsService} from "../../models/project/ProjectsService";
import {editServerModal} from "./editServer/editServer";
import {powerSettingsModal} from "./powerSettings/powerSettings";
import {rescueModeModal} from "./rescueMode/rescueMode";
import {resizeServerModal} from "./resizeServer/resizeServer";
import {backupSettingsModal} from "./backupSettings/backupSettings";
import {ServerApiProvider} from "../../providers/server-api/server-api";

@Component({
  selector: 'page-server',
  templateUrl: 'server.html'
})
export class ServerPage {
  public server;
  public powerOn = true;
  public rescueMode = false;

  constructor(public navCtrl: NavController, public project: ProjectsService, public serverApiProvider: ServerApiProvider, public navParams: NavParams, public modalCtrl: ModalController) {
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
    this.modalCtrl.create(editServerModal, {server: this.server}).present();
  }

  public powerSettingsModal() {
    this.modalCtrl.create(powerSettingsModal, {server: this.server}).present();
  }

  public rescueModeModal() {
    this.modalCtrl.create(rescueModeModal, {server: this.server}).present();
  }

  public resizeModal() {
    this.modalCtrl.create(resizeServerModal, {server: this.server}).present();
  }

  public backupSettingsModal() {
    this.modalCtrl.create(backupSettingsModal, {server: this.server}).present();
  }
}
