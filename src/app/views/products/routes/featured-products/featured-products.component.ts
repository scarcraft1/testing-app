import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ProductItem } from '../../models';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-featured-products',
  templateUrl: './featured-products.component.html',
  styleUrls: ['./featured-products.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeaturedProductsComponent implements OnInit {
  public productos: ProductItem[] = [];

  constructor(private productService: ProductsService) {}

  ngOnInit(): void {
    this.productos = this.productService.loadProducts();
  }

}
