import {Component} from '@angular/core';
import {ActionSheetController, ModalController, NavController} from 'ionic-angular';
import {TranslateService} from '@ngx-translate/core';
import {Storage} from '@ionic/storage';
import {state, style, transition, trigger, useAnimation} from '@angular/animations';
import {fadeIn, fadeOut} from 'ng-animate';
import {HetznerRobotDataService} from '../../../../modules/hetzner-robot-data/hetzner-robot-data.service';
import {NetworkProvider} from '../../../../modules/hetzner-app/network/network';
import {ServersService} from '../../../../modules/hetzner-robot-data/servers/servers.service';
import {StorageBoxService} from '../../../../modules/hetzner-robot-data/storage-box/storage-box.service';
import {StorageBoxEditModal} from "../edit/storage-box-edit";
import {StorageBoxDetailPage} from "../details/storage-box-details";

/**
 * This is the project page, where you can create, activate, share and delete projects
 */
@Component({
  selector: 'page-storage-box-list',
  templateUrl: 'storage-box-list.html',
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
export class StorageBoxListPage {
  /**
   * All available servers
   * @type {any[]}
   */
  public storage_boxes: Array<any> = [];
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
   * All visible submenus
   * @type {any[]}
   */
  public visible: Array<string> = [];
  /**
   * Is the loading done?
   * @type {boolean}
   */
  public error: string = "";
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
    protected storageBoxService: StorageBoxService,
    protected translate: TranslateService,
    protected storage: Storage,
    protected network: NetworkProvider,
    protected navCtrl: NavController
  ) {
    this.storage_boxes = this._search = this.storageBoxService.storage_boxes;
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
  public loadStorageBoxes() {
    this.loading = true;
    this.storageBoxService.reloadStorageBoxes().then(() => {
      this.storage_boxes = this.storageBoxService.storage_boxes;
      this._search = this.storage_boxes;
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
    this.loadStorageBoxes();
    if (refresher !== null) {
      refresher.complete();
    }
  }

  /**
   * Search of a string in the server name
   * @param ev
   */
  search(ev) {
    // Reset items back to all of the items
    this._search = this.storage_boxes;
    // set val to the value of the ev target
    var val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this._search = this.storage_boxes.filter(item => {
        if (item == null) {
          return false;
        }
        return item.storagebox.name.toLowerCase().indexOf(val.toLowerCase()) > -1;
      });
    }
  }

  /**
   *
   * @param {number} storage_box_id
   */
  openDetailsPage(storage_box_id: number) {
    this.navCtrl.push(StorageBoxDetailPage, {storage_box_id: storage_box_id});
  }

  /**
   *
   * @param storage_box
   */
  openEditModal(storage_box) {
    let modal = this.modal.create(StorageBoxEditModal, {storage_box: storage_box});
    modal.onDidDismiss(() => {
      this.loadStorageBoxes();
    });
    modal.present();
  }
}
