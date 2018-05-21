import {Component} from '@angular/core';
import {ProjectsService} from '../../../../modules/hetzner-cloud-data/project/projects.service';
import {LoadingController, NavController, NavParams, ViewController} from 'ionic-angular';
import {ServerApiProvider} from '../../../../modules/hetzner-cloud-api/server-api/server-api';
import {Server} from '../../../../modules/hetzner-cloud-data/servers/server';
import {TranslateService} from "@ngx-translate/core";
import {Clipboard} from "@ionic-native/clipboard";

/**
 * With this component you can change the rescue mode settings
 */
@Component({
  selector: 'modal-rescueMode',
  templateUrl: 'rescueMode.html',
})
export class rescueModeModal {
  /**
   * The server that should bechanges
   * @type {Server}
   */
  public server: Server;
  /**
   * The changed root password
   * @type {string}
   */
  public root_password: string = null;
  /**
   * The root password for the rescue mode
   * @type {string}
   */
  public root_password_reset: string = null;

  /**
   * Constructor
   * @param {ProjectsService} project
   * @param {ViewController} viewCtrl
   * @param {ServerApiProvider} serverApiProvider
   * @param {NavParams} navParams
   * @param {NavController} navCtrl
   * @param {LoadingController} loadingCtrl
   */
  constructor(
    protected project: ProjectsService,
    protected viewCtrl: ViewController,
    protected serverApiProvider: ServerApiProvider,
    protected navParams: NavParams,
    protected navCtrl: NavController,
    protected loadingCtrl: LoadingController,
    protected translateService: TranslateService,
    protected clipboard: Clipboard
  ) {
    this.server = navParams.get('server');
  }

  /**
   * Activate the rescue mode
   */
  public rescueActivate() {
    var loader = this.loadingCtrl.create();
    loader.present();
    this.serverApiProvider.enable_rescue(this.server.id).then(data => {
      this.root_password_reset = data['root_password'];
      loader.dismiss();
      // this.dismiss();
    });
  }

  /**
   * Activate the rescue mode and reset the server
   */
  public rescueActivateAndReset() {
    var loader = this.loadingCtrl.create();
    loader.present();
    this.serverApiProvider.enable_rescue(this.server.id).then(data => {
      this.serverApiProvider.reset(this.server.id).then(() => {
        this.root_password_reset = data['root_password'];
        loader.dismiss();
        this.translateService.get('GLOBAL.COPY_PASSWORD_TO_CLIPBOARD').subscribe(text => {
          if (confirm(text)) {
            this.clipboard.copy(data['root_password']);
          }
        });
        // this.dismiss();
      });
    });
  }

  /**
   * Reset the root Password
   */
  public resetRootpassword() {
    var loader = this.loadingCtrl.create();
    loader.present();
    this.serverApiProvider.resetPassword(this.server.id).then(data => {
      loader.dismiss();
      this.root_password = data['action'].root_password;
      this.translateService.get('GLOBAL.COPY_PASSWORD_TO_CLIPBOARD').subscribe(text => {
        if (confirm(text)) {
          this.clipboard.copy(data['action'].root_password);
        }
      });
    });
  }

  /**
   * Dismiss the modal
   */
  public dismiss() {
    this.viewCtrl.dismiss();
  }
}
