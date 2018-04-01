import {NgModule} from '@angular/core';
import {FileSizePipe} from './file-size/file-size';
import { PriceReplacePipe } from './price-replace/price-replace';
import { TruncatePipe } from './truncate/truncate';

@NgModule({
  declarations: [
    FileSizePipe,
    PriceReplacePipe,
    TruncatePipe
  ],
  imports: [],
  exports: [
    FileSizePipe,
    PriceReplacePipe,
    TruncatePipe
  ]
})
export class PipesModule {
}
