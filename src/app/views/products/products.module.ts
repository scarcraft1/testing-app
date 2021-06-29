import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { NewProductComponent } from './components/new-product/new-product.component';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { ProductsRoutingModule } from './products-routing.module';
import { FeaturedProductsComponent } from './routes';
import { MenuComponent } from './routes/menu/menu.component';
import { P404Component } from './routes/p404/p404.component';
import { NewCommentComponent } from './routes/new-comment/new-comment.component';
import { ReviewComponent } from './components/review/review.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    NewProductComponent,
    ProductItemComponent,
    FeaturedProductsComponent,
    MenuComponent,
    P404Component,
    NewCommentComponent,
    ReviewComponent
  ],
  imports: [
    CoreModule,
    SharedModule,
    ProductsRoutingModule
  ],
  exports: [
    NewProductComponent,
    ProductItemComponent
  ]
})
export class ProductsModule { }
