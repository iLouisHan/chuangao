import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';

import { LoginRoutes } from './login.routes';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(LoginRoutes)
  ],
  declarations: [LoginComponent]
})
export class LoginModule { }
