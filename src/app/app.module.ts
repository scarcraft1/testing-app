import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent, HeadBarComponent, SidebarComponent } from './components';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { IsInvalidDirective } from './directives/is-invalid.directive';
import { IsValidPipe } from './pipes/is-valid.pipe';
import { NewProductComponent } from './components/new-product/new-product.component';
@NgModule({
  declarations: [
    AppComponent,
    HeadBarComponent,
    SidebarComponent,
    ProductItemComponent,
    IsInvalidDirective,
    IsValidPipe,
    NewProductComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
