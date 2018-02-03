import {Component} from '@angular/core';
import {ProjectsService} from "../../../models/project/ProjectsService";
import {LoadingController, NavController, NavParams, ViewController} from "ionic-angular";
import {ImageApiProvider} from "../../../providers/image-api/image-api";


@Component({
  selector: 'modal-editImage',
  templateUrl: 'editImage.html'
})
export class editImageModal {
  public image: any;

  constructor(public project: ProjectsService, public viewCtrl: ViewController, public imageApiProvider: ImageApiProvider, public navParams: NavParams, public navCtrl: NavController, public loadingCtrl: LoadingController) {
    this.image = navParams.get('image');
  }


  public updateImage() {
    let loader = this.loadingCtrl.create();
    loader.present();
    this.imageApiProvider.update(this.image.id, this.image.description).then(() => {
      loader.dismiss();
      this.dismiss();
    });

  }

  public dismiss() {
    this.viewCtrl.dismiss();
  }
}
