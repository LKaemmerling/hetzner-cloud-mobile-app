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


@Component({
  selector: 'page-images',
  templateUrl: 'images.html'
})
/**
 *
 */
export class ImagesPage {
  protected types: Array<string> = ['snapshot', 'backup', 'system'];
  /**
   *
   * @type {string}
   */
  public type: string = 'snapshot';
  /**
   *
   * @type {Image[]}
   */
  public images: Array<Image> = [];
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
   * @type {number[]}
   */
  public visible: Array<boolean> = [];

  /**
   *
   * @type {boolean}
   */
  public backup_done: boolean = false;

  /**
   *
   * @param {ActionSheetController} actionSheetCtrl
   * @param {ModalController} modal
   * @param {NavController} navCtrl
   * @param {ModalController} modalCtrl
   * @param {ImagesService} imagesService
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
    protected project: ProjectsService,
    protected serversService: ServersService,
    protected translate: TranslateService,
    protected imageApiProvider: ImageApiProvider,
    protected serverApiProvider: ServerApiProvider
  ) {
    this.images = this.imagesService.getImagesByType('snapshot');
  }

  /**
   *
   */
  public changeType() {
    this.images = this.imagesService.getImagesByType(this.type);
  }

  /**
   *
   * @param {number} id
   */
  public toggle(id: number) {
    if (this.visible[id] !== undefined) {
      this.visible[id] = !this.visible[id];
    } else {
      this.visible[id] = true;
    }
  }

  /**
   *
   * @param {Server} server
   */
  public createBackup(server: Server) {

    this.serverApiProvider.create_backup(server.id).then(() => {
      this.loadImages();
      this.backup_done = true;
      setTimeout(() => this.loading_done = false, 3000);
    })
  }

  /**
   * Open the Modal for the Backup Settings
   */
  public backupSettingsModal(server) {
    let modal = this.modalCtrl.create(backupSettingsModal, {server: server});
    modal.present();
  }

  /**
   *
   */
  public loadImages() {
    this.loading = true;
    this.imagesService.reloadImages().then(() => {
      this.images = this.imagesService.getImagesByType(this.type);
      this.loading = false;
      this.loading_done = true;
      setTimeout(() => this.loading_done = false, 3000);
    });
  }

  /**
   *
   * @param image
   */
  public openEdit(image) {
    this.modal.create(editImageModal, {image: image}).present();
  }

  /**
   *
   * @param {Image} image
   */
  public delete(image: Image) {
    let _delete_confirmation: string = '';
    this.translate.get('ACTIONS.DELETE_CONFIRMATION').subscribe(text => {
      _delete_confirmation = text;
    });
    if (confirm(_delete_confirmation)) {
      this.imageApiProvider.delete(image.id).then((data) => {
        this.loadImages();
      });
    }
  }

  /**
   *
   * @param {Image} image
   */
  public openActionSheets(image: Image) {
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
