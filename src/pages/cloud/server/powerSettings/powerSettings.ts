import {Component} from '@angular/core';
import {ProjectsService} from '../../../../modules/hetzner-cloud-data/project/projects.service';
import {LoadingController, NavController, NavParams, ViewController} from 'ionic-angular';
import {ServerApiProvider} from '../../../../modules/hetzner-cloud-api/server-api/server-api';
import {Server} from '../../../../modules/hetzner-cloud-data/servers/server';
import {TrackingService} from "../../../../modules/hetzner-app/tracking/tracking.service";

/**
 * This modal makes it possible to change the power settins of the server
 */
@Component({
  selector: 'modal-powerSettings',
  templateUrl: 'powerSettings.html',
})
export class powerSettingsModal {
  /**
   * The specific server
   */
  public server: Server;

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
    protected tracking: TrackingService
  ) {
    this.server = navParams.get('server');
    tracking.trackFeature('cloud.server.power');
  }

  /**
   * Makes a reset api call that reset the server
   */
  public reset() {
    var loader = this.loadingCtrl.create();
    loader.present();
    this.serverApiProvider.reset(this.server.id).then(() => {
      loader.dismiss();
      this.dismiss();
    });
  }

  /**
   * Makes a shutdown api call that shutdown the server
   */
  public shutdown() {
    var loader = this.loadingCtrl.create();
    loader.present();
    this.serverApiProvider.shutdown(this.server.id).then(() => {
      loader.dismiss();
      this.dismiss();
    });
  }

  /**
   * Makes a power off api call that power off the server
   */
  public powerOff() {
    var loader = this.loadingCtrl.create();
    loader.present();
    this.serverApiProvider.powerOff(this.server.id).then(() => {
      loader.dismiss();
      this.dismiss();
    });
  }

  /**
   * Makes a power on api call that power on the server
   */
  public powerOn() {
    var loader = this.loadingCtrl.create();
    loader.present();
    this.serverApiProvider.powerOn(this.server.id).then(() => {
      loader.dismiss();
      this.dismiss();
    });
  }

  /**
   * Dismiss the modal
   */
  public dismiss() {
    this.viewCtrl.dismiss();
  }
}
