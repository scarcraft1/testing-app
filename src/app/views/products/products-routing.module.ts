import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewProductComponent } from './components/new-product/new-product.component';
import { FeaturedProductsComponent } from './routes';
import { P404Component } from './routes/p404/p404.component';

const ROUTES: Routes = [
  {
    path: 'all-products',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'featured-products'
      },
      {
        path: 'featured-products',
        component: FeaturedProductsComponent,
      },
      {
        path: 'new-product',
        component: NewProductComponent,
      },
      {
        path: '**',
        component: P404Component
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}
