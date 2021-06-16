import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent, HeadBarComponent, SidebarComponent } from './components';
import { ProductItemComponent } from './components/product-item/product-item.component';
@NgModule({
  declarations: [
    AppComponent,
    HeadBarComponent,
    SidebarComponent,
    ProductItemComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
