import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';

import { LoginRoutes } from './login.routes';
import { LoginReducer } from '../store/cacheStore.reducer';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(LoginRoutes),
    ReactiveFormsModule
  ],
  declarations: [LoginComponent]
})
export class LoginModule { }
