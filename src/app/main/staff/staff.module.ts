import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StaffRoutes } from './staff.routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StaffComponent } from './staff.component';
import { SharedModule } from '../../shared/shared.module';
import { CalendarModule, PaginatorModule } from 'primeng/primeng';
import { StaffSearchComponent } from './staff-search/staff-search.component';
import { StaffEditComponent } from './staff-edit/staff-edit.component';
import { StaffLeaveComponent } from './staff-leave/staff-leave.component';
import { SwitchSearchComponent } from './switch-search/switch-search.component';
import { SwitchEditComponent } from './switch-edit/switch-edit.component';
import { HoldEditComponent } from './hold-edit/hold-edit.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(StaffRoutes),
    SharedModule,
    CalendarModule,
    FormsModule,
    ReactiveFormsModule,
    PaginatorModule
  ],
  declarations: [
    StaffComponent,
    StaffSearchComponent,
    StaffEditComponent,
    StaffLeaveComponent,
    SwitchSearchComponent,
    SwitchEditComponent,
    HoldEditComponent
  ]
})
export class StaffModule { }
