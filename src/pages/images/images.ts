import {Component} from '@angular/core';
import {ProjectsService} from "../../models/project/ProjectsService";
import {ActionSheetController, ModalController, NavController} from "ionic-angular";
import {ImageApiProvider} from "../../providers/image-api/image-api";
import {editImageModal} from "./editImage/editImage";
import {project} from "../../models/project/project";


@Component({
  selector: 'page-images',
  templateUrl: 'images.html'
})
export class ImagesPage {
  public images = [];

  constructor(public project: ProjectsService, public modal: ModalController, public imageApiProvider: ImageApiProvider, public navCtrl: NavController, public actionSheetCtrl: ActionSheetController) {
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
    if (confirm('Möchten Sie diese Image wirklich unwideruflich löschen?')) {
      this.imageApiProvider.delete(image.id).then((data) => {
        this.loadImages();
      });
    }
  }

  public openActionSheets(image) {
    var actions;
    if (image.type == 'system') {
      actions = {
        title: 'Aktionen für das Image ' + image.description,
        cssClass: 'action-sheets-basic-page',
        buttons: [
          {
            text: 'Abbrechen',
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
        title: 'Aktionen für das Image ' + image.name,
        cssClass: 'action-sheets-basic-page',
        buttons: [
          {
            text: 'Löschen',
            role: 'destructive',
            icon: 'trash',
            handler: () => {
              this.delete(project);
            }
          },
          {
            text: 'Edit',
            icon: 'brush',
            handler: () => {
              this.openEdit(image);
            }
          },
          {
            text: 'Abbrechen',
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
