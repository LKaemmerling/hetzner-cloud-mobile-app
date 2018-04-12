import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Protection} from "../../modules/hetzner-cloud-data/servers/server";

/**
 * This is a reusable component for the protection settings from the hetzner cloud
 */
@Component({
  selector: 'change-protection',
  templateUrl: 'change-protection.html'
})
export class ChangeProtectionComponent {
  /**
   * @type {Protection}
   */
  @Input() protection: Protection;
  /**
   *
   * @type {EventEmitter<Protection>}
   */
  @Output() protectionChange = new EventEmitter<Protection>();
}
