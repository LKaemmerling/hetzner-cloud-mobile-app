import { Component } from '@angular/core';
import { ProjectsService } from '../../../../modules/hetzner-cloud-data/project/projects.service';
import { LoadingController, NavController, NavParams, ViewController } from 'ionic-angular';
import { ServerApiProvider } from '../../../../modules/hetzner-cloud-api/server-api/server-api';
import { Image, Server } from '../../../../modules/hetzner-cloud-data/servers/server';
import { ImagesService } from '../../../../modules/hetzner-cloud-data/images/images.service';

/**
 * With this modal it is possible to change the backup settings of the server
 */
@Component({
    selector: 'modal-backupSettings',
    templateUrl: 'backupSettings.html',
})
export class backupSettingsModal {
    /**
     * The server for which you want to change the settings
     * @type {Server}
     */
    protected server: Server;
    /**
     * This contains the currently selected backup window
     * @type {string}
     */
    protected backup_window: string;
    /**
     * This contains all available images
     * @type {Image}
     */
    protected images: Array<Image>;
    /**
     * The selected image
     * @type {Image}
     */
    protected image: Image = null;
    /**
     * Is the snapshot creation done?
     * @type {boolean}
     */
    protected create_snapshot_done: boolean = false;
    /**
     * Is the backup creation done?
     * @type {boolean}
     */
    protected create_backup_done: boolean = false;

    /**
     * Constructor
     * @param {LoadingController} loadingCtrl
     * @param {NavController} navCtrl
     * @param {ViewController} viewCtrl
     * @param {ProjectsService} project
     * @param {ServerApiProvider} serverApiProvider
     * @param {ImagesService} imagesService
     * @param {NavParams} navParams
     */
    constructor(
        protected loadingCtrl: LoadingController,
        protected navCtrl: NavController,
        protected viewCtrl: ViewController,
        protected project: ProjectsService,
        protected serverApiProvider: ServerApiProvider,
        protected imagesService: ImagesService,
        protected navParams: NavParams
    ) {
        this.server = navParams.get('server');
        this.backup_window = this.server.backup_window;
        this.images = imagesService.images;
    }

    /**
     * Disable the currently enabled backups
     */
    disable_backups() {
        var loader = this.loadingCtrl.create();
        loader.present();
        this.serverApiProvider.disable_backups(this.server.id).then(() => {
            this.server.backup_window = null;
            loader.dismiss();
            this.dismiss();
        });
    }

    /**
     * Enable the currently disabled backups
     */
    enable_backups() {
        if (this.backup_window != null) {
            var loader = this.loadingCtrl.create();
            loader.present();
            this.serverApiProvider.enable_backups(this.server.id, this.backup_window).then(() => {
                this.server.backup_window = this.backup_window;
                loader.dismiss();
            });
        }
        this.dismiss();
    }

    /**
     * Create a new snapshot
     */
    create_snapshot() {
        this.create_snapshot_done = false;
        var loader = this.loadingCtrl.create();
        loader.present();
        this.serverApiProvider.create_snapshot(this.server.id).then(() => {
            this.imagesService.reloadImages();

            this.images = this.imagesService.images;
            loader.dismiss();
            this.create_snapshot_done = true;
        });
    }

    /**
     * Create a new backup
     */
    create_backup() {
        this.create_backup_done = false;
        var loader = this.loadingCtrl.create();
        loader.present();
        this.serverApiProvider.create_backup(this.server.id).then(() => {
            this.imagesService.reloadImages();

            this.images = this.imagesService.images;
            loader.dismiss();
            this.create_backup_done = true;
        });
    }

    /**
     * Rebuild the server from an image
     */
    rebuild_from_image() {
        if (this.image != null) {
            var loader = this.loadingCtrl.create();
            loader.present();
            this.serverApiProvider.rebuild(this.server.id, this.image.id).then(() => {
                loader.dismiss();
            });
        }
        this.dismiss();
    }

    /**
     * Dismiss the modal
     */
    dismiss() {
        return this.viewCtrl.dismiss();
    }
}
