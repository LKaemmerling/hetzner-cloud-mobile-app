import {Injectable} from '@angular/core';
import {HomePage} from "../../pages/global/home/home";
import {ServersPage} from "../../pages/cloud/server/serverList/servers";
import {ActionsPage} from "../../pages/cloud/actions/actions";
import {FloatingIPsPage} from "../../pages/cloud/floatingIPs/floatingIPs";
import {HetznerStatusPage} from "../../pages/global/hetzner-status/hetzner-status";
import {SettingsPage} from "../../pages/global/settings/settings";
import {ImagesPage} from "../../pages/cloud/images/images";
import {SshkeysPage} from "../../pages/cloud/sshkeys/sshkeys";
import {ProjectsPage} from "../../pages/cloud/projects/projects";
import {AccountListPage} from "../../pages/robot/account/list/account-list";
import {ProjectsService} from "../hetzner-cloud-data/project/projects.service";
import {AccountService} from "./accounts/account.service";
import {Platform} from "ionic-angular";

/**
 * Service that centralised all methods for the storage
 */
@Injectable()
export class HetznerRobotMenuService {

  public icon = 'hetzner-robot-icon';

  public text = 'Robot';

  public menu_entries = [
    {
      key: 'PAGE.HOME.TITLE',
      icon: 'fa-home',
      page: HomePage,
      protected: false,
      hidden: false
    },
    {
      key: 'ROBOT.PAGE.ACCOUNTS.TITLE',
      icon: 'fa-user',
      page: AccountListPage,
      protected: false,
      hidden: false
    },
    {
      key: 'ROBOT.PAGE.SERVERS.TITLE',
      icon: 'fa-server',
      page: HomePage,
      protected: true,
      hidden: true
    },
    {
      key: 'ROBOT.PAGE.STORAGE_BOXES.TITLE',
      icon: 'fa-hdd',
      page: HomePage,
      protected: true,
      hidden: true
    },
    {
      key: 'PAGE.STATUS.TITLE',
      icon: 'fa-bell',
      page: HetznerStatusPage,
      protected: false,
      hidden: false
    },
    {
      key: 'PAGE.SETTINGS.TITLE',
      icon: 'fa-cogs',
      page: SettingsPage,
      protected: false,
      hidden: false
    }
  ]

  constructor(protected accountService: AccountService, platform: Platform) {
    platform.ready().then(() => {
      this.accountService.loadAccounts().then(() => {
        var tmp = [];
        this.menu_entries.forEach((menu_entry) => {
          menu_entry.hidden = (menu_entry.protected) ? this.validate(menu_entry) : false;
          tmp.push(menu_entry);
        })
        this.menu_entries = tmp;
      })

    })
  }

  public validate(menu_entry) {
    if (menu_entry.protected == true) {
      return this.accountService.actual_account == null;
    } else {
      return menu_entry.hidden;
    }
  }
}
