import { Pipe, PipeTransform } from '@angular/core';
import { Heroe } from '../Interfaces/heroes.interface';

@Pipe({
  name: 'imagen',
  //pure: false
})
export class ImagenPipe implements PipeTransform {

  transform(value: Heroe, ...args: unknown[]): string {

    if(!value.id && !value.alt_img) return 'assets/no-image.png';
    else if(value.alt_img) return value.alt_img;

    return "assets/heroes/" + value.id + ".jpg";
  }

}
