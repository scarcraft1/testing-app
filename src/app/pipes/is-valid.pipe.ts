import { Pipe, PipeTransform } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Pipe({
  name: 'isValid',
  pure: false
})
export class IsValidPipe implements PipeTransform {
  transform(control: AbstractControl, show: boolean = true): string {
    console.log('paso 2');
    if (show) {
      return control.valid ? 'is-valid' : 'is-invalid';
    }
    return '';
  }

}
