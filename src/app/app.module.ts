import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { LoginReducer, GreenReducer } from './store/cacheStore.reducer';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { PublicStaticService } from './shared/services/public-static.service';
import { ModalModule } from 'ngx-bootstrap/modal';

import { AppRoutes } from './app.routes';
import { HasLoginGuard } from './guard/has-login.guard';
import { AdminGuard, GeneralGuard, TollGuard, SuperGuard } from './guard/guards.guard';
import { ConfirmComponent } from './shared/confirm/confirm.component';
import { AlertComponent } from './shared/alert/alert.component';

@NgModule({
  declarations: [
    AppComponent,
    ConfirmComponent,
    AlertComponent
  ],
  imports: [
    BrowserAnimationsModule,
    RouterModule.forRoot(AppRoutes),
    HttpModule,
    StoreModule.forRoot({
      login: LoginReducer,
      green: GreenReducer
    }),
    ModalModule.forRoot()
  ],
  entryComponents: [
    ConfirmComponent,
    AlertComponent
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    PublicStaticService,
    HasLoginGuard,
    AdminGuard,
    GeneralGuard,
    TollGuard,
    SuperGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
