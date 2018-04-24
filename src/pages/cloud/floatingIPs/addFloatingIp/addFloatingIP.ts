import { Component } from '@angular/core';
import { ProjectsService } from '../../../../modules/hetzner-cloud-data/project/projects.service';
import { LoadingController, ViewController } from 'ionic-angular';
import { FloatingIpApiProvider } from '../../../../modules/hetzner-cloud-api/floating-ip-api/floating-ip-api';
import { TranslateService } from '@ngx-translate/core';
import { Location, Server } from '../../../../modules/hetzner-cloud-data/servers/server';
import { ServersService } from '../../../../modules/hetzner-cloud-data/servers/servers.service';
import { LocationsService } from '../../../../modules/hetzner-cloud-data/locations/locations.service';

/**
 * Add a new floating ip
 */
@Component({
    selector: 'modal-addFloatingIP',
    templateUrl: 'addFloatingIP.html',
})
export class addFloatingIPModal {
    /**
     * Is the floating ip ipv4 or ipv6?
     * @type {string}
     */
    public type: string;
    /**
     * The server to that the ip points
     * @type {Server}
     */
    public server: Server;
    /**
     * The location to that the ip points
     * @type {Location}
     */
    public location: Location;
    /**
     * Give the ip a description
     * @type {string}
     */
    public description: string;
    /**
     * List all available servers
     * @type {any[]}
     */
    public servers: Array<Server> = [];
    /**
     * Does the api call fail?
     * @type {string}
     */
    public error: string = null;

    /**
     * Constructor
     * @param {LoadingController} loadingCtrl
     * @param {ViewController} viewCtrl
     * @param {ProjectsService} project
     * @param {FloatingIpApiProvider} floatingIpApiProvider
     * @param {LocationsService} locationService
     * @param {ServersService} serverService
     * @param {TranslateService} translate
     */
    constructor(
        protected loadingCtrl: LoadingController,
        protected viewCtrl: ViewController,
        protected project: ProjectsService,
        protected floatingIpApiProvider: FloatingIpApiProvider,
        protected locationService: LocationsService,
        protected serverService: ServersService,
        protected translate: TranslateService
    ) {
        this.servers = serverService.servers;
    }

    /**
     * Make the api call and validate date payload before
     */
    public createFloatingIP() {
        this.error = null;
        if (this.description == null || this.description.length == 0) {
            this.error = 'PAGE.FLOATING_IPS.MODAL.ADD.ERRORS.REQUIRED_DESCRIPTION';
            return;
        }
        if (this.type == null || this.type.length == 0) {
            this.error = 'PAGE.FLOATING_IPS.MODAL.ADD.ERRORS.REQUIRED_NETWORK_PROTOCOL';
            return;
        }
        if (this.location == null && this.server == null) {
            this.error = 'PAGE.FLOATING_IPS.MODAL.ADD.ERRORS.REQUIRED_SERVER_OR_LOCATION';
            return;
        }
        let loader = this.loadingCtrl.create();
        loader.present();
        this.floatingIpApiProvider
            .createFloatingIp(
                this.type,
                this.description,
                this.server == null ? null : this.server.id,
                this.location == null ? null : this.location.name
            )
            .then(data => {
                this.dismiss();
                loader.dismiss();
            });
    }

    /**
     * Dismiss the modal
     */
    public dismiss() {
        this.viewCtrl.dismiss();
    }
}
