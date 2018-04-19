import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { LoginReducer, GreenReducer } from './store/cacheStore.reducer';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { PublicStaticService } from './shared/services/public-static.service';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { ConfirmComponent } from './shared/confirm/confirm.component';

import { AppRoutes } from './app.routes';
import { HasLoginGuard } from './guard/has-login.guard';
import { AdminGuard, GeneralGuard, TollGuard, SuperGuard } from './guard/guards.guard';

@NgModule({
  declarations: [
    AppComponent,
    ConfirmComponent
  ],
  entryComponents: [
    ConfirmComponent
  ],
  imports: [
    BrowserAnimationsModule,
    RouterModule.forRoot(AppRoutes),
    HttpModule,
    StoreModule.forRoot({
      login: LoginReducer,
      green: GreenReducer
    }),
    BootstrapModalModule.forRoot({container:document.body})
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
