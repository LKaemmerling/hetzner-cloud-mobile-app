import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {DeleteAllDataPage} from "../delete-all-data/delete-all-data";

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  constructor(public navCtrl: NavController) {

  }

  openDeleteAllPage() {
    this.navCtrl.push(DeleteAllDataPage);
  }
}
