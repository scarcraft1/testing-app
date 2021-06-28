import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent, HeadBarComponent, SidebarComponent } from './components';
import { CoreModule } from './core/core.module';
import { InMemoryDataService } from './services/in-memory-data.service';
import { HomeComponent } from './routes/home/home.component';
import { P404Component } from './routes/p404/p404.component';
import { AuthInjector } from './services/auth-injector.service';


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
    AppRoutingModule,
    HttpClientModule,
    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInjector,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
