import {Component, ViewChild} from '@angular/core';
import {Nav, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {ProjectsService} from "../models/project/ProjectsService";
import {HomePage} from "../pages/home/home";
import {ProjectsPage} from "../pages/projects/projects";
import {AboutPage} from "../pages/about/about";
import {ServersPage} from "../pages/server/serverList/servers";
import {Storage} from "@ionic/storage";
import {FloatingIPsPage} from "../pages/floatingIPs/floatingIPs";
import {ImagesPage} from "../pages/images/images";
import {ServersService} from "../models/servers/ServersService";
import {OneSignal} from "@ionic-native/onesignal";
import {HetznerStatusPage} from "../pages/hetzner-status/hetzner-status";
import {SettingsPage} from "../pages/settings/settings";
import {FingerprintAIO} from "@ionic-native/fingerprint-aio";
import {TranslateService} from "@ngx-translate/core";
import {ActionsPage} from "../pages/actions/actions";
import {SshkeysPage} from "../pages/sshkeys/sshkeys";
import {AppRate} from '@ionic-native/app-rate';
import {PricingServices} from "../models/pricings/PricingServices";
import {NetworkProvider} from "../models/network/network";

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
    platform: Platform,
    statusBar: StatusBar,
    protected splashScreen: SplashScreen,
    protected projects: ProjectsService,
    protected storage: Storage,
    protected servers: ServersService,
    protected oneSignal: OneSignal,
    protected fingerPrint: FingerprintAIO,
    protected translate: TranslateService,
    protected appRate: AppRate,
    protected prices: PricingServices,
    protected network: NetworkProvider) {
    platform.ready().then(() => {
      this.network.init();
      this.network.onConnectListener.subscribe(() => this.loadHetznerSpecificData());
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      storage.ready().then(() => {
        statusBar.styleDefault();
        oneSignal.startInit('e8714cee-7480-45da-bad0-19ba3c3e89c4', '1069973161280');
        oneSignal.endInit();
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
        this.appRate.preferences = {
          usesUntilPrompt: 3,
          storeAppURL: {
            ios: '1342303703',
            android: 'market://details?id=de.lkdevelopment.hetzner'
          }
        };

        splashScreen.hide();
      });
    });
  }

  /**
   *
   */
  public loadHetznerSpecificData() {
    this.projects.loadProjects().then(() => {
      if (this.network.has_connection == true) {
        this.prices.reloadPrices();
        this.servers.reloadServers();
      } else {
        this.prices.loadPrices();
        this.servers.loadServers();
      }
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
  public loadLocalization() {
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
