import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StaffRoutes } from './staff.routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StaffComponent } from './staff.component';
import { SharedModule } from '../../shared/shared.module';
import { CalendarModule, PaginatorModule } from 'primeng/primeng';
import { TableModule } from 'primeng/table';
import { StaffSearchComponent } from './staff-search/staff-search.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(StaffRoutes),
    SharedModule,
    CalendarModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    PaginatorModule
  ],
  declarations: [
    StaffComponent,
    StaffSearchComponent
  ]
})
export class StaffModule { }
