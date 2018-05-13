import {Component, Input} from '@angular/core';
import {ConfigService} from "../../modules/hetzner-app/config/config.service";
import {Server} from "../../modules/hetzner-cloud-data/servers/server";
import {StatusApiProvider} from "../../modules/hetzner-cloud-api/status-api/status-api-provider.service";
import {NetworkProvider} from "../../modules/hetzner-app/network/network";

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
  protected issue: any;

  constructor(protected config: ConfigService, protected statusService: StatusApiProvider, protected networkProvider: NetworkProvider) {
  }

  ngOnInit() {
    if (this.config.getFeatureFlag('cloud_status') == true) {
      this.hasIssue = -2;
      if (this.networkProvider.has_connection) {
        this.statusService.hasIpIssues(this.server.public_net.ipv4.ip).then((result) => {
          console.log(result);
          if ((<any> result).length > 0) {
            this.hasIssue = 1;
            this.issue = result[0];
          } else {
            this.hasIssue = 0;
          }
        }, () => {
          this.hasIssue == -1;
        });
      } else {
        this.hasIssue = 0;
      }
    } else {
      this.hasIssue == 0;
    }
  }
}

