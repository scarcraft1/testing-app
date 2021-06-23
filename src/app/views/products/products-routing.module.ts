import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RolesResolverService } from 'src/app/core/services';
import { NewProductComponent } from './components/new-product/new-product.component';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { FeaturedProductsComponent } from './routes';
import { MenuComponent } from './routes/menu/menu.component';
import { NewCommentComponent } from './routes/new-comment/new-comment.component';
import { P404Component } from './routes/p404/p404.component';
import { AdminGuardService, ProductResolverService } from './services';
import { ProductChildService } from './services/product-child.service';

const ROUTES: Routes = [
  {
    path: 'all-products',
    component: MenuComponent,
    // dice cuando se pueden activar los hijos
    canActivateChild: [ProductChildService],
    children: [
      {
        path: 'featured-products',
        component: FeaturedProductsComponent,
      },
      {
        path: 'new-product',
        // dice cuando se puede activar la ruta
        canActivate: [AdminGuardService],
        component: NewProductComponent,
      },
      {
        path: ':id/details',
        component: ProductItemComponent
      },
      {
        path: ':id/new-comment',
        component: NewCommentComponent,
        data: {
          titulo: 'hola nuevo comentario'
        },
        resolve: {
          product: ProductResolverService,
          userRoles: RolesResolverService
        }
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
