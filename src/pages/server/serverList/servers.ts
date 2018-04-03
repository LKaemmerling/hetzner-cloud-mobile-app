import {Component} from '@angular/core';
import {LoadingController, ModalController, NavController} from 'ionic-angular';
import {ProjectsService} from "../../../modules/hetzner-cloud-data/project/projects.service";
import {ServerPage} from "../server";
import {addServerModal} from "../addServer/addServer";
import {ServerApiProvider} from "../../../providers/server-api/server-api";
import {ServersService} from "../../../modules/hetzner-cloud-data/servers/servers.service";
import {Storage} from "@ionic/storage";
import {TranslateService} from "@ngx-translate/core";
import {editServerModal} from "../editServer/editServer";
import {state, style, transition, trigger, useAnimation} from "@angular/animations";
import {fadeIn, fadeOut} from "ng-animate";
import {Server} from "../../../modules/hetzner-cloud-data/servers/server";
import {NetworkProvider} from "../../../modules/hetzner-app/network/network";

@Component({
  selector: 'page-servers',
  templateUrl: 'servers.html',
  animations: [
    trigger('animate', [
      state('active', style({
        display: 'block',
      })),
      state('*', style({
        display: 'none',
      })),
      transition('* => active', useAnimation(fadeIn, {params: {timing: 0.3, delay: 0}})),
      transition('active => *', useAnimation(fadeOut, {params: {timing: 0, delay: 0}}))])
  ],
})
export class ServersPage {
  /**
   *
   * @type {any[]}
   */
  public servers: Array<Server> = [];
  /**
   *
   * @type {any[]}
   *
   */
  public _search: Array<Server> = [];

  /**
   *
   * @type {boolean}
   */
  public loading: boolean = false;
  /**
   *
   * @type {boolean}
   */
  public loading_done: boolean = false;
  /**
   *
   * @type {any[]}
   */
  public visible: Array<string> = [];
  /**
   *
   * @type {boolean}
   */
  public compact_server_design: boolean = false;

  /**
   *
   * @param {LoadingController} loadingCtrl
   * @param {ModalController} modalCtrl
   * @param {NavController} navCtrl
   * @param {Storage} storage
   * @param {ProjectsService} project
   * @param {ServersService} serversService
   * @param {TranslateService} translate
   * @param {NetworkProvider} networkProvider
   * @param {ServerApiProvider} serverApiProvider
   */
  constructor(
    protected loadingCtrl: LoadingController,
    protected modalCtrl: ModalController,
    protected navCtrl: NavController,
    protected storage: Storage,
    protected project: ProjectsService,
    protected serversService: ServersService,
    protected translate: TranslateService,
    protected networkProvider: NetworkProvider,
    protected serverApiProvider: ServerApiProvider
  ) {
    this.servers = this._search = this.serversService.servers;
    storage.get('compact_server_design').then((val) => {
      if (val != undefined) {
        this.compact_server_design = val;
      }
    });
  }

  /**
   *
   * @param {string} menuId
   */
  openSubMenu(menuId: string) {
    this.visible = [];
    if (this.visible[menuId] != undefined && this.visible[menuId] == 'active') {

    } else {
      this.visible[menuId] = 'active';
    }
  }

  /**
   *
   */
  public loadServers() {
    this.loading = true;
    this.serversService.reloadServers().then(() => {
      this.servers = this.serversService.servers;
      this._search = this.servers;
      this.loading = false;
      this.loading_done = true;
      setTimeout(() => this.loading_done = false, 5000);
    });
  }

  /**
   *
   * @param {any} refresher
   */
  public refresh(refresher = null) {

    this.loadServers();
    if (refresher !== null) {
      refresher.complete();
    }
  }

  /**
   *
   */
  public ionViewWillEnter() {
    this.serversService.reloadServers().then(() => {
      this.servers = this._search = this.serversService.servers;
    });
  }

  /**
   *
   * @param {Server} server
   */
  public delete(server: Server) {
    if (this.networkProvider.has_connection) {
      let _delete: string = '';
      this.translate.get('ACTIONS.DELETE_CONFIRMATION').subscribe(text => {
        _delete = text;
      });
      if (confirm(_delete)) {
        var loader = this.loadingCtrl.create();
        loader.present();
        this.serverApiProvider.delete(server.id).then((data) => {
          this.loadServers();
          loader.dismiss();
        });
      }
    } else {
      this.networkProvider.displayNoNetworkNotice();
    }
  }

  /**
   *
   * @param ev
   */
  search(ev) {
    // Reset items back to all of the items
    this._search = this.servers;
// set val to the value of the ev target
    var val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this._search = this.servers.filter((item) => {
        if (item == null) {
          return false;
        }
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  /**
   *
   */
  openCreateServerModal() {
    if (this.networkProvider.has_connection) {
      let modal = this.modalCtrl.create(addServerModal);
      modal.onDidDismiss(() => {
        this.loadServers();
      });

      modal.present();
    } else {
      this.networkProvider.displayNoNetworkNotice();
    }
  }

  /**
   *
   * @param {Server} server
   */
  public openEditModal(server: Server) {
    if (this.networkProvider.has_connection) {
      let modal = this.modalCtrl.create(editServerModal, {server: server});
      modal.onDidDismiss(() => {
        this.loadServers();
      });

      modal.present();
    } else {
      this.networkProvider.displayNoNetworkNotice();
    }
  }

  /**
   *
   * @param {Server} server
   */
  public openDetailsPage(server: Server) {
    this.navCtrl.push(ServerPage, {server: server});
  }
}
