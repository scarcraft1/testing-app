import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ProductItem } from '../models';
import { ProductsService } from './products.service';

@Injectable({ providedIn: 'root' })
export class ProductResolverService implements Resolve<ProductItem> {

  constructor(private service: ProductsService, private router: Router) { }
  resolve(route: ActivatedRouteSnapshot): Observable<ProductItem> | Promise<ProductItem> | ProductItem {
    const routeItem = this.service.loadProducts().find(i => i.id === Number(route.paramMap.get('id')));
    if (routeItem) {
      return routeItem;
    }
    this.router.navigateByUrl('/products/all-products');
    return of(null as unknown as ProductItem);
  }
}
