import {Component} from '@angular/core';
import {ActionSheetController, ModalController} from "ionic-angular";
import {TranslateService} from "@ngx-translate/core";
import {Storage} from "@ionic/storage";
import {state, style, transition, trigger, useAnimation} from "@angular/animations";
import {fadeIn, fadeOut} from "ng-animate";
import {Account} from "../../../../modules/hetzner-robot-data/accounts/account";
import {HetznerRobotDataService} from "../../../../modules/hetzner-robot-data/hetzner-robot-data.service";
import {AccountService} from "../../../../modules/hetzner-robot-data/accounts/account.service";
import {NetworkProvider} from "../../../../modules/hetzner-app/network/network";

import {ServerApiProvider} from "../../../../modules/hetzner-robot-api/server-api/server-api";
import {ServersService} from "../../../../modules/hetzner-robot-data/servers/servers.service";
import {Server} from "../../../../modules/hetzner-cloud-data/servers/server";

/**
 * This is the project page, where you can create, activate, share and delete projects
 */
@Component({
  selector: 'page-server-list',
  templateUrl: 'server-list.html',
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
export class ServerListPage {
  /**
   * All available servers
   * @type {any[]}
   */
  public servers: Array<Server> = [];
  /**
   * All available servers - filtered
   * @type {any[]}
   *
   */
  public _search: Array<Server> = [];

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
    protected modal: ModalController,
    protected hetznerRobotData: HetznerRobotDataService,
    protected serversService: ServersService,
    protected translate: TranslateService,
    protected storage: Storage,
    protected network: NetworkProvider,
    protected serverApi: ServerApiProvider
  ) {
    this.servers = this._search = this.serversService.servers;
    console.log(this.servers);
    storage.get('compact_server_design').then((val) => {
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
}
