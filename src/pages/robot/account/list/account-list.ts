import {Component, forwardRef, Inject} from '@angular/core';
import {ActionSheetController, ModalController} from "ionic-angular";
import {TranslateService} from "@ngx-translate/core";
import {Storage} from "@ionic/storage";
import {state, style, transition, trigger, useAnimation} from "@angular/animations";
import {fadeIn, fadeOut} from "ng-animate";
import {Account} from "../../../../modules/hetzner-robot-data/accounts/account";
import {HetznerRobotDataService} from "../../../../modules/hetzner-robot-data/hetzner-robot-data.service";
import {AccountService} from "../../../../modules/hetzner-robot-data/accounts/account.service";
import {NetworkProvider} from "../../../../modules/hetzner-app/network/network";
import {addAccountModal} from "../add/addAccount";
import {ServerApiProvider} from "../../../../modules/hetzner-robot-api/server-api/server-api";
import {HetznerRobotMenuService} from "../../../../modules/hetzner-robot-data/hetzner-robot-menu.service";

/**
 * This is the project page, where you can create, activate, share and delete projects
 */
@Component({
  selector: 'page-account-list',
  templateUrl: 'account-list.html',
  animations: [
    trigger('animate', [
      state('active', style({
        display: 'block',
      })),
      state('*', style({
        display: 'none',
      })),
      transition('* => active', useAnimation(fadeIn, {params: {timing: 0.3, delay: 0}})),
      transition('active => *', useAnimation(fadeOut, {params: {timing: 0, delay: 0}}))])
  ],
})
export class AccountListPage {
  /**
   * All projects
   * @type {project[]}
   */
  public _accounts: Array<Account> = [];
  /**
   * Contain all the visible submenus
   * @type {any[]}
   */
  public visible = [];

  /**
   * Constructor
   * @param {ActionSheetController} actionSheetCtrl
   * @param {ModalController} modal
   * @param {HetznerRobotDataService} hetznerRobotData
   * @param {HetznerRobotMenuService} hetznerRobotMenuService
   * @param {AccountService} accountService
   * @param {TranslateService} translate
   * @param {Storage} storage
   * @param {NetworkProvider} network
   * @param {ServerApiProvider} serverApi
   */
  constructor(
    protected actionSheetCtrl: ActionSheetController,
    protected modal: ModalController,
    protected hetznerRobotData: HetznerRobotDataService,
    @Inject(forwardRef(() => HetznerRobotMenuService)) protected hetznerRobotMenuService:  HetznerRobotMenuService,
    protected accountService: AccountService,
    protected translate: TranslateService,
    protected storage: Storage,
    protected network: NetworkProvider,
    protected serverApi: ServerApiProvider
  ) {
    this.accountService.loadAccounts().then(() => {

      this._accounts = accountService.accounts;
      this.serverApi.getServers().then((val) => {
        console.log(val);
      })
    })

  }

  /**
   * Open a submenu
   * @param menuId
   */
  openSubMenu(menuId) {
    if (this.visible[menuId] != undefined && this.visible[menuId] == 'active') {
      this.visible = [];
    } else {
      this.visible = [];
      this.visible[menuId] = 'active';
    }

  }


  /**
   * Select a project so this is the new selected project
   * @param {Account} account
   */
  selectAccount(account: Account) {
    if (this.network.has_connection) {
      this.accountService.selectAccount(account).then(() => {
        this.hetznerRobotData.loadDataFromNetwork();
        this.hetznerRobotMenuService.generateMenu();
      });
    } else {
      this.network.displayNoNetworkNotice();
    }
  }

  /**
   * Delete a project
   * @param {project} project
   */
  public delete(account: Account) {
    this._accounts = this.accountService.removeAccount(account);
    if (this.accountService.accounts == null || this.accountService.accounts.length == 0) {
      this.accountService.selectAccount(null).then(() => {
        this.hetznerRobotData.loadDataFromNetwork();
      });
    } else {
      this.accountService.selectAccount(this.accountService.accounts[0]).then(() => {
        this.hetznerRobotData.loadDataFromNetwork();
      });
    }
    this.hetznerRobotMenuService.generateMenu();
    this._accounts = this.accountService.accounts;
  }

  openAddModal() {
    let modal = this.modal.create(addAccountModal);
    modal.onDidDismiss(() => {
      this.accountService.loadAccounts().then(() => {
        this._accounts = this.accountService.accounts;
      })
    });
    modal.present();
  }
}
