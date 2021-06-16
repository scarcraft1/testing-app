import { Injectable } from '@angular/core';
import { Products } from '../db/products';
import { ProductItem } from '../models';

@Injectable({ providedIn: 'root' })
export class ProductsService {
  constructor() {}

  private productList: ProductItem[] = Products;

  public loadProducts(): ProductItem[] {
    return this.productList;
  }

  public searchProductsByName(searchTerm = '', ignoreCase = true) {
    const re = new RegExp(searchTerm, ignoreCase ? 'i' : '');
    return this.productList.filter(i => re.test(i.name));
  }
}
