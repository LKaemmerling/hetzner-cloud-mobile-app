import {Component} from '@angular/core';
import {NavParams, ViewController} from "ionic-angular";

/**
 * This modal makes it possible to share a project
 */
@Component({
  selector: 'modal-shareProject',
  templateUrl: 'shareProject.html'
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
  constructor(protected viewCtrl: ViewController, protected navParam: NavParams) {
    this.project = JSON.stringify(navParam.get('project'))
  }

  /**
   * Dismiss the modal
   */
  public dismiss() {
    this.viewCtrl.dismiss();
  }
}
