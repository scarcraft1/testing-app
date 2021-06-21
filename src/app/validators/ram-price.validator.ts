import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function RamPriceValidator(
  category: AbstractControl | string
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    category = category instanceof AbstractControl ? category.value : category;
    if (!control.value) {
      return {
        RamPriceValidator: 'El valor de la RAM es obligatorio',
      };
    }
    if (category === 'RAM') {
      if (control.value < 50) {
        return {
          RamPriceValidator: 'El valor de la RAM no puede ser menor que 50',
        };
      } else if (control.value > 500) {
        return {
          RamPriceValidator: 'El valor de la RAM no puede ser mayor que 500',
        };
      } else {
        return null;
      }
    } else {
      if (control.value < 20) {
        return {
          RamPriceValidator: 'El valor no puede ser menor que 20',
        };
      } else if (control.value > 200) {
        return {
          RamPriceValidator: 'El valor no puede ser mayor que 200',
        };
      } else {
        return null;
      }
    }
  };
}
