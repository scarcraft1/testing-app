import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ProductItem } from '../../models';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-featured-products',
  templateUrl: './featured-products.component.html',
  styleUrls: ['./featured-products.component.scss'],
})
export class FeaturedProductsComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];

  public products$!: Observable<ProductItem[]>;

  public productos: ProductItem[] = [];

  constructor(private productService: ProductsService) {}

  ngOnInit(): void {
    this.products$ = this.productService.loadProducts();
    // this.subscriptions.push(
    //   this.productService.loadProducts().subscribe((list) => {
    //     this.productos = list;
    //   })
    // );

    this.productService.searchProductsByName('prueba', true);
  }

  ngOnDestroy(): void {
    this.subscriptions.filter((sub) => sub).forEach((sub) => sub.unsubscribe());
  }
}
