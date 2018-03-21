import {Component} from '@angular/core';
import {ProjectsService} from "../../../models/project/ProjectsService";
import {LoadingController, NavController, NavParams, ViewController} from "ionic-angular";
import {ImageApiProvider} from "../../../providers/image-api/image-api";
import {SshKeyApiProvider} from "../../../providers/ssh-key-api/ssh-key-api";


@Component({
  selector: 'modal-editSSHKey',
  templateUrl: 'editSSHKey.html'
})
export class editSSHKeyModal {
  public ssh_key: any;

  constructor(public project: ProjectsService, public viewCtrl: ViewController, public sshKeyApi: SshKeyApiProvider, public navParams: NavParams, public navCtrl: NavController, public loadingCtrl: LoadingController) {
    this.ssh_key = navParams.get('ssh_key');
  }


  public updateImage() {
    let loader = this.loadingCtrl.create();
    loader.present();
    this.sshKeyApi.changeName(this.ssh_key.id, this.ssh_key.name).then(() => {
      loader.dismiss();
      this.dismiss();
    });

  }

  public dismiss() {
    this.viewCtrl.dismiss();
  }
}
