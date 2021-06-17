import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
