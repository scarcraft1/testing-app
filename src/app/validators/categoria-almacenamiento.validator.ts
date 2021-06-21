import { AbstractControl, ValidationErrors } from "@angular/forms";

export function CategoriaAlmacenamientoValidator(control: AbstractControl) : ValidationErrors | null {
  if ((control.value.name as string).includes('disco') && control.value.category !== 'almacenamiento') {
    return { categoriaAlmacenamiento: 'Los discos deben pertenecer a la categoría de almacenamiento' };
  }
  return null;
}
