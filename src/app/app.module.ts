import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent, HeadBarComponent, SidebarComponent } from './components';
import { CoreModule } from './core/core.module';
import { HomeComponent } from './routes/home/home.component';
import { P404Component } from './routes/p404/p404.component';


@NgModule({
  declarations: [
    AppComponent,
    HeadBarComponent,
    SidebarComponent,
    HomeComponent,
    P404Component
  ],
  imports: [
    BrowserModule,
    CoreModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
