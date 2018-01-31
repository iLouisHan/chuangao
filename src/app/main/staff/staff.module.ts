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
import { SwitchSearchComponent } from './switch-search/switch-search.component';
import { SwitchEditComponent } from './switch-edit/switch-edit.component';
import { HoldEditComponent } from './hold-edit/hold-edit.component';
import { LeaveSearchComponent } from './leave-search/leave-search.component';
import { TeamScheduleSearchComponent } from './team-schedule-search/team-schedule-search.component';
import { TeamScheduleModComponent } from './team-schedule-mod/team-schedule-mod.component';
import { LeaveEditComponent } from './leave-edit/leave-edit.component';
import { TeamScheduleSetComponent } from './team-schedule-set/team-schedule-set.component';
import { AttendanceCheckComponent } from './attendance-check/attendance-check.component';
import { AttendanceCompareComponent } from './attendance-compare/attendance-compare.component';
import { AttendanceEditComponent } from './attendance-edit/attendance-edit.component';
import { CheckSearchComponent } from './check-search/check-search.component';
import { StaffCountComponent } from './staff-count/staff-count.component';
import { AutoCompleteModule } from 'primeng/autocomplete';

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
    SwitchSearchComponent,
    SwitchEditComponent,
    HoldEditComponent,
    LeaveSearchComponent,
    TeamScheduleSearchComponent,
    TeamScheduleModComponent,
    LeaveEditComponent,
    TeamScheduleSetComponent,
    AttendanceCheckComponent,
    AttendanceCompareComponent,
    AttendanceEditComponent,
    CheckSearchComponent,
    StaffCountComponent
  ]
})
export class StaffModule { }
