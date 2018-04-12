import {Component} from '@angular/core';
import {ProjectsService} from "../../modules/hetzner-cloud-data/project/projects.service";
import {ActionSheetController, ModalController, NavController} from "ionic-angular";
import {addFloatingIPModal} from "./addFloatingIp/addFloatingIP";
import {FloatingIpApiProvider} from "../../providers/floating-ip-api/floating-ip-api";
import {FloatingIPPage} from "./floatingIp/floatingIP";
import {FloatingIpsService} from "../../modules/hetzner-cloud-data/floating-ips/floating-ips.service";
import {NetworkProvider} from "../../modules/hetzner-app/network/network";
import {TranslateService} from "@ngx-translate/core";
import {editFloatingIpModal} from "./editFloatingIp/editFloatingIp";

/**
 * This page lists all available floating ips
 */
@Component({
  selector: 'page-floatingIPs',
  templateUrl: 'floatingIPs.html'
})
export class FloatingIPsPage {
  /**
   * All available floating ips
   * @type {any[]}
   */
  _floating_ips = [];
  /**
   * Is the componet in the loading process?
   * @type {boolean}
   */
  loading: boolean = false;
  /**
   * Is the loading done?
   * @type {boolean}
   */
  loading_done: boolean = false;

  /**
   * Constructor
   * @param {ActionSheetController} actionSheetCtrl
   * @param {NavController} navCtrl
   * @param {ModalController} modal
   * @param {FloatingIpsService} floatingApiService
   * @param {TranslateService} translateService
   * @param {ProjectsService} project
   * @param {FloatingIpApiProvider} floatingIpApiProvider
   * @param {NetworkProvider} networkProvider
   */
  constructor(
    protected actionSheetCtrl: ActionSheetController,
    protected navCtrl: NavController,
    protected modal: ModalController,
    protected floatingApiService: FloatingIpsService,
    protected translateService: TranslateService,
    protected project: ProjectsService,
    protected floatingIpApiProvider: FloatingIpApiProvider,
    protected networkProvider: NetworkProvider
  ) {
    this._floating_ips = this.floatingApiService.floating_ips;
  }

  /**
   * Load all floating ips from the storage
   */
  loadFloatingIPs() {
    this.loading = true;
    this.floatingApiService.reloadFloatingIps().then((data) => {
      this._floating_ips = this.floatingApiService.floating_ips;
      this.loading = false;
      this.loading_done = true;
      setTimeout(() => this.loading_done = false, 3000);
    });
  }

  /**
   * Open the modal for adding a new floating ip
   */
  openAddFloatingIP() {
    if (this.networkProvider.has_connection) {
      let modal = this.modal.create(addFloatingIPModal);
      modal.onDidDismiss(() => {
        this.loadFloatingIPs();
      });
      modal.present();
    } else {
      this.networkProvider.displayNoNetworkNotice();
    }
  }

  /**
   * Open the details page for the given floating ip
   * @param floatingIp
   */
  openFloatingIP(floatingIp) {
    this.navCtrl.push(FloatingIPPage, {floating_ip: floatingIp});
  }

  /**
   * Delete the given floating ip
   * @param floatingIp
   */
  delete(floatingIp) {

    if (this.networkProvider.has_connection) {
      let confirmation = '';
      this.translateService.get('ACTIONS.DELETE_CONFIRMATION').subscribe((text) => {
        confirmation = text;
      })
      if (confirm(confirmation)) {
        this.floatingIpApiProvider.deleteFloatingIp(floatingIp.id).then((data) => {
          this.loadFloatingIPs();
        });
      }
    } else {
      this.networkProvider.displayNoNetworkNotice();
    }
  }

  /**
   * Open the edit modal for the floating ip
   */
  openEditFloatingIp(floatingIp) {
    if (this.networkProvider.has_connection) {
      this.modal.create(editFloatingIpModal, {floating_ip: floatingIp}).present();
    } else {
      this.networkProvider.displayNoNetworkNotice();
    }
  }

  /**
   * Open all available actions for the given floating ip
   * @param floatingIp
   */
  openActionSheets(floatingIp) {
    let _title: string = '';
    this.translateService.get('PAGE.FLOATING_IPS.ACTIONS.TITLE', {floatingIpDescription: floatingIp.description}).subscribe((text) => {
      _title = text;
    });
    let _delete: string = '';
    this.translateService.get('ACTIONS.DELETE').subscribe(text => {
      _delete = text;
    });
    let _edit: string = '';
    this.translateService.get('ACTIONS.EDIT').subscribe(text => {
      _edit = text;
    });
    let _cancel: string = '';
    this.translateService.get('ACTIONS.CANCEL').subscribe(text => {
      _cancel = text;
    });
    let _open_details: string = '';
    this.translateService.get('ACTIONS.OPEN_DETAILS').subscribe(text => {
      _open_details = text;
    });
    var buttons = [
      {
        text: _open_details,
        icon: 'information-circle',
        handler: () => {
          this.openFloatingIP(floatingIp);
        }
      },
      {
        text: _edit,
        icon: 'brush',
        handler: () => {
          this.openEditFloatingIp(floatingIp);
        }
      },
      {
        text: _cancel,
        role: 'cancel', // will always sort to be on the bottom
        icon: 'close',
        handler: () => {
          console.log('Cancel clicked');
        }
      }
    ];

    if (floatingIp.protection.delete == false) {
      buttons.unshift({
        text: _delete,
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.delete(floatingIp);
        }
      })
    }
    var actions = {
      title: _title,
      cssClass: 'action-sheets-basic-page',
      buttons: buttons
    }
    let actionSheet = this.actionSheetCtrl.create(actions);
    actionSheet.present();
  }
}
