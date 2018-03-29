import {Component} from '@angular/core';
import {ProjectsService} from "../../../modules/hetzner-cloud-data/project/projects.service";
import {LoadingController, NavParams, ViewController} from "ionic-angular";
import {ServerApiProvider} from "../../../providers/server-api/server-api";
import {ServerTypeApiProvider} from "../../../providers/server-type-api/server-type-api";
import {ImageApiProvider} from "../../../providers/image-api/image-api";
import {LocationApiProvider} from "../../../providers/location-api/location-api";
import {ServersService} from "../../../modules/hetzner-cloud-data/servers/servers.service";
import {Location, ServerType} from "../../../modules/hetzner-cloud-data/servers/server";
import {SshKeysService} from "../../../modules/hetzner-cloud-data/ssh-keys/ssh-keys.service";
import {ImagesService} from "../../../modules/hetzner-cloud-data/images/images.service";
import {LocationsService} from "../../../modules/hetzner-cloud-data/locations/locations.service";
import {ServerTypesService} from "../../../modules/hetzner-cloud-data/server-types/server-types.service";

@Component({
  selector: 'modal-addServer',
  templateUrl: 'addServer.html'
})
export class addServerModal {
  /**
   *
   */
  public name: string;
  /**
   *
   */
  public server_type: ServerType;
  /**
   *
   */
  public server_types: Array<ServerType>;
  /**
   *
   */
  public location: number;
  /**
   *
   */
  public locations: Array<Location>;
  /**
   *
   */
  public ssh_key: Array<any>;
  /**
   *
   */
  public ssh_keys: Array<any>;
  /**
   *
   */
  public image: number;
  /**
   *
   */
  public images: Array<any>;
  /**
   *
   * @type {boolean}
   */
  public start_after_create: boolean = true;

  /**
   *
   * @type {null}
   */
  public error: string = null;
  /**
   *
   * @type {null}
   * @private
   */
  public __selected_image: number = null;

  /**
   *
   * @param {ViewController} viewCtrl
   * @param {LoadingController} loadingCtrl
   * @param {ServerApiProvider} serverApiProvider
   * @param {NavParams} navParams
   * @param {ServersService} serverService
   * @param {ServerTypesService} serverTypesService
   * @param {ImagesService} imagesService
   * @param {LocationsService} locationService
   * @param {SshKeysService} sshKeysService
   */
  constructor(protected viewCtrl: ViewController,
              protected loadingCtrl: LoadingController,
              protected serverApiProvider: ServerApiProvider,
              protected navParams: NavParams,
              protected serverService: ServersService,
              protected serverTypesService: ServerTypesService,
              protected imagesService: ImagesService,
              protected locationService: LocationsService,
              protected sshKeysService: SshKeysService) {
    this.__selected_image = this.navParams.get('selected_image');
    if (this.__selected_image != null) {
      this.image = this.__selected_image;
    }

    this.locations = this.locationService.locations;

    this.server_types = serverTypesService.server_types;

    this.images = imagesService.images;
    this.ssh_keys = sshKeysService.ssh_keys;
  }

  /**
   *
   */
  public createServer() {
    this.error = null;
    if (this.server_type == null) {
      this.error = 'PAGE.SERVERS.MODAL.ADD.ERRORS.REQUIRED_TYPE';
      return;
    }
    if (this.location == null) {
      this.error = 'PAGE.SERVERS.MODAL.ADD.ERRORS.REQUIRED_LOCATION';
      return;
    }
    if (this.image == null) {
      this.error = 'PAGE.SERVERS.MODAL.ADD.ERRORS.REQUIRED_IMAGE';
      return;
    }
    if (this.name == null || this.name.length < 3 || /^(?![0-9]+$)(?!.*-$)(?!-)[a-zA-Z0-9-]{1,63}$/g.test(this.name) == false) {
      this.error = 'PAGE.SERVERS.MODAL.ADD.ERRORS.REQUIRED_NAME';
      return;
    }
    let loader = this.loadingCtrl.create();
    loader.present();
    this.serverApiProvider.createServer(this.name, this.server_type.id, this.location, this.start_after_create, this.image, this.ssh_key).then(() => {
      this.dismiss();
      loader.dismiss();
      this.serverApiProvider.getServers().then((data) => {
        this.serverService.servers = data['servers'];
        this.serverService.saveServers();
      });
    }, (error) => {
      this.error = 'PAGE.SERVERS.MODAL.ADD.ERRORS.NETWORK_ERROR';
      loader.dismiss();
    });
  }

  /**
   *
   */
  public dismiss() {
    this.viewCtrl.dismiss();
  }
}
