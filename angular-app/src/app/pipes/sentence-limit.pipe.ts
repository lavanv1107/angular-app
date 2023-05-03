import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sentenceLimit',
})
export class SentenceLimitPipe implements PipeTransform {
  transform(value: string): string {
    const sentences = value.match(/[^.!?]+[.!?]+[\])'"`’”]*/g);
    if (!sentences) {
      return '';
    }
    return sentences.slice(0, 2).join(' ');
  }
}
