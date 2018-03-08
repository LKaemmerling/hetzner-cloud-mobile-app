import {Component} from '@angular/core';
import {NavParams, ViewController} from "ionic-angular";
import {TranslateService} from "@ngx-translate/core";
import {Storage} from "@ionic/storage";
import {BarcodeScanner} from "@ionic-native/barcode-scanner";

@Component({
  selector: 'modal-shareProject',
  templateUrl: 'shareProject.html'
})
export class shareProjectModal {
  public project: string;


  constructor(public viewCtrl: ViewController, public navparam: NavParams, protected translate: TranslateService, protected storage: Storage, public barcodeScanner: BarcodeScanner) {
    this.project = JSON.stringify(navparam.get('project'))
  }

  public dismiss() {
    this.viewCtrl.dismiss();
  }
}
