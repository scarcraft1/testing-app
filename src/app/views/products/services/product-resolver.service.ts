import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ProductItem } from '../models';
import { ProductsService } from './products.service';

@Injectable({ providedIn: 'root' })
export class ProductResolverService implements Resolve<ProductItem | undefined> {

  constructor(private service: ProductsService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot): Observable<ProductItem | undefined> | Promise<ProductItem | undefined> | ProductItem | undefined {
    return this.service.loadProducts()
      .pipe(
        map(productList => productList.find(i => i.id === Number(route.paramMap.get('id')))),
        tap(product => {
          if (!product) {
            this.router.navigateByUrl('/products/all-products/featured-products');
          }
        })
      );
  }
}
