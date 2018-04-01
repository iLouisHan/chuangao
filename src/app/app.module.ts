import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { LoginReducer, GreenReducer } from './store/cacheStore.reducer';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { PublicStaticService } from './shared/services/public-static.service';

import { AppRoutes } from './app.routes';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserAnimationsModule,
    RouterModule.forRoot(AppRoutes),
    HttpModule,
    StoreModule.forRoot({
      login: LoginReducer,
      green: GreenReducer
    })
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    PublicStaticService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
