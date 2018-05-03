import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { IonicStorageModule } from '@ionic/storage';
import { HetznerAppModule } from '../../../modules/hetzner-app/hetzner-app.module';
import { HetznerAppComponentsModule } from '../../../components/hetzner-app-components.module';
import {HetznerRobotDataModule} from "../../../modules/hetzner-robot-data/hetzner-robot-data.module";
import {ServerMarketPagesModule} from "./server_market/server-market-pages";

@NgModule({
    imports: [
      HetznerAppComponentsModule,
      IonicPageModule,
      TranslateModule,
      HetznerAppModule,
      HetznerRobotDataModule,
      IonicStorageModule,
      ServerMarketPagesModule,
    ],
})
export class MarketPagesModule {}
