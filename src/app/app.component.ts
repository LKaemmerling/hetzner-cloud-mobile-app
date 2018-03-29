import {Component, ViewChild} from '@angular/core';
import {Nav, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {ProjectsService} from "../modules/hetzner-cloud-data/project/projects.service";
import {HomePage} from "../pages/home/home";
import {ProjectsPage} from "../pages/projects/projects";
import {AboutPage} from "../pages/about/about";
import {ServersPage} from "../pages/server/serverList/servers";
import {Storage} from "@ionic/storage";
import {FloatingIPsPage} from "../pages/floatingIPs/floatingIPs";
import {ImagesPage} from "../pages/images/images";
import {ServersService} from "../modules/hetzner-cloud-data/servers/servers.service";
import {OneSignal} from "@ionic-native/onesignal";
import {HetznerStatusPage} from "../pages/hetzner-status/hetzner-status";
import {SettingsPage} from "../pages/settings/settings";
import {FingerprintAIO} from "@ionic-native/fingerprint-aio";
import {TranslateService} from "@ngx-translate/core";
import {ActionsPage} from "../pages/actions/actions";
import {SshkeysPage} from "../pages/sshkeys/sshkeys";
import {PricingService} from "../modules/hetzner-cloud-data/pricings/pricing.service";
import {NetworkProvider} from "../modules/hetzner-app/network/network";
import {SshKeysService} from "../modules/hetzner-cloud-data/ssh-keys/ssh-keys.service";
import {ImagesService} from "../modules/hetzner-cloud-data/images/images.service";
import {LocationsService} from "../modules/hetzner-cloud-data/locations/locations.service";
import {ServerTypesService} from "../modules/hetzner-cloud-data/server-types/server-types.service";
import {HetznerCloudDataService} from "../modules/hetzner-cloud-data/hetzner-cloud-data.service";
import {ConfigService} from "../modules/hetzner-app/config/config.service";

@Component({
  templateUrl: 'app.html'
})
export class HetznerCloudMobileApp {
  /**
   *
   */
  @ViewChild(Nav) nav: Nav;
  /**
   *
   * @type {HomePage}
   */
  rootPage: any = HomePage;
  /**
   *
   * @type {string}
   */
  public lang: string = 'de';

  /**
   *
   * @type {({key: string; icon: string; page: HomePage; hidden: boolean} | {key: string; icon: string; page: ProjectsPage; hidden: boolean} | {key: string; icon: string; page: ServersPage; hidden: boolean} | {key: string; icon: string; page: FloatingIPsPage; hidden: boolean} | {key: string; icon: string; page: ImagesPage; hidden: boolean} | {key: string; icon: string; page: ActionsPage; hidden: boolean} | {key: string; icon: string; page: HetznerStatusPage; hidden: boolean} | {key: string; icon: string; page: SettingsPage; hidden: boolean})[]}
   */
  protected menu_entries: Array<object> = [
    {
      key: 'PAGE.HOME.TITLE',
      icon: 'fa-home',
      page: HomePage,
      hidden: false
    },
    {
      key: 'PAGE.PROJECTS.TITLE',
      icon: 'fa-lock',
      page: ProjectsPage,
      hidden: false
    },
    {
      key: 'PAGE.SERVERS.TITLE',
      icon: 'fa-server',
      page: ServersPage,
      hidden: true
    },
    {
      key: 'PAGE.FLOATING_IPS.TITLE',
      icon: 'fa-cloud',
      page: FloatingIPsPage,
      hidden: true
    },
    {
      key: 'PAGE.IMAGES.TITLE',
      icon: 'fa-puzzle-piece',
      page: ImagesPage,
      hidden: true
    },
    {
      key: 'PAGE.SSH_KEYS.TITLE',
      icon: 'fa-key',
      page: SshkeysPage,
      hidden: true
    },
    {
      key: 'PAGE.ACTIONS.TITLE',
      icon: 'fa-cog',
      page: ActionsPage,
      hidden: true
    },
    {
      key: 'PAGE.STATUS.TITLE',
      icon: 'fa-bell',
      page: HetznerStatusPage,
      hidden: false
    },
    {
      key: 'PAGE.SETTINGS.TITLE',
      icon: 'fa-cogs',
      page: SettingsPage,
      hidden: false
    }
  ];

  constructor(
    protected platform: Platform,
    protected statusBar: StatusBar,
    protected splashScreen: SplashScreen,
    protected storage: Storage,
    protected oneSignal: OneSignal,
    protected fingerPrint: FingerprintAIO,
    protected translate: TranslateService,
    protected network: NetworkProvider,
    protected hetzerCloudData: HetznerCloudDataService,
    protected projects: ProjectsService,
    protected config: ConfigService) {
    platform.ready().then(() => {
      this.network.init();
      this.network.onConnectListener.subscribe(() => this.loadHetznerSpecificData());
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      storage.ready().then(() => {
        statusBar.styleDefault();
        this.loadOneSignal();
        this.loadLocalization();
        fingerPrint.isAvailable().then(res => {
          storage.get('auth').then(val => {
            if (val != undefined && val == 'enabled') {
              fingerPrint.show({
                clientId: 'Hetzner-Cloud-Mobile',
                clientSecret: 'password', //Only necessary for Android
                disableBackup: false,  //Only for Android(optional)
                localizedFallbackTitle: 'Pin benutzen', //Only for iOS
                localizedReason: 'Bitte authentifizieren Sie sich.' //Only for iOS
              }).then(result => {
                this.loadHetznerSpecificData();
              }).catch(err => {
                alert('Authentifizierung fehlgeschlagen. App wird beendet');
                if (platform.is('ios') == false) {
                  platform.exitApp();
                }
              });
            } else {
              this.loadHetznerSpecificData();
            }
          });
        }).catch(reason => {
          storage.get('auth').then(val => {
            if (val != undefined && val == 'enabled') {
              alert('Authentifizierung fehlgeschlagen. App wird beendet');
              if (platform.is('ios') == false) {
                platform.exitApp();
              }
            } else {
              this.loadHetznerSpecificData();
            }
          });
        });
      });
    });
  }

  /**
   *
   */
  private loadHetznerSpecificData() {
    this.hetzerCloudData.loadData().then(() => {
      this.splashScreen.hide();
    }, () => {
      this.translate.get('GLOBAL.MISSING_OR_WRONG_PROJECT').subscribe((text) => {
        alert(text);
      });
      this.nav.setRoot(ProjectsPage);
    });
  }

  /**
   *
   */
  private loadLocalization() {
    this.translate.setDefaultLang(this.lang);
    this.translate.addLangs(['en', 'de']);
    this.storage.get('lang').then(lang => {
      if (lang != undefined && lang != null) {
        this.translate.use(lang);
      } else {
        this.translate.use(this.lang);
      }
    });
  }

  /**
   *
   */
  private loadOneSignal() {
    this.oneSignal.startInit(this.config.oneSignal.appId, this.config.oneSignal.googleProjectId);
    this.oneSignal.endInit();
  }

  /**
   *
   * @param menu
   */
  openPage(menu) {
    this.nav.setRoot(menu.page);
  }

  /**
   *
   */
  openProjectsPage() {
    this.nav.setRoot(ProjectsPage);
  }

  /**
   *
   */
  openAboutPage() {
    this.nav.setRoot(AboutPage);
  }

}
