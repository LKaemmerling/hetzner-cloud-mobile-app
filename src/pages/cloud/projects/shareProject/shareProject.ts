import {Component} from '@angular/core';
import {NavParams, ViewController} from 'ionic-angular';
import {TrackingService} from "../../../../modules/hetzner-app/tracking/tracking.service";

/**
 * This modal makes it possible to share a project
 */
@Component({
  selector: 'modal-shareProject',
  templateUrl: 'shareProject.html',
})
export class shareProjectModal {
  /**
   * This is the json string that will be encoded
   */
  public project: string;

  /**
   * Constructor
   * @param {ViewController} viewCtrl
   * @param {NavParams} navParam
   */
  constructor(protected viewCtrl: ViewController, protected navParam: NavParams, protected tracking: TrackingService) {
    this.project = JSON.stringify(navParam.get('project'));
    this.tracking.trackFeature('cloud.projects.share');
  }

  /**
   * Dismiss the modal
   */
  public dismiss() {
    this.viewCtrl.dismiss();
  }
}
