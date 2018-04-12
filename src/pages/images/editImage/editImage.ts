import {Component} from '@angular/core';
import {ProjectsService} from "../../../modules/hetzner-cloud-data/project/projects.service";
import {LoadingController, NavController, NavParams, ViewController} from "ionic-angular";
import {ImageApiProvider} from "../../../providers/image-api/image-api";
import {Image} from "../../../modules/hetzner-cloud-data/servers/server";

/**
 * This modal makes it possible to edit a image
 */
@Component({
  selector: 'modal-editImage',
  templateUrl: 'editImage.html'
})
export class editImageModal {
  /**
   * The image
   */
  public image: Image;

  /**
   * Constructor
   * @param {ProjectsService} project
   * @param {ViewController} viewCtrl
   * @param {ImageApiProvider} imageApiProvider
   * @param {NavParams} navParams
   * @param {NavController} navCtrl
   * @param {LoadingController} loadingCtrl
   */
  constructor(protected project: ProjectsService, protected viewCtrl: ViewController, protected imageApiProvider: ImageApiProvider, protected navParams: NavParams, protected navCtrl: NavController, protected loadingCtrl: LoadingController) {
    this.image = navParams.get('image');
  }

  /**
   * Update a image and make the api call
   */
  public updateImage() {
    let loader = this.loadingCtrl.create();
    loader.present();
    this.imageApiProvider.update(this.image.id, this.image.description).then(() => {
      if (this.image.type == 'snapshot') {
        this.imageApiProvider.changeProtection(this.image.id, this.image.protection.delete).then(() => {
          loader.dismiss();
          this.dismiss();
        });
      } else {
        loader.dismiss();
        this.dismiss();
      }
    });

  }

  /**
   * Dissmiss the modal
   */
  public dismiss() {
    this.viewCtrl.dismiss();
  }
}
