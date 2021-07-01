import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { NewProductCommand } from '../../models';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewProductComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];

  public command: NewProductCommand = {
    name: '',
    category: '',
    price: 0,
  };
  public submitted = false;
  public form!: FormGroup;

  constructor(private fb: FormBuilder, private service: ProductsService) {}

  onSubmit() {
    this.submitted = true;
    console.log(this.form.value);
    console.log(this.form.controls['review'].valid);
    if (this.form.valid) {
      this.submitted = false;
      this.form.reset({
        name: '',
        category: '',
        price: null,
        imageSrc: null,
        review: [
          {
            rating: 1,
            comment: 'Esto es un comentario nuevo',
          },
        ],
      });
    }
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      price: [null, [Validators.min(0)]],
      imageSrc: [null],
      review: [
        {
          rating: 4,
          comment: 'Esto es un comentario nuevo',
        },
      ],
    });
  }

  ngOnDestroy() {
    this.subscriptions.filter((sub) => sub).forEach((sub) => sub.unsubscribe());
  }
}
