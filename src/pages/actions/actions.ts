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
  public loading:boolean = false;
  public loading_done:boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public actionsApi: ActionsApiProvider) {
    this.loadActions();
  }
  loadActions() {
    this.loading = true;
    this.actionsApi.getActions().then((data) => {
      this.actions = data['actions'];
      this.loading = false;
      this.loading_done = true;
      setTimeout(() => this.loading_done = false,3000);
    })
  }

  refresh(refresher) {
    this.loadActions();
    refresher.complete();
  }

}
