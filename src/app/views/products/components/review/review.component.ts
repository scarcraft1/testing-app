import {
  Component,
  forwardRef,
  HostListener,
  Input,
  OnDestroy,
  OnInit
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormBuilder,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
  Validators
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ReviewComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ReviewComponent),
      multi: true,
    },
  ],
})
export class ReviewComponent
  implements OnInit, OnDestroy, ControlValueAccessor, Validator
{
  private subscriptions: Subscription[] = [];

  public isDisabled: boolean = false;

  public form!: FormGroup;
  private onChange = (val: any) => {};
  private onTouch = (val?: any) => {};
  private onValidate: () => void = () => {};

  @Input()
  public submitted = false;

  constructor(private fb: FormBuilder) {}

  @HostListener('blur')
  private onBlur() {
    this.onTouch();
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      rating: [null, [Validators.required, Validators.min(1)]],
      comment: ['', Validators.maxLength(5)],
    });
    this.subscriptions.push(
      this.form.valueChanges
        .pipe(
          tap(() => {
            this.onTouch();
            this.onValidate();
          })
        )
        .subscribe((value) => {
          this.onChange(value);
        })
    );
  }

  ngOnDestroy() {
    this.subscriptions.filter((sub) => sub).forEach((sub) => sub.unsubscribe());
  }

  writeValue(obj: any): void {
    this.form.patchValue(obj, { emitEvent: false });
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState?(isDisabled: boolean) {
    this.isDisabled = isDisabled;
  }

  registerOnValidatorChange?(fn: () => void) {
    this.onValidate = fn;
  }

  validate(control: AbstractControl): ValidationErrors | null {
    if (this.form.valid) {
      return null;
    }
    return Object.entries(this.form.controls).reduce(
      (errors, [key, control]) => {
        if (control.errors) {
          errors[key] = control.errors;
        }
        return errors;
      },
      this.form.errors || {}
    );
  }
}
