import {Component} from '@angular/core';
import {LoadingController, NavParams, ViewController} from "ionic-angular";
import {ServerApiProvider} from "../../../providers/server-api/server-api";
import {ServersService} from "../../../modules/hetzner-cloud-data/servers/servers.service";
import {Image, Location, ServerType} from "../../../modules/hetzner-cloud-data/servers/server";
import {SshKeysService} from "../../../modules/hetzner-cloud-data/ssh-keys/ssh-keys.service";
import {ImagesService} from "../../../modules/hetzner-cloud-data/images/images.service";
import {LocationsService} from "../../../modules/hetzner-cloud-data/locations/locations.service";
import {ServerTypesService} from "../../../modules/hetzner-cloud-data/server-types/server-types.service";
import {LocationApiProvider} from "../../../providers/location-api/location-api";
import {Storage} from "@ionic/storage";

/**
 * This page makes it possible to add a new server
 */
@Component({
  selector: 'page-addServer',
  templateUrl: 'addServer.html'
})
export class addServerModal {
  /**
   * Use the new v2 of the form or not
   * @type {boolean}
   */
  experimental_server_creation_form: boolean = false;
  /**
   * The name of the new server
   * @type {string}
   */
  name: string;
  /**
   * The selected server type
   * @type {ServerType}
   */
  server_type: ServerType;
  /**
   * All available server types
   * @type {ServerType[]}
   */
  server_types: Array<ServerType>;
  /**
   * The selected location id
   * @type {number}
   */
  location: number;
  /**
   * All available locations
   * @type {Location[]}
   */
  locations: Array<Location>;
  /**
   * The selected ssh key id
   * @type {number}
   */
  ssh_key: Array<any>;
  /**
   *  All available SSH Keys
   *  @type {SshKey[]}
   */
  ssh_keys: Array<any>;
  /**
   * ID of the selected image
   * @type {number}
   */
  image: number;
  /**
   * List of all available images
   * @type {Image[]}
   */
  images: Array<Image>;
  /**
   * Start the new server after the creation?
   * @type {boolean}
   */
  start_after_create: boolean = true;

  /**
   * Error message when there is an error
   * @type {string}
   */
  error: string = null;
  /**
   * The currently selected image id
   * @type {number}
   * @private
   */
  __selected_image: number = null;

  /**
   * Constructor
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
              protected sshKeysService: SshKeysService,
              protected storage:Storage
  ) {
    this.__selected_image = this.navParams.get('selected_image');
    if (this.__selected_image != null) {
      this.image = this.__selected_image;
      this.images = imagesService.images;
    } else {
      this.images = imagesService.getImagesByType('system');
    }

    this.locations = this.locationService.locations;
    this.server_types = serverTypesService.server_types;


    this.ssh_keys = sshKeysService.ssh_keys;
    storage.get('experimental_server_creation_form').then(value => {
      if (value != undefined) {
        this.experimental_server_creation_form = value;
      }
    });
  }
  /**
   * Makes the api call and validates the payload
   */
  createServer() {
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
   * Dismiss the modal
   */
  dismiss() {
    this.viewCtrl.dismiss();
  }
}
