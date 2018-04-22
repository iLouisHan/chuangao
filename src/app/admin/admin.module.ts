import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AdminComponent } from './admin.component';
import { RouterModule } from '@angular/router';
import { AdminSidebarComponent } from './admin-sidebar/admin-sidebar.component';
import { SharedModule } from '../shared/shared.module';
import { AdminRoutes } from './admin.routes';

import { RoadCompanyComponent } from './road-company/road-company.component';
import { DivisionComponent } from './division/division.component';
import { StaffTransferComponent } from './staff-transfer/staff-transfer.component';
import { PaginatorModule, CalendarModule } from 'primeng/primeng';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(AdminRoutes),
    ReactiveFormsModule,
    FormsModule,
    PaginatorModule,
    CalendarModule
  ],
  declarations: [
    AdminComponent,
    AdminSidebarComponent,
    RoadCompanyComponent,
    DivisionComponent,
    StaffTransferComponent
  ]
})
export class AdminModule { }
