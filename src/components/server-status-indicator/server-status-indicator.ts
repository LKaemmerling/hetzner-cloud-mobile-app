import {Component, Input} from '@angular/core';
import {ConfigService} from "../../modules/hetzner-app/config/config.service";
import {Server} from "../../modules/hetzner-cloud-data/servers/server";
import {StatusApiProvider} from "../../modules/hetzner-cloud-api/status-api/status-api";

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
  @Input() server: Server;
  protected hasIssue: number;

  constructor(protected config: ConfigService, protected statusService: StatusApiProvider) {
  }

  ngOnInit() {
    if (this.config.getFeatureFlag('cloud_status') == true) {
      this.hasIssue = -2;
      this.statusService.hasIpIssues(this.server.public_net.ipv4.ip).then((result) => {
        if ((<any> result).length > 0) {
          this.hasIssue = 1;
        } else {
          this.hasIssue = 0;
        }
      },() => {
        this.hasIssue == -1;
      });
    } else {
      this.hasIssue == -1;
    }
  }
}

