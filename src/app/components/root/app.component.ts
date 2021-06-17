import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ProductItem } from 'src/app/models';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public title = 'testing-app 2';
  public categorias = ['almacenamiento', 'baterias', 'periféricos'];
  public productos: ProductItem[] = [];

  constructor(private productService: ProductsService) { }

  public filterProducts(searchTerm = '') {
    this.productos = this.productService.searchProductsByName(searchTerm);
  }

  public filterProductsByCategories(categories: string[] = []) {
    this.productos = this.productService.searchProductsByCategories(categories);
  }

  ngOnInit(): void {
    this.productos = this.productService.loadProducts();
  }
}
