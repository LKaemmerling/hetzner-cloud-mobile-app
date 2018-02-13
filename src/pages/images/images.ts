import {Component} from '@angular/core';
import {ProjectsService} from "../../models/project/ProjectsService";
import {ActionSheetController, ModalController, NavController} from "ionic-angular";
import {ImageApiProvider} from "../../providers/image-api/image-api";
import {editImageModal} from "./editImage/editImage";
import {addServerModal} from "../server/addServer/addServer";
import {TranslateService} from "@ngx-translate/core";


@Component({
  selector: 'page-images',
  templateUrl: 'images.html'
})
export class ImagesPage {
  public images = [];

  constructor(public project: ProjectsService, public modal: ModalController, public imageApiProvider: ImageApiProvider, public navCtrl: NavController, public actionSheetCtrl: ActionSheetController, protected translate: TranslateService) {
    this.loadImages();
  }

  public loadImages() {
    this.imageApiProvider.getImages().then((data) => {
      this.images = data['images'];
    });
  }

  public refresh(refresher) {
    this.loadImages();
    refresher.complete();
  }

  public openEdit(image) {
    this.modal.create(editImageModal, {image: image});
  }

  public delete(image) {
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

  public openActionSheets(image) {
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
            text: 'Neuen Server erstellen',
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
