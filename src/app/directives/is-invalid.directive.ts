import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  Renderer2,
} from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { filter } from 'rxjs/operators';

@Directive({
  selector: '[app-is-invalid]',
})
export class IsInvalidDirective implements AfterViewInit {
  @Input('app-is-invalid') public control!: AbstractControl;

  constructor(
    private el: ElementRef<HTMLInputElement>,
    private renderer: Renderer2
  ) {}

  ngAfterViewInit(): void {
    this.control.valueChanges
      .pipe(filter(() => this.control.dirty))
      .subscribe(() => {
        if (this.control.invalid) {
          this.renderer.removeClass(this.el.nativeElement, 'is-valid');
          this.renderer.addClass(this.el.nativeElement, 'is-invalid');
        } else {
          this.renderer.removeClass(this.el.nativeElement, 'is-invalid');
          this.renderer.addClass(this.el.nativeElement, 'is-valid');
        }
      });
  }
}