import { Component } from '@angular/core';
import { ProjectsService } from '../../../../modules/hetzner-cloud-data/project/projects.service';
import { ViewController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { NetworkProvider } from '../../../../modules/hetzner-app/network/network';
import { AccountService } from '../../../../modules/hetzner-robot-data/accounts/account.service';

/**
 * Add Project modal
 */
@Component({
    selector: 'modal-account-add',
    templateUrl: 'account-add.html',
})
export class AccountAddModal {
    /**
     * the name of the account
     * @type {string}
     */
    public name: string;
    /**
     * username
     * @type {string}
     */
    public username: string;
    /**
     * the password
     * @type {string}
     */
    public password: string;
    /**
     *
     * @type {boolean}
     */
    public can_order: boolean = false;
    /**
     * if there is an error this would be displayed here
     * @type {string}
     */
    public error: string = null;

    /**
     * Constructor
     * @param {ProjectsService} project
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
        protected barcodeScanner: BarcodeScanner
    ) {}

    /**
     * Save the given project and validate it
     */
    public saveAccount() {
        if (this.name == null || this.name.length == 0) {
            this.error = 'PAGE.PROJECTS.MODAL.ADD.ERRORS.REQUIRED_NAME';
            return;
        }
        /*if (this.project.projects != null && this.project.projects.filter(vendor => (vendor.name === this.project_name)).length > 0) {
      this.error = 'PAGE.PROJECTS.MODAL.ADD.ERRORS.NAME_ALREADY_USED';
      return;
    }*/

        var new_account = {
            name: this.name,
            username: this.username,
            password: this.password,
            can_order: this.can_order,
        };
        this.accountService.addAccount(new_account);
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
