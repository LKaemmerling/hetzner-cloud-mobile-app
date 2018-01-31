import {Component} from '@angular/core';
import {ProjectsService} from "../../../models/project/ProjectsService";
import {App, NavController, NavParams, ViewController} from "ionic-angular";
import {RestProvider} from "../../../providers/rest/rest";


@Component({
  selector: 'modal-backupSettings',
  templateUrl: 'backupSettings.html'
})
export class backupSettingsModal {
  public server: any;
  public backup_window: string;

  constructor(public project: ProjectsService, public viewCtrl: ViewController, public rest: RestProvider, public navParams: NavParams, public navCtrl: NavController, public appCtrl: App) {
    this.server = navParams.get('server');
    this.backup_window = this.server.backup_window
  }


  public disable_backups() {
    this.rest.disable_backups(this.server.id);
    this.server.backup_window = null;
    this.viewCtrl.dismiss();
  }

  public enable_backups() {
    this.rest.enable_backups(this.server.id, this.backup_window);
    this.server.backup_window = this.backup_window;
    this.viewCtrl.dismiss();
  }
}
