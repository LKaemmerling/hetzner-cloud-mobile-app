import {Component, ViewChild} from '@angular/core';
import {LoadingController, ModalController, Nav, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {ProjectsService} from "../modules/hetzner-cloud-data/project/projects.service";
import {HomePage} from "../pages/global/home/home";
import {ProjectsPage} from "../pages/cloud/projects/projects";
import {AboutPage} from "../pages/global/about/about";
import {Storage} from "@ionic/storage";
import {OneSignal} from "@ionic-native/onesignal";
import {FingerprintAIO} from "@ionic-native/fingerprint-aio";
import {TranslateService} from "@ngx-translate/core";
import {NetworkProvider} from "../modules/hetzner-app/network/network";
import {HetznerCloudDataService} from "../modules/hetzner-cloud-data/hetzner-cloud-data.service";
import {ConfigService} from "../modules/hetzner-app/config/config.service";
import {ChangelogPage} from "../pages/global/changelog/changelog";
import {Device} from "@ionic-native/device";
import {HetznerRobotMenuService} from "../modules/hetzner-robot-data/hetzner-robot-menu.service";
import {HetznerCloudMenuService} from "../modules/hetzner-cloud-data/hetzner-cloud-menu.service";

/**
 * This is the main component from the Hetzer Cloud Mobile App
 */
@Component({
  templateUrl: 'app.html'
})
export class HetznerMobileApp {
  /**
   * The Navigation
   */
  @ViewChild(Nav) nav: Nav;
  /**
   * The first visible page
   * @type {HomePage}
   */
  rootPage: any = HomePage;
  /**
   * The selected Language or main language
   * @type {string}
   */
  public lang: string = 'de';

  public available_menus = []
  protected menu = 'Cloud';

  protected menu_entries;

  /**
   * Constructor
   * @param {Platform} platform
   * @param {StatusBar} statusBar
   * @param {SplashScreen} splashScreen
   * @param {Storage} storage
   * @param {OneSignal} oneSignal
   * @param {FingerprintAIO} fingerPrint
   * @param {TranslateService} translate
   * @param {NetworkProvider} network
   * @param {HetznerCloudDataService} hetzerCloudData
   * @param {ProjectsService} projects
   * @param {ConfigService} config
   * @param {Device} device
   */
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
    protected config: ConfigService,
    protected device: Device,
    protected loadingCtrl: LoadingController,
    protected hetznerCloudMenu: HetznerCloudMenuService,
    protected hetznerRobotMenu: HetznerRobotMenuService,
    protected modalCtrl: ModalController) {
    this.available_menus.push(this.hetznerCloudMenu);
    this.available_menus.push(this.hetznerRobotMenu);

    platform.ready().then(() => {
      this.storage.get('current_menu').then((val) => {
        if (val != undefined) {
          this.menu = val;
        }
        this.changeMenu();
      });
      this.network.init();
      this.config.init().then(() => {
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
          //this.loadHetznerSpecificData();
        });
      });

    });
  }

  /**
   * Load the specific hetzner cloud data
   */
  private loadHetznerSpecificData() {
    this.hetzerCloudData.loadData().then(() => {
      this.splashScreen.hide();
      console.log(this.platform.userAgent());
      if (this.platform.userAgent().indexOf('E2E-Test') == -1) {
        this.storage.get('changelog_' + this.config.version.slice(0, -2)).then(val => {
          if (val == undefined && (this.platform.is('ios') || this.platform.is('android'))) {
            this.modalCtrl.create(ChangelogPage).present();
          }
        });
      }
    }, () => {
      this.translate.get('GLOBAL.MISSING_OR_WRONG_PROJECT').subscribe((text) => {
        alert(text);
      });
      this.nav.setRoot(ProjectsPage);
    });
  }

  /**
   * Load all needed for the localization
   */
  private loadLocalization() {
    this.translate.setDefaultLang('de');
    this.translate.addLangs(this.config.available_languages);
    console.log(this.config.language);
    this.translate.use(this.config.language);
  }

  /**
   * Load all OneSignal configurations
   */
  private loadOneSignal() {
    this.oneSignal.startInit(this.config.oneSignal.appId, this.config.oneSignal.googleProjectId);
    this.oneSignal.endInit();
  }

  /**
   * Open a new page
   * @param menu
   */
  openPage(menu) {
    this.nav.setRoot(menu.page);
  }

  /**
   * Open the projects page
   */
  openProjectsPage() {
    this.nav.setRoot(ProjectsPage);
  }

  /**
   * Open the about page
   */
  openAboutPage() {
    this.nav.setRoot(AboutPage);
  }

  /**
   * Open Support E-Mail
   */
  supportMail() {
    window.open(`mailto:hc-mobile-support@lk-apps.co?body=OSVersion:` + this.device.platform + ' ' + this.device.version + '\r\n App Version:' + this.config.version + ' \r\n Device:' + this.device.model + '\r\n ', '_system');

  }

  changeMenu() {
    let loader = this.loadingCtrl.create();
    loader.present();
    this.available_menus.forEach((val) => {
      if (val.text == this.menu) {
        this.menu_entries = val.menu_entries;
        this.storage.set('current_menu', val.text);
        val.init();
      }
    });
    loader.dismiss();
  }
}
