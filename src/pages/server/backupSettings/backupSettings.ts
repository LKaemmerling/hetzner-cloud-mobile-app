import {Component} from '@angular/core';
import {ProjectsService} from "../../../models/project/ProjectsService";
import {NavController, NavParams, ViewController} from "ionic-angular";
import {ServerApiProvider} from "../../../providers/server-api/server-api";
import {ImageApiProvider} from "../../../providers/image-api/image-api";


@Component({
  selector: 'modal-backupSettings',
  templateUrl: 'backupSettings.html'
})
export class backupSettingsModal {
  public server: any;
  public backup_window: string;
  public images: Array<any>;
  public image: any = null;

  constructor(public project: ProjectsService, public viewCtrl: ViewController, public serverApiProvider: ServerApiProvider, public navParams: NavParams, public navCtrl: NavController, public imageApiProvider: ImageApiProvider) {
    this.server = navParams.get('server');
    this.backup_window = this.server.backup_window;
    this.imageApiProvider.getImages().then((data) => {
      this.images = data['images'];
    })
  }


  public disable_backups() {
    this.serverApiProvider.disable_backups(this.server.id);
    this.server.backup_window = null;
    this.dismiss();
  }

  public enable_backups() {
    if (this.backup_window != null) {
      this.serverApiProvider.enable_backups(this.server.id, this.backup_window);
      this.server.backup_window = this.backup_window;
    }
    this.dismiss();
  }

  public create_snapshot() {
    this.serverApiProvider.create_snapshot(this.server.id);
    this.imageApiProvider.getImages().then((data) => {
      this.images = data['images'];
    });
  }

  public create_backup() {
    this.serverApiProvider.create_backup(this.server.id);
    this.imageApiProvider.getImages().then((data) => {
      this.images = data['images'];
    });
  }

  public rebuild_from_image() {
    if (this.image != null) {
      this.serverApiProvider.rebuild(this.server.id, this.image.id);
    }
    this.dismiss();
  }

  public dismiss() {
    return this.viewCtrl.dismiss();
  }
}
