import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { Observable, of } from "rxjs";
import { ProductsService } from "../services/products.service";

export function AsyncValidCategoryValidator(service: ProductsService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (!service.loadProducts().map(i => i.category).some(i => i === control.value)) {
        return of({
          asyncCategoryValidator: 'La categoría no existe'
        });
      } else {
        return of(null)
      }
    };
}
