import {
  Component,
  Input,
  OnDestroy,
  OnInit
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { ProductItem } from '../../models';
import { ProductsService } from '../../services';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
})
export class ProductItemComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];

  @Input()
  public item!: ProductItem;

  constructor(
    private service: ProductsService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    //  const routeItem = this.service.loadProducts().find(i => i.id === Number(this.route.snapshot.paramMap.get('id')));
    //  if (routeItem) { this.item = routeItem; }

    this.subscriptions.push(
      this.route.paramMap
        .pipe(
          tap(params => console.log(params.get('id'), this.item)),
          // con esto hacemos que no muestre el producto cuando se lo han pasado como parametro de entrada
          map((params) => Number(params.get('id'))),
          switchMap((id) => this.service.loadProducts()
            .pipe(map(productList => productList.find(product => product.id === id))))
        )
        .subscribe((item) => {
          if (item) {
            console.log('on init', item);
            this.item = item;
          } else {
            // this.router.navigateByUrl('/products/all-products');
          }
        }, (error) => {})
    );
  }

  ngOnDestroy() {
    this.subscriptions.filter((sub) => sub).forEach((sub) => sub.unsubscribe());
  }
}
