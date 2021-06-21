import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { NewProductCommand } from 'src/app/models';
import { ProductsService } from 'src/app/services/products.service';
import { AsyncValidCategoryValidator, CategoriaAlmacenamientoValidator, RamPriceValidator } from 'src/app/validators';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewProductComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];

  public command: NewProductCommand = {
    name: '',
    category: '',
    price: 0
  };
  public submitted = false;
  public form!: FormGroup;

  constructor(private fb: FormBuilder, private service: ProductsService) { }

  onSubmit() {
    this.submitted = true;
    if (this.form.valid) {
      this.form.reset();
      console.log('save');
    }
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      category: ['', Validators.required, AsyncValidCategoryValidator(this.service)],
      price: [null, [RamPriceValidator('')]]
    });
    this.form.setValidators(CategoriaAlmacenamientoValidator);

    this.subscriptions.push(this.form.controls['category'].valueChanges
    .subscribe(value => {
      this.form.get('price')?.setValidators(RamPriceValidator(value));
      this.form.get('price')?.updateValueAndValidity();
    }));
  }

  ngOnDestroy() {
    this.subscriptions.filter(sub => sub).forEach(sub => sub.unsubscribe());
  }

}
