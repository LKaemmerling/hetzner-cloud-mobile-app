import {Injectable} from '@angular/core';
import {HomePage} from "../../pages/global/home/home";
import {HetznerStatusPage} from "../../pages/global/hetzner-status/hetzner-status";
import {SettingsPage} from "../../pages/global/settings/settings";
import {AccountListPage} from "../../pages/robot/account/list/account-list";
import {AccountService} from "./accounts/account.service";
import {Platform} from "ionic-angular";
import {HetznerRobotDataService} from "./hetzner-robot-data.service";
import {ServerListPage} from "../../pages/robot/server/list/server-list";
import {StorageBoxListPage} from "../../pages/robot/storage-box/list/storage-box-list";
import {SshKeyListPage} from "../../pages/robot/sshkeys/list/ssh-key-list";
import {ServerMarketListPage} from "../../pages/robot/market/server_market/list/server-market-list";

/**
 * Service that centralised all methods for the hetzner robot menu
 */
@Injectable()
export class HetznerRobotMenuService {

  public icon = 'hetzner-robot-icon';

  public text = 'Robot';
  /**
   *
   * @type {({key: string; icon: string; page: HomePage; protected: boolean; hidden: boolean; special: null; has_important: boolean} | {key: string; icon: string; page: AccountListPage; protected: boolean; hidden: boolean; special: string; has_important: boolean} | {key: string; icon: string; page: ServerListPage; protected: boolean; hidden: boolean; special: null; has_important: boolean} | {key: string; icon: string; page: StorageBoxListPage; protected: boolean; hidden: boolean; special: null; has_important: boolean} | {key: string; icon: string; page: SshKeyListPage; protected: boolean; hidden: boolean; special: null; has_important: boolean} | {key: string; icon: string; page: ServerMarketListPage; protected: boolean; hidden: boolean; needs_order: boolean} | {key: string; icon: string; page: HetznerStatusPage; protected: boolean; hidden: boolean; special: null; has_important: boolean} | {key: string; icon: string; page: SettingsPage; protected: boolean; hidden: boolean; special: null; has_important: boolean})[]}
   */
  public menu_entries = [
    {
      key: 'PAGE.HOME.TITLE',
      icon: 'fa-home',
      page: HomePage,
      protected: false,
      hidden: false,
      special: null,
      has_important: false
    },
    {
      key: 'ROBOT.PAGE.ACCOUNTS.TITLE',
      icon: 'fa-user',
      page: AccountListPage,
      protected: false,
      hidden: false,
      special: 'accounts',
      has_important: false
    },
    {
      key: 'ROBOT.PAGE.SERVERS.TITLE',
      icon: 'fa-server',
      page: ServerListPage,
      protected: true,
      hidden: true,
      special: null,
      has_important: false
    },
    {
      key: 'ROBOT.PAGE.STORAGE_BOXES.TITLE',
      icon: 'fa-hdd',
      page: StorageBoxListPage,
      protected: true,
      hidden: true,
      special: null,
      has_important: false
    },
    {
      key: 'ROBOT.PAGE.SSH_KEYS.TITLE',
      icon: 'fa-key',
      page: SshKeyListPage,
      protected: true,
      hidden: true,
      special: null,
      has_important: false
    },
    /*{
      key: 'ROBOT.PAGE.SHOP.TITLE',
      icon: 'fa-shopping-cart fa-flip-horizontal',
      page: HetznerStatusPage,
      protected: true,
      hidden: false,
      needs_order: true,
    },*/
    {
      key: 'ROBOT.PAGE.SERVER_MARKET.TITLE',
      icon: 'fa-shopping-cart',
      page: ServerMarketListPage,
      protected: true,
      hidden: false,
      needs_order: true,
    },
    {
      key: 'PAGE.STATUS.TITLE',
      icon: 'fa-bell',
      page: HetznerStatusPage,
      protected: false,
      hidden: false,
      special: null,
      has_important: false
    },
    {
      key: 'PAGE.SETTINGS.TITLE',
      icon: 'fa-cogs',
      page: SettingsPage,
      protected: false,
      hidden: false,
      special: null,
      has_important: false
    }
  ]

  constructor(protected accountService: AccountService, protected platform: Platform, public hetznerRobotDataService: HetznerRobotDataService) {
    this.generateMenu();

  }

  generateMenu() {
    this.accountService.loadAccounts().then(() => {
      var tmp = [];
      this.menu_entries.forEach((menu_entry) => {
        menu_entry.hidden = (menu_entry.protected) ? this.validate(menu_entry) : false;
        if ((<any> menu_entry).special != null) {
          if ((<any> menu_entry).special == 'accounts') {
            (<any> menu_entry).has_important = this.accountService.actual_account.revoked;
          }
        }
        tmp.push(menu_entry);
      })
      this.menu_entries = tmp;
    });
  }

  validate(menu_entry) {
    if (menu_entry.protected == true) {
      if (menu_entry.needs_order != undefined) {
        if (this.accountService.actual_account != null) {
          if (this.accountService.actual_account.can_order == true) {
            return false;
          } else {
            return true;
          }
        }
      }
      return this.accountService.actual_account == null;
    } else {
      return menu_entry.hidden;
    }
  }

  init() {
    return this.hetznerRobotDataService.loadData();
  }
}
