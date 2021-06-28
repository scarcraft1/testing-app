import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NewProductCommand, ProductItem } from '../models';

@Injectable({ providedIn: 'root' })
export class ProductsService {
  private readonly URL = 'api/products';

  constructor(private http: HttpClient) {}

  // private productList: ProductItem[] = Products;

  public loadProducts(): Observable<ProductItem[]> {
    return this.http.get<ProductItem[]>(`${this.URL}`);
  }

  public searchProductsByName(
    searchTerm = '',
    ignoreCase = true
  ): Observable<ProductItem[]> {
    let params = new HttpParams();
    params = params.append('query', searchTerm);
    params = params.append('ignoreCase', ignoreCase);

    // ${this.URL}/search?query=prueba&ignoreCase=true
    return this.http.get<ProductItem[]>(`${this.URL}/search`, { params })

    // const re = new RegExp(searchTerm, ignoreCase ? 'i' : '');
    // return this.loadProducts().pipe(
    //   map((productList) => productList.filter((i) => re.test(i.name)))
    // );
  }

  public createProduct(command: NewProductCommand) {
    this.http.post(`${this.URL}/new`, command);
  }

  public searchProductsByCategories(
    categories: string[] = []
  ): Observable<ProductItem[]> {
    if (!categories.length) {
      return this.loadProducts();
    }
    return this.loadProducts().pipe(
      map((productList) =>
        productList.filter((product) =>
          categories.some((category) => product.category === category)
        )
      )
    );
  }
}
