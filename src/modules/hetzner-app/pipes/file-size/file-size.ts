import {Pipe, PipeTransform} from '@angular/core';

/**
 * Generated class for the FileSizePipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'fileSize',
})
/**
 *
 */
export class FileSizePipe implements PipeTransform {
  private units = [
    'bytes',
    'KB',
    'MB',
    'GB',
    'TB',
    'PB'
  ];

  /*
   * Convert bytes into largest possible unit.
   * Takes an precision argument that defaults to 2.
   * Usage:
   *   bytes | fileSize:precision
   * Example:
   *   {{ 1024 |  fileSize}}
   *   formats to: 1 KB
  */
  transform(bytes: number = 0, precision: number = 2): string {
    if (isNaN(parseFloat(String(bytes))) || !isFinite(bytes)) return '?';

    let unit = 0;

    while (bytes >= 1024) {
      bytes /= 1024;
      unit++;
    }

    return bytes.toFixed(+precision) + ' ' + this.units[unit];
  }
}
