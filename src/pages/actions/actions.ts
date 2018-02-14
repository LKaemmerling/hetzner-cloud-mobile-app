import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {ActionsApiProvider} from "../../providers/actions-api/actions-api";

/**
 * Generated class for the ActionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-actions',
  templateUrl: 'actions.html',
})
export class ActionsPage {

  public actions: Array<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public actionsApi: ActionsApiProvider) {
    this.loadActions();
  }
  loadActions() {
    this.actionsApi.getActions().then((data) => {
      this.actions = data['actions'];

    })
  }

  refresh(refresher) {
    this.loadActions();
    refresher.complete();
  }

}
