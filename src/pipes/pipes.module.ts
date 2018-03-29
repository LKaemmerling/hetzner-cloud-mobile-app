import {NgModule} from '@angular/core';
import {FileSizePipe} from './file-size/file-size';
import { PriceReplacePipe } from './price-replace/price-replace';

@NgModule({
  declarations: [FileSizePipe,
    PriceReplacePipe],
  imports: [],
  exports: [FileSizePipe,
    PriceReplacePipe]
})
export class PipesModule {
}
