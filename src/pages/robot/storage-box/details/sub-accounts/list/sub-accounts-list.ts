import {Component} from '@angular/core';
import {ActionSheetController, LoadingController, NavParams} from 'ionic-angular';
import {fadeIn, fadeOut} from 'ng-animate';
import {StorageBoxApiProvider} from "../../../../../../modules/hetzner-robot-api/storage-box-api/storage-box-api";
import {TranslateService} from "@ngx-translate/core";

/**
 * This is the project page, where you can create, activate, share and delete projects
 */
@Component({
  selector: 'page-sub-accounts-list',
  templateUrl: 'sub-accounts-list.html',
})
export class StorageBoxSubAccountsListPage {
  /**
   * All available servers
   * @type {any[]}
   */
  public storagebox: any;
  public subAccounts: any;
  /**
   * Is the component in the loading process?
   * @type {boolean}
   */
  public loading: boolean = false;
  /**
   * Is the loading done?
   * @type {boolean}
   */
  public loading_done: boolean = false;
  /**
   * All visible submenus
   * @type {any[]}
   */
  public visible: Array<string> = [];
  /**
   * Is the loading done?
   * @type {boolean}
   */
  public error: string = "";

  public success: string = "";

  /**
   * Contstructor
   * @param {NavParams} NavParams
   * @param {StorageBoxApiProvider} storageBoxApi
   * @param {LoadingController} loadingCtrl
   */
  constructor(
    protected NavParams: NavParams,
    protected storageBoxApi: StorageBoxApiProvider,
    protected loadingCtrl: LoadingController,
    protected actionCtrl: ActionSheetController,
    protected translateService: TranslateService
  ) {
    this.storagebox = this.NavParams.get('storage_box');

  }

  ngOnInit() {
    this.loadSubAccounts();
  }

  loadSubAccounts() {
    this.loading = true;
    this.storageBoxApi.subaccounts(this.storagebox.id).then((val) => {
      this.loading = false;
      this.loading_done = true;
      this.subAccounts = val;
      setTimeout(() => (this.loading_done = false), 5000);
    }, (error) => {
      this.loading = false;
      this.error = error.message;
    });
  }

  /**
   *
   */
  openActions(subaccount) {
    let _title: string = '';
    this.translateService
      .get('ROBOT.PAGE.SUB_ACCOUNTS.LIST.ACTIONS.TITLE', {subAccount: subaccount.comment.length > 0 ? (subaccount.comment + " (" + subaccount.username + ")") : subaccount.username})
      .subscribe(text => {
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

    let _reset_password: string = '';
    this.translateService.get('ROBOT.PAGE.SUB_ACCOUNTS.LIST.ACTIONS.RESET_PASSWORD').subscribe(text => {
      _reset_password = text;
    });
    var buttons = [
      {
        text: _edit,
        icon: 'brush',
        handler: () => {
          alert('Not implemented yet')
        },
      },
      {
        text: _reset_password,
        icon: 'key',
        handler: () => {
          this._password_reset(subaccount);
        },
      },
      {
        text: _delete,
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this._delete(subaccount);
        },
      },
      {
        text: _cancel,
        role: 'cancel', // will always sort to be on the bottom
        icon: 'close',
        handler: () => {
          console.log('Cancel clicked');
        },
      },
    ];
    var actions = {
      title: _title,
      cssClass: 'action-sheets-basic-page',
      buttons: buttons,
    };
    let actionSheet = this.actionCtrl.create(actions);
    actionSheet.present();
  }

  protected _delete(subaccount) {
    let confirmation = '';
    this.translateService.get('ACTIONS.DELETE_CONFIRMATION').subscribe(text => {
      confirmation = text;
    });
    if (confirm(confirmation)) {
      let loader = this.loadingCtrl.create();
      loader.present();
      this.storageBoxApi.deleteSubaccount(this.storagebox.id, subaccount.username).then(data => {
        this.loadSubAccounts();
        let message = '';
        this.translateService.get('ROBOT.PAGE.SUB_ACCOUNTS.LIST.MESSAGES.DELETE', {subAccount: subaccount.comment.length > 0 ? (subaccount.comment + " (" + subaccount.username + ")") : subaccount.username}).subscribe(text => {
          message = text;
        });
        this.success = message;
        loader.dismiss();
        setTimeout(() => (this.success = ''), 10000);
      },  (error) => {
        loader.dismiss();
        this.loading = false;
        this.error = error.message;
      });
    }
  }

  protected _password_reset(subaccount) {
    let confirmation = '';
    this.translateService.get('ROBOT.PAGE.SUB_ACCOUNTS.LIST.ACTIONS.CONFIRM_RESET_PASSWORD',{subAccount: subaccount.comment.length > 0 ? (subaccount.comment + " (" + subaccount.username + ")") : subaccount.username}).subscribe(text => {
      confirmation = text;
    });
    if (confirm(confirmation)) {
      let loader = this.loadingCtrl.create();
      loader.present();
      this.storageBoxApi.resetPasswordOnSubaccount(this.storagebox.id, subaccount.username).then(data => {
        let message = '';
        this.translateService.get('ROBOT.PAGE.SUB_ACCOUNTS.LIST.MESSAGES.RESET_PASSWORD', {
          subAccount: subaccount.comment.length > 0 ? (subaccount.comment + " (" + subaccount.username + ")") : subaccount.username,
          password: data['password']
        },).subscribe(text => {
          message = text;
        });
        this.success = message;
        loader.dismiss();
        setTimeout(() => (this.success = ''), 10000);
      },  (error) => {
        loader.dismiss();
        this.loading = false;
        this.error = error.message;
      });
    }
  }
}
