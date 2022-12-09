import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'localDate'
})
export class LocalDatePipe implements PipeTransform {

  transform(value: Date, ...args: unknown[]): unknown {
    return value.toLocaleDateString('fa-ir', {
      timeZone: 'Asia/Tehran',
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

}
