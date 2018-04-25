import {Component} from '@angular/core';
import {ActionSheetController, ModalController, NavController} from 'ionic-angular';
import {TranslateService} from '@ngx-translate/core';
import {Storage} from '@ionic/storage';
import {state, style, transition, trigger, useAnimation} from '@angular/animations';
import {fadeIn, fadeOut} from 'ng-animate';
import {HetznerRobotDataService} from '../../../../modules/hetzner-robot-data/hetzner-robot-data.service';
import {NetworkProvider} from '../../../../modules/hetzner-app/network/network';

import {ServerApiProvider} from '../../../../modules/hetzner-robot-api/server-api/server-api';
import {ServersService} from '../../../../modules/hetzner-robot-data/servers/servers.service';
import {ServerDetailPage} from '../details/server-detail';
import {ServerEditModal} from '../edit/server-edit';

/**
 * This is the project page, where you can create, activate, share and delete projects
 */
@Component({
  selector: 'page-server-list',
  templateUrl: 'server-list.html',
  animations: [
    trigger('animate', [
      state(
        'active',
        style({
          display: 'block',
        })
      ),
      state(
        '*',
        style({
          display: 'none',
        })
      ),
      transition('* => active', useAnimation(fadeIn, {params: {timing: 0.3, delay: 0}})),
      transition('active => *', useAnimation(fadeOut, {params: {timing: 0, delay: 0}})),
    ]),
  ],
})
export class ServerListPage {
  /**
   * All available servers
   * @type {any[]}
   */
  public servers: Array<any> = [];
  /**
   * All available servers - filtered
   * @type {any[]}
   *
   */
  public _search: Array<any> = [];

  /**
   * Is the component in the loading process?
   * @type {boolean}
   */
  public loading: boolean = false;
  /**
   * Is the loading done?
   * @type {boolean}
   */
  public loading_done: boolean = false;
  /**
   * Is the loading done?
   * @type {boolean}
   */
  public error: string = "";
  /**
   * All visible submenus
   * @type {any[]}
   */
  public visible: Array<string> = [];
  /**
   * Is the compact server design enabled or not?
   * @type {boolean}
   */
  public compact_server_design: boolean = false;

  /**
   * Constructor
   * @param {ActionSheetController} actionSheetCtrl
   * @param {ModalController} modal
   * @param {HetznerCloudDataService} hetznerCloudDataService
   * @param {ProjectsService} project
   * @param {ServersService} serversService
   * @param {TranslateService} translate
   * @param {Storage} storage
   * @param {NetworkProvider} network
   */
  constructor(
    protected actionSheetCtrl: ActionSheetController,
    protected navCtrl: NavController,
    protected hetznerRobotData: HetznerRobotDataService,
    protected serversService: ServersService,
    protected translate: TranslateService,
    protected storage: Storage,
    protected network: NetworkProvider,
    protected serverApi: ServerApiProvider,
    protected modal: ModalController
  ) {
    this.servers = this._search = this.serversService.servers;
    storage.get('compact_server_design').then(val => {
      if (val != undefined) {
        this.compact_server_design = val;
      }
    });
  }

  /**
   * Open a submenu
   * @param menuId
   */
  openSubMenu(menuId) {
    if (this.visible[menuId] != undefined && this.visible[menuId] == 'active') {
      this.visible = [];
    } else {
      this.visible = [];
      this.visible[menuId] = 'active';
    }
  }

  /**
   * Load all available servers from the api
   */
  public loadServers() {
    this.loading = true;
    this.serversService.reloadServers().then(() => {
      this.servers = this.serversService.servers;
      this._search = this.servers;
      this.loading = false;
      this.loading_done = true;
      setTimeout(() => (this.loading_done = false), 5000);
    }, (error) => {
      this.loading = false;
      this.error = error.message.toString();
    });
  }

  /**
   * Load all available servers from the api
   * @param {any} refresher
   */
  public refresh(refresher = null) {
    this.loadServers();
    if (refresher !== null) {
      refresher.complete();
    }
  }

  openDetailsPage(server_ip: string) {
    this.navCtrl.push(ServerDetailPage, {server_ip: server_ip});
  }

  openEditModal(server) {
    let modal = this.modal.create(ServerEditModal, {server: server});
    modal.onDidDismiss(() => {
      this.loadServers();
    });
    modal.present();
  }

  /**
   * Search of a string in the server name
   * @param ev
   */
  search(ev) {
    // Reset items back to all of the items
    this._search = this.servers;
    // set val to the value of the ev target
    var val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this._search = this.servers.filter(item => {
        if (item == null) {
          return false;
        }
        return item.server.server_name.toLowerCase().indexOf(val.toLowerCase()) > -1;
      });
    }
  }
}
