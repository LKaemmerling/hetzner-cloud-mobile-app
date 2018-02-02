import {Component} from '@angular/core';
import {ProjectsService} from "../../models/project/ProjectsService";
import {ItemSliding, ModalController, NavController} from "ionic-angular";
import {ImageApiProvider} from "../../providers/image-api/image-api";
import {editImageModal} from "./editImage/editImage";


@Component({
  selector: 'page-images',
  templateUrl: 'images.html'
})
export class ImagesPage {
  public images = [];

  constructor(public project: ProjectsService, public modal: ModalController, public imageApiProvider: ImageApiProvider, public navCtrl: NavController) {
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

  public delete(image, slidingItem: ItemSliding) {
    if (confirm('Möchten Sie diese Image wirklich unwideruflich löschen?')) {
      this.imageApiProvider.delete(image.id).then((data) => {
        slidingItem.close();
        this.loadImages();
      });
    }
  }
}
