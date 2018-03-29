import {Component} from '@angular/core';
import {ProjectsService} from "../../../modules/hetzner-cloud-data/project/projects.service";
import {LoadingController, NavController, NavParams, ViewController} from "ionic-angular";
import {ServerApiProvider} from "../../../providers/server-api/server-api";
import {ImageApiProvider} from "../../../providers/image-api/image-api";
import {Server} from "../../../modules/hetzner-cloud-data/servers/server";


@Component({
  selector: 'modal-backupSettings',
  templateUrl: 'backupSettings.html'
})
export class backupSettingsModal {
  /**
   *
   */
  public server: Server;
  /**
   *
   */
  public backup_window: string;
  /**
   *
   */
  public images: Array<any>;
  /**
   *
   * @type {null}
   */
  public image: any = null;
  /**
   *
   * @type {boolean}
   */
  public create_snapshot_done: boolean = false;
  /**
   *
   * @type {boolean}
   */
  public create_backup_done: boolean = false;

  /**
   *
   * @param {ProjectsService} project
   * @param {ViewController} viewCtrl
   * @param {ServerApiProvider} serverApiProvider
   * @param {NavParams} navParams
   * @param {NavController} navCtrl
   * @param {ImageApiProvider} imageApiProvider
   * @param {LoadingController} loadingCtrl
   */
  constructor(public project: ProjectsService, public viewCtrl: ViewController, public serverApiProvider: ServerApiProvider, public navParams: NavParams, public navCtrl: NavController, public imageApiProvider: ImageApiProvider, public loadingCtrl: LoadingController) {
    this.server = navParams.get('server');
    this.backup_window = this.server.backup_window;
    this.imageApiProvider.getImages().then((data) => {
      this.images = data['images'];
    })
  }

  /**
   *
   */
  public disable_backups() {
    var loader = this.loadingCtrl.create();
    loader.present();
    this.serverApiProvider.disable_backups(this.server.id).then(() => {
      this.server.backup_window = null;
      loader.dismiss();
      this.dismiss();
    });

  }

  /**
   *
   */
  public enable_backups() {

    if (this.backup_window != null) {
      var loader = this.loadingCtrl.create();
      loader.present();
      this.serverApiProvider.enable_backups(this.server.id, this.backup_window).then(() => {
        this.server.backup_window = this.backup_window;
        loader.dismiss();
      });
    }
    this.dismiss();
  }

  /**
   *
   */
  public create_snapshot() {
    this.create_snapshot_done = false;
    var loader = this.loadingCtrl.create();
    loader.present();
    this.serverApiProvider.create_snapshot(this.server.id).then(() => {
      this.imageApiProvider.getImages().then((data) => {
        this.images = data['images'];
        loader.dismiss();
        this.create_snapshot_done = true;
      });
    });

  }

  /**
   *
   */
  public create_backup() {
    this.create_backup_done = false;
    var loader = this.loadingCtrl.create();
    loader.present();
    this.serverApiProvider.create_backup(this.server.id).then(() => {
      this.imageApiProvider.getImages().then((data) => {
        this.images = data['images'];
        loader.dismiss();
        this.create_backup_done = true;
      });
    });
  }

  /**
   *
   */
  public rebuild_from_image() {
    if (this.image != null) {
      var loader = this.loadingCtrl.create();
      loader.present();
      this.serverApiProvider.rebuild(this.server.id, this.image.id).then(() => {
        loader.dismiss();
      });
    }
    this.dismiss();
  }

  /**
   *
   * @returns {Promise<any>}
   */
  public dismiss() {
    return this.viewCtrl.dismiss();
  }
}
