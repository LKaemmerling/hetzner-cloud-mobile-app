import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NetworkProvider } from '../../modules/hetzner-app/network/network';
import { TranslateService } from '@ngx-translate/core';

/**
 * Shows all network actions. If there is a load or an error.
 */
@Component({
    selector: 'loading-indicator',
    templateUrl: 'loading-indicator.html',
})
export class LoadingIndicatorComponent {
    /**
     * Is there currently something loading?
     * @type {string}
     */
    @Input() loading: boolean;
    /**
     * Is the loading done?
     * @type {string}
     */
    @Input() loading_done: boolean;
    /**
     * Is there a loading error?
     * @type {string}
     */
    @Input() loading_error?: boolean;
    /**
     * What is the loading error?
     * @type {string}
     */
    @Input() error_message?: string;
    /**
     * What should be done if someone click on the reload button
     * @type {EventEmitter<string>}
     */
    @Output() action = new EventEmitter<string>();
    /**
     * Is there currently a network connection?
     * @type {boolean}
     */
    protected network_available: boolean = false;

    /**
     * Constructor
     * @param {NetworkProvider} network
     * @param {TranslateService} translate
     */
    constructor(protected network: NetworkProvider, protected translate: TranslateService) {
        this.network_available = this.network.has_connection;
    }

    /**
     * This fires the event, if the reload button is pressed
     */
    callAction() {
        this.action.next('clicked');
    }
}
