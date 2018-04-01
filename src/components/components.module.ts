import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServerStatusIndicatorComponent } from './server-status-indicator/server-status-indicator';
import { LoadingIndicatorComponent } from './loading-indicator/loading-indicator';
import {IonicModule} from "ionic-angular";
import { ServerBasicInformationComponent } from './server-basic-information/server-basic-information';
@NgModule({
	declarations: [
	  ServerStatusIndicatorComponent,
    LoadingIndicatorComponent,
    ServerBasicInformationComponent
  ],
	imports: [CommonModule, IonicModule],
	exports: [
	  ServerStatusIndicatorComponent,
    LoadingIndicatorComponent,
    ServerBasicInformationComponent
  ]
})
export class ComponentsModule {}
