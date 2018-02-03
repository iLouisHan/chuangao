import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminComponent } from './admin.component';
import { RouterModule } from '@angular/router';
import { AdminSidebarComponent } from './admin-sidebar/admin-sidebar.component';
import { SharedModule } from '../shared/shared.module';
import { AdminRoutes } from './admin.routes';
import { HasLoginGuard } from '../guard/has-login.guard';

import { RoadCompanyComponent } from './road-company/road-company.component';
import { DivisionComponent } from './division/division.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(AdminRoutes),
    ReactiveFormsModule
  ],
  declarations: [
    AdminComponent,
    AdminSidebarComponent,
    RoadCompanyComponent,
    DivisionComponent
  ],
  providers: [
    HasLoginGuard
  ]
})
export class AdminModule { }
