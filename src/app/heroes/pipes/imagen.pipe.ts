import { Pipe, PipeTransform } from '@angular/core';
import { Heroe } from '../Interfaces/heroes.interface';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(value: Heroe, ...args: unknown[]): string {
    return "assets/heroes/" + value.id + ".jpg";
  }

}
