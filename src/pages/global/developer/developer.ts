import { Component } from '@angular/core';
import { Device } from '@ionic-native/device';
import { ConfigService } from '../../../modules/hetzner-app/config/config.service';
import { Storage } from '@ionic/storage';
import { NavController } from 'ionic-angular';
import { SettingsPage } from '../settings/settings';

/**
 * This is the developer mode page
 */
@Component({
    selector: 'page-developer',
    templateUrl: 'developer.html',
})
export class DeveloperPage {
    protected feature_flags = {};

    /**
     * Constructor
     * @param {Device} device
     * @param {ConfigService} config
     */
    constructor(
        protected device: Device,
        protected config: ConfigService,
        protected storage: Storage,
        protected nav: NavController
    ) {
        this.feature_flags = this.config.getFeatureFlag();
    }

    toggleFlag(name: string) {
        if (this.feature_flags[name] == false) {
            alert('This feature could be unstable! Use it on your own risk!');
        }
        this.config.setFeatureFlag(name, !this.feature_flags[name]);
        this.feature_flags = this.config.getFeatureFlag();
    }

    removeDeveloperMode() {
        this.storage.set('developer_mode', false);
        this.config.developer_mode = false;
        this.nav.setRoot(SettingsPage);
    }
}
