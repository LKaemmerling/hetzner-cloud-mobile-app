import {Component} from '@angular/core';
import {NavParams, ViewController} from 'ionic-angular';
import {TranslateService} from '@ngx-translate/core';
import {Storage} from '@ionic/storage';
import {BarcodeScanner} from '@ionic-native/barcode-scanner';
import {NetworkProvider} from '../../../../modules/hetzner-app/network/network';
import {AccountService} from '../../../../modules/hetzner-robot-data/accounts/account.service';
import {TrackingService} from "../../../../modules/hetzner-app/tracking/tracking.service";

/**
 * Add Project modal
 */
@Component({
  selector: 'modal-account-edit',
  templateUrl: 'account-edit.html',
})
export class AccountEditModal {
  /**
   * The Account
   * @type {account}
   */
  public account: Account;

  /**
   * if there is an error this would be displayed here
   * @type {string}
   */
  public error: string = null;

  /**
   * Constructor
   * @param {AccountService} accountService
   * @param {ViewController} viewCtrl
   * @param {NetworkProvider} network
   * @param {TranslateService} translate
   * @param {Storage} storage
   * @param {BarcodeScanner} barcodeScanner
   */
  constructor(
    protected accountService: AccountService,
    protected viewCtrl: ViewController,
    protected network: NetworkProvider,
    protected translate: TranslateService,
    protected storage: Storage,
    protected barcodeScanner: BarcodeScanner,
    protected navParams: NavParams,
    protected tracking: TrackingService
  ) {
    this.account = this.navParams.get('account');
    tracking.trackFeature('robot.account.edit');
  }

  /**
   * Save the given project and validate it
   */
  public saveAccount() {
    if (this.account.name == null || this.account.name.length == 0) {
      this.error = 'PAGE.PROJECTS.MODAL.ADD.ERRORS.REQUIRED_NAME';
      return;
    }
    /*if (this.project.projects != null && this.project.projects.filter(vendor => (vendor.name === this.project_name)).length > 0) {
  this.error = 'PAGE.PROJECTS.MODAL.ADD.ERRORS.NAME_ALREADY_USED';
  return;
}*/
    this.accountService.saveAccounts();
    this.dismiss();
  }

  /**
   * Dismiss the modal
   */
  public dismiss() {
    this.viewCtrl.dismiss();
  }
}
