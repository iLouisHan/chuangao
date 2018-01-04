import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MainRoutes } from './main.routes';
import { HasLoginGuard } from '../guard/has-login.guard';

import { SidebarComponent } from './common/sidebar/sidebar.component';
import { NavbarComponent } from './common/navbar/navbar.component';
import { MainComponent } from './main.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(MainRoutes)
  ],
  declarations: [SidebarComponent, NavbarComponent, MainComponent],
  providers: [
    HasLoginGuard
  ]
})
export class MainModule { }
