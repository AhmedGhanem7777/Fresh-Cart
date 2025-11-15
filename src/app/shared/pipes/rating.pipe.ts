import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rating'
})
export class RatingPipe implements PipeTransform {

  transform(rating:any): any[] {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;
    
    return Array(fullStars).fill(0)
      .concat(Array(halfStar).fill(1))
      .concat(Array(emptyStars).fill(2));
  }

}
