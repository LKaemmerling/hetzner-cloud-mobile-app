import { Component, Input } from '@angular/core';

/**
 * The Server Status Indicator shows a nice point with the server status. If it is green, the server is running
 * if it is read, the server is off.
 */
@Component({
    selector: 'server-status-indicator',
    templateUrl: 'server-status-indicator.html',
})
export class ServerStatusIndicatorComponent {
    /**
     * The status from the hetzner api
     */
    @Input() status: string;
}
