import {Component} from '@angular/core';
import {ProjectsService} from "../../../modules/hetzner-cloud-data/project/projects.service";
import {LoadingController, NavController, NavParams, ViewController} from "ionic-angular";
import {FloatingIpApiProvider} from "../../../providers/floating-ip-api/floating-ip-api";

/**
 * This modal makes it possible to rename a floating ip
 */
@Component({
  selector: 'modal-editFloatingIp',
  templateUrl: 'editFloatingIp.html'
})
export class editFloatingIpModal {
  /**
   * The given floating ip
   */
  public floatingIp: any;

  /**
   * Constructor
   * @param {NavController} navCtrl
   * @param {LoadingController} loadingCtrl
   * @param {ViewController} viewCtrl
   * @param {ProjectsService} project
   * @param {FloatingIpApiProvider} floatingIpProvider
   * @param {NavParams} navParams
   */
  constructor(
    protected navCtrl: NavController,
    protected loadingCtrl: LoadingController,
    protected viewCtrl: ViewController,
    protected project: ProjectsService,
    protected floatingIpProvider: FloatingIpApiProvider,
    protected navParams: NavParams) {
    this.floatingIp = navParams.get('floating_ip');
  }

  /**
   * Make the api call to update the floating ip
   */
  public updateIP() {
    let loader = this.loadingCtrl.create();
    loader.present();
    this.floatingIpProvider.changeDescription(this.floatingIp.id, this.floatingIp.description).then(() => {

      this.floatingIpProvider.changeProtection(this.floatingIp.id,this.floatingIp.protection.delete).then(() => {
        loader.dismiss();
        this.dismiss();
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
