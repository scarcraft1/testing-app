import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { NewProductCommand } from '../../models';
import { ProductsService } from '../../services/products.service';

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
      category: ['', Validators.required],
      price: [null, [Validators.min(0)]]
    });
  }

  ngOnDestroy() {
    this.subscriptions.filter(sub => sub).forEach(sub => sub.unsubscribe());
  }

}
