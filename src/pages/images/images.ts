import {Component} from '@angular/core';
import {ProjectsService} from "../../modules/hetzner-cloud-data/project/projects.service";
import {ActionSheetController, ModalController, NavController} from "ionic-angular";
import {ImageApiProvider} from "../../providers/image-api/image-api";
import {editImageModal} from "./editImage/editImage";
import {addServerModal} from "../server/addServer/addServer";
import {TranslateService} from "@ngx-translate/core";
import {ImagesService} from "../../modules/hetzner-cloud-data/images/images.service";
import {Image} from "../../modules/hetzner-cloud-data/servers/server";


@Component({
  selector: 'page-images',
  templateUrl: 'images.html'
})
/**
 *
 */
export class ImagesPage {
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
   * @param {ProjectsService} project
   * @param {ModalController} modal
   * @param {ImageApiProvider} imageApiProvider
   * @param {ImagesService} imagesService
   * @param {NavController} navCtrl
   * @param {ActionSheetController} actionSheetCtrl
   * @param {TranslateService} translate
   */
  constructor(
    protected project: ProjectsService,
    protected modal: ModalController,
    protected imageApiProvider: ImageApiProvider,
    protected imagesService: ImagesService,
    protected navCtrl: NavController,
    protected actionSheetCtrl: ActionSheetController,
    protected translate: TranslateService
  ) {
    this.images = this.imagesService.images;
  }

  /**
   *
   */
  public loadImages() {
    this.loading = true;
    this.imagesService.reloadImages().then(() => {
      this.images = this.imagesService.images;
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
