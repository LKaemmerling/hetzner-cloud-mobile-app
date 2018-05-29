import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {TrackingService} from "../../../modules/hetzner-app/tracking/tracking.service";

/**
 * This is the settings page, that contain all possible settings of the app
 */

@Component({
  selector: 'page-error',
  templateUrl: 'error.html',
})
export class ErrorPage {
  public error: any;

  /**
   * Constructor
   * @param {NavController} navCtrl
   * @param {NavParams} navParams
   */
  constructor(
    protected navCtrl: NavController,
    protected navParams: NavParams,
    protected tracking: TrackingService
  ) {

    tracking.trackFeature('global.error');
    this.error = this.navParams.get('error');
  }


}
