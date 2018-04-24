import { Component } from '@angular/core';
import { ActionSheetController, LoadingController, ModalController, NavParams } from 'ionic-angular';
import { state, style, transition, trigger, useAnimation } from '@angular/animations';
import { fadeIn, fadeOut } from 'ng-animate';
import { ServerApiProvider } from '../../../../modules/hetzner-robot-api/server-api/server-api';

/**
 * This is the project page, where you can create, activate, share and delete projects
 */
@Component({
    selector: 'page-server-detail',
    templateUrl: 'server-detail.html',
    animations: [
        trigger('animate', [
            state(
                'active',
                style({
                    display: 'block',
                })
            ),
            state(
                '*',
                style({
                    display: 'none',
                })
            ),
            transition('* => active', useAnimation(fadeIn, { params: { timing: 0.3, delay: 0 } })),
            transition('active => *', useAnimation(fadeOut, { params: { timing: 0, delay: 0 } })),
        ]),
    ],
})
export class ServerDetailPage {
    /**
     * All available servers
     * @type {any[]}
     */
    public server: any;

    /**
     * Is the component in the loading process?
     * @type {boolean}
     */
    public loader: any;

    /**
     * Constructor
     * @param NavParams
     */
    constructor(
        protected NavParams: NavParams,
        protected serverApi: ServerApiProvider,
        protected loadingCtrl: LoadingController
    ) {}

    ngOnInit() {
        this.loader = this.loadingCtrl.create();
        this.loader.present();
        this.serverApi.getServer(this.NavParams.get('server_ip')).then(val => {
            this.server = val['server'];
            this.loader.dismiss();
        });
    }
}
