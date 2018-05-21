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
import {ProjectsService} from "./project/projects.service";
import {Platform} from "ionic-angular";
import {HetznerCloudDataService} from "./hetzner-cloud-data.service";

/**
 * Service that centralised all methods for the storage
 */
@Injectable()
export class HetznerCloudMenuService {

  public icon = 'fas fa-cloud';

  public text = 'Cloud';
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
      key: 'PAGE.PROJECTS.TITLE',
      icon: 'fa-lock',
      page: ProjectsPage,
      protected: false,
      hidden: false,
      special: 'projects',
      has_important: false
    },
    {
      key: 'PAGE.SERVERS.TITLE',
      icon: 'fa-server',
      page: ServersPage,
      protected: true,
      hidden: true,
      special: null,
      has_important: false
    },
    {
      key: 'PAGE.FLOATING_IPS.TITLE',
      icon: 'fa-cloud',
      page: FloatingIPsPage,
      protected: true,
      hidden: true,
      special: null,
      has_important: false
    },
    {
      key: 'PAGE.IMAGES.TITLE',
      icon: 'fa-puzzle-piece',
      page: ImagesPage,
      protected: true,
      hidden: true,
      special: null,
      has_important: false
    },
    {
      key: 'PAGE.SSH_KEYS.TITLE',
      icon: 'fa-key',
      page: SshkeysPage,
      protected: true,
      hidden: true,
      special: null,
      has_important: false
    },
    {
      key: 'PAGE.ACTIONS.TITLE',
      icon: 'fa-cog',
      page: ActionsPage,
      protected: true,
      hidden: true,
      special: null,
      has_important: false
    },
    {
      key: 'PAGE.STATUS.TITLE',
      icon: 'fa-bell',
      protected: false,
      page: HetznerStatusPage,
      hidden: false,
      special: null,
      has_important: false
    },
    {
      key: 'PAGE.SETTINGS.TITLE',
      icon: 'fa-cogs',
      protected: false,
      page: SettingsPage,
      hidden: false,
      special: null,
      has_important: false
    }
  ]

  constructor(protected projects: ProjectsService, platform: Platform, protected  hetznerCloudDataService: HetznerCloudDataService) {
    platform.ready().then(() => {
      this.generateMenu();
    })

  }

  public generateMenu() {
    this.projects.loadProjects().then(() => {
      var tmp = [];
      this.menu_entries.forEach((menu_entry) => {
        menu_entry.hidden = (menu_entry.protected) ? this.validate(menu_entry) : false;
        if (menu_entry.special != null) {
          if (menu_entry.special == 'projects') {
            menu_entry.has_important = this.projects.actual_project.revoked;
          }
        }
        console.log(menu_entry);
        tmp.push(menu_entry);
      })
      this.menu_entries = tmp;
    })

  }

  public validate(menu_entry) {
    if (menu_entry.protected == true) {
      console.log(this.projects.actual_project);
      return this.projects.actual_project == null;
    } else {
      return menu_entry.hidden;
    }
  }

  public init() {
    return this.hetznerCloudDataService.loadData();
  }

}
