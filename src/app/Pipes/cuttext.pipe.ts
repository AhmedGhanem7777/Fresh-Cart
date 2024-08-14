import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cuttext'
})
export class CuttextPipe implements PipeTransform {

  // Transforms the input text to a truncated version based on the word limit
  transform(text: string, limit: number): string {
    // Split the text into words, slice it to the desired limit, and join it back into a string
    return text.split(' ').slice(0,limit).join(' ');
  }

}
