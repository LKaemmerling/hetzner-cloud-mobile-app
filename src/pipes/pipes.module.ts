import {NgModule} from '@angular/core';
import {FileSizePipe} from './file-size/file-size';

@NgModule({
	declarations: [FileSizePipe],
	imports: [],
	exports: [FileSizePipe]
})
export class PipesModule {}
