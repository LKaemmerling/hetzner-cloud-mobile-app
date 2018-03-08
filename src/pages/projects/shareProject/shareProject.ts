import {Component} from '@angular/core';
import {ProjectsService} from "../../../models/project/ProjectsService";
import {project} from "../../../models/project/project";
import {NavParams, ViewController} from "ionic-angular";
import {LocationApiProvider} from "../../../providers/location-api/location-api";
import {TranslateService} from "@ngx-translate/core";
import {Storage} from "@ionic/storage";
import {BarcodeScanner} from "@ionic-native/barcode-scanner";

@Component({
  selector: 'modal-shareProject',
  templateUrl: 'shareProject.html'
})
export class shareProjectModal {
  public project: project;


  constructor(public viewCtrl: ViewController, public navparam: NavParams, protected translate: TranslateService, protected storage: Storage, public barcodeScanner: BarcodeScanner) {
    this.project = navparam.get('project')
  }

  public dismiss() {
    this.viewCtrl.dismiss();
  }
}
