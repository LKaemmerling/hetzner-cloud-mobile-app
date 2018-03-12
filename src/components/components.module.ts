import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServerStatusIndicatorComponent } from './server-status-indicator/server-status-indicator';
import { LoadingIndicatorComponent } from './loading-indicator/loading-indicator';
import {IonicModule} from "ionic-angular";
@NgModule({
	declarations: [
	  ServerStatusIndicatorComponent,
    LoadingIndicatorComponent
  ],
	imports: [CommonModule,IonicModule],
	exports: [
	  ServerStatusIndicatorComponent,
    LoadingIndicatorComponent
  ]
})
export class ComponentsModule {}
