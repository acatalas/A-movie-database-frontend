import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'intlDate'
})
export class IntlDatePipe implements PipeTransform {

  transform(date: string | Date, dateStyle: 'full' | 'long' | 'medium' | 'short' = 'short', locale: string): string {
    //if date is a string, convert to a Date object
    return new Intl.DateTimeFormat(locale, {
      dateStyle
    }).format(new Date(date));
  }

}
