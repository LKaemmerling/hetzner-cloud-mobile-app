import {Component} from '@angular/core';
import {ProjectsService} from "../../modules/hetzner-cloud-data/project/projects.service";
import {ActionSheetController, ModalController, NavController} from "ionic-angular";
import {ImageApiProvider} from "../../providers/image-api/image-api";
import {editImageModal} from "./editImage/editImage";
import {addServerModal} from "../server/addServer/addServer";
import {TranslateService} from "@ngx-translate/core";
import {ImagesService} from "../../modules/hetzner-cloud-data/images/images.service";
import {Image, Server} from "../../modules/hetzner-cloud-data/servers/server";
import {ServersService} from "../../modules/hetzner-cloud-data/servers/servers.service";
import {ServerApiProvider} from "../../providers/server-api/server-api";
import {backupSettingsModal} from "../server/backupSettings/backupSettings";
import {NetworkProvider} from "../../modules/hetzner-app/network/network";

/**
 * This page displays all available images
 */
@Component({
  selector: 'page-images',
  templateUrl: 'images.html'
})
export class ImagesPage {

  /**
   * All available types
   * @type {string[]}
   */
  protected types: Array<string> = ['snapshot', 'backup', 'system'];
  /**
   * The default visible segment
   * @type {string}
   */
  protected type: string = 'snapshot';
  /**
   * All available images
   * @type {Image[]}
   */
  protected images: Array<Image> = [];
  /**
   * Is the component in the loading process?
   * @type {boolean}
   */
  protected loading: boolean = false;
  /**
   * Is the loading done?
   * @type {boolean}
   */
  protected loading_done: boolean = false;
  /**
   * What are the visible servers in the backup section
   * @type {number[]}
   */
  protected visible: Array<boolean> = [];

  /**
   * Is the backup creation done?
   * @type {boolean}
   */
  protected backup_done: boolean = false;

  /**
   * Constructor
   * @param {ActionSheetController} actionSheetCtrl
   * @param {ModalController} modal
   * @param {NavController} navCtrl
   * @param {ModalController} modalCtrl
   * @param {ImagesService} imagesService
   * @param {NetworkProvider} networkProvider
   * @param {ProjectsService} project
   * @param {ServersService} serversService
   * @param {TranslateService} translate
   * @param {ImageApiProvider} imageApiProvider
   * @param {ServerApiProvider} serverApiProvider
   */
  constructor(
    protected actionSheetCtrl: ActionSheetController,
    protected modal: ModalController,
    protected navCtrl: NavController,
    protected modalCtrl: ModalController,
    protected imagesService: ImagesService,
    protected networkProvider: NetworkProvider,
    protected project: ProjectsService,
    protected serversService: ServersService,
    protected translate: TranslateService,
    protected imageApiProvider: ImageApiProvider,
    protected serverApiProvider: ServerApiProvider,
  ) {
    this.images = this.imagesService.getImagesByType('snapshot');
  }

  /**
   * Change the selected segment and load all images of this type
   */
  changeType() {
    this.images = this.imagesService.getImagesByType(this.type);
  }

  /**
   * Toggle a the backup list for a specific server
   * @param {number} id
   */
  toggle(id: number) {
    if (this.visible[id] !== undefined) {
      this.visible[id] = !this.visible[id];
    } else {
      this.visible[id] = true;
    }
  }

  /**
   * Create a new backup of the server
   * @param {Server} server
   */
  createBackup(server: Server) {
    if (this.networkProvider.has_connection) {
      this.serverApiProvider.create_backup(server.id).then(() => {
        this.loadImages();
        this.backup_done = true;
        setTimeout(() => this.loading_done = false, 3000);
      })
    } else {
      this.networkProvider.displayNoNetworkNotice();
    }
  }

  /**
   * Open the Modal for the Backup Settings
   */
  backupSettingsModal(server) {
    if (this.networkProvider.has_connection) {
      let modal = this.modalCtrl.create(backupSettingsModal, {server: server});
      modal.present();
    } else {
      this.networkProvider.displayNoNetworkNotice();
    }
  }

  /**
   * Load all images new from the api
   */
  loadImages() {
    this.loading = true;
    this.imagesService.reloadImages().then(() => {
      this.images = this.imagesService.getImagesByType(this.type);
      this.loading = false;
      this.loading_done = true;
      setTimeout(() => this.loading_done = false, 3000);
    });
  }

  /**
   * Open the renaming of an image
   * @param image
   */
  openEdit(image) {
    if (this.networkProvider.has_connection) {
      this.modal.create(editImageModal, {image: image}).present();
    } else {
      this.networkProvider.displayNoNetworkNotice();
    }
  }

  /**
   * Delete an image
   * @param {Image} image
   */
  delete(image: Image) {
    if (this.networkProvider.has_connection) {
      let _delete_confirmation: string = '';
      this.translate.get('ACTIONS.DELETE_CONFIRMATION').subscribe(text => {
        _delete_confirmation = text;
      });
      if (confirm(_delete_confirmation)) {
        this.imageApiProvider.delete(image.id).then((data) => {
          this.loadImages();
        });
      }
    } else {
      this.networkProvider.displayNoNetworkNotice();
    }
  }

  /**
   * Open all available actions for the image
   * @param {Image} image
   */
  openActionSheets(image: Image) {
    var actions;
    let _title: string = '';
    this.translate.get('PAGE.IMAGES.ACTIONS.TITLE', {imageDescription: image.description}).subscribe((text) => {
      _title = text;
    });
    let _delete: string = '';
    this.translate.get('ACTIONS.DELETE').subscribe(text => {
      _delete = text;
    });
    let _edit: string = '';
    this.translate.get('ACTIONS.EDIT').subscribe(text => {
      _edit = text;
    });
    let _create_server: string = '';
    this.translate.get('ACTIONS.CREATE_SERVER').subscribe(text => {
      _create_server = text;
    });
    let _cancel: string = '';
    this.translate.get('ACTIONS.CANCEL').subscribe(text => {
      _cancel = text;
    });
    if (image.type == 'system') {
      actions = {
        title: _title,
        cssClass: 'action-sheets-basic-page',
        buttons: [
          {
            text: _create_server,
            icon: 'add',
            handler: () => {
              this.modal.create(addServerModal, {selected_image: image.id}).present();
            }
          },
          {
            text: _cancel,
            role: 'cancel', // will always sort to be on the bottom
            icon: 'close',
            handler: () => {
              console.log('Cancel clicked');
            }
          }
        ]
      }
    } else {
      actions = {
        title: _title,
        cssClass: 'action-sheets-basic-page',
        buttons: [
          {
            text: _delete,
            role: 'destructive',
            icon: 'trash',
            handler: () => {
              this.delete(image);
            }
          },
          {
            text: _edit,
            icon: 'brush',
            handler: () => {
              this.openEdit(image);
            }
          },
          {
            text: _create_server,
            icon: 'add',
            handler: () => {
              this.modal.create(addServerModal, {selected_image: image.id}).present();
            }
          },
          {
            text: _cancel,
            role: 'cancel', // will always sort to be on the bottom
            icon: 'close',
            handler: () => {
              console.log('Cancel clicked');
            }
          }
        ]
      }
    }
    let actionSheet = this.actionSheetCtrl.create(actions);
    actionSheet.present();
  }
}
