import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent, HeadBarComponent, SidebarComponent } from './components';
@NgModule({
  declarations: [
    AppComponent,
    HeadBarComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
