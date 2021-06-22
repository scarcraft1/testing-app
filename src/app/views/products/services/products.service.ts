import { Injectable } from '@angular/core';
import { Products } from 'src/app/db/products';
import { ProductItem } from '../models';

@Injectable({ providedIn: 'root' })
export class ProductsService {
  constructor() {}

  private productList: ProductItem[] = Products;

  public loadProducts(): ProductItem[] {
    return this.productList;
  }

  public searchProductsByName(searchTerm = '', ignoreCase = true): ProductItem[] {
    const re = new RegExp(searchTerm, ignoreCase ? 'i' : '');
    return this.productList.filter((i) => re.test(i.name));
  }

  public searchProductsByCategories(categories: string[] = []): ProductItem[] {
    if (!categories.length) {
      return this.productList;
    }
    return this.productList.filter((product) =>
      categories.some((category) => product.category === category)
    );
  }
}
