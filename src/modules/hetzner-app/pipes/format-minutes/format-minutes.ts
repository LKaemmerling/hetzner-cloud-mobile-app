import {Pipe, PipeTransform} from '@angular/core';

/**
 * Generated class for the FileSizePipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'formatMinutes',
})
/**
 *
 */
export class FormatMinutesPipe implements PipeTransform {

  transform(input: number = 0): string {
    // set minutes to seconds
    var seconds = input;

    // calculate (and subtract) whole days
    var days = Math.floor(seconds / 86400);
    seconds -= days * 86400;

    // calculate (and subtract) whole hours
    var hours = Math.floor(seconds / 3600) % 24;
    seconds -= hours * 3600;

    // calculate (and subtract) whole minutes
    var minutes = Math.floor(seconds / 60) % 60;

    return ((days > 0) ? days + 'd ' : '') + ((hours > 0) ? hours + 'h ' : '') + minutes + 'm ';
  }

}
