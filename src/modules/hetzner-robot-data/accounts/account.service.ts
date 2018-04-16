import {Storage} from "@ionic/storage";
import {Account} from "./account";
import {Injectable} from '@angular/core';
import {NetworkProvider} from "../../hetzner-app/network/network";

/**
 * Service that contains all storage methods for the robot accounts.
 */
@Injectable()
export class AccountService {
  /**
   * All accounts
   * @type {any[]}
   */
  public accounts: Array<Account> = [];
  /**
   * The currently selected account
   * @type {null}
   */
  public actual_account: Account = null;

  /**
   * Constructor
   * @param {Storage} storage
   * @param {NetworkProvider} network
   */
  constructor(private storage: Storage, private network: NetworkProvider) {
    this.accounts = [];
  }

  /**
   * Load all accounts from the local storage
   */
  public loadAccounts() {
    return new Promise((resolve, reject) => {
      this.storage.get('robot_accounts').then((val) => {
        if (val !== undefined) {
          this.accounts = val;
        }
        this.storage.get('robot_actual_account').then((val) => {
          if (val !== undefined) {
            this.actual_account = val;
            resolve();
          }
        });
      });

    });
  }

  /**
   * Select a account as currently selected project
   * @param {Account} account
   * @returns {() => Promise<void>}
   */
  public selectAccount(account: Account) {
    return new Promise((resolve) => {
      this.actual_account = account;
      this.storage.set('robot_actual_account', this.actual_account);
      resolve(account);
    });
  }

  /**
   * Save all accounts to the storage
   */
  public saveAccounts() {
    this.storage.set('robot_accounts', this.accounts);
  }

  /**
   * Add a new project to the storage
   * @param {Account} account
   */
  public addAccount(account: Account) {
    if (this.accounts == null) {
      this.accounts = [];
    }
    this.accounts.push(account);
  }

  /**
   * Remove a project from the storage
   * @param {Account} account
   */
  public removeAccount(account: Account) {
    var tmp = [];
    if (this.actual_account == null || (this.actual_account.username == account.username)) {
      this.actual_account = null;
    }
    this.accounts.forEach((_account, key) => {

      if (account.name !== _account.name && _account.username !== account.username) {
        tmp.push(_account);
      }
    });
    this.accounts = tmp;
    this.saveAccounts();
    return this.accounts;
  }

}
