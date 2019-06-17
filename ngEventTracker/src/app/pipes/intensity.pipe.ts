import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'intensity'
})
export class IntensityPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
