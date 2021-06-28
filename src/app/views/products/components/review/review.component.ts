import { Component, forwardRef, Input, OnDestroy, OnInit } from '@angular/core';
import {
  ControlValueAccessor,
  FormBuilder,
  FormGroup,
  NG_VALUE_ACCESSOR,
  Validators
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { filter, tap } from 'rxjs/operators';

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
  ],
})
export class ReviewComponent
  implements OnInit, OnDestroy, ControlValueAccessor
{
  private subscriptions: Subscription[] = [];

  public isDisabled: boolean = false;

  public form!: FormGroup;
  private onChange = (val: any) => {};
  private onTouch = (val?: any) => {};

  @Input()
  public submitted = true;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      rating: [null, [Validators.required, Validators.min(1)]],
      comment: ['', Validators.maxLength(500)],
    });
    this.subscriptions.push(
      this.form.valueChanges
        .pipe(
          tap((value) => this.onTouch(value)),
          filter(() => this.form.valid)
        )
        .subscribe((value) => {
          console.log('review', value);
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
}
