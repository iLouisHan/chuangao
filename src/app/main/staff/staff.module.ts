import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StaffRoutes } from './staff.routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StaffComponent } from './staff.component';
import { SharedModule } from '../../shared/shared.module';
import { CalendarModule, PaginatorModule } from 'primeng/primeng';
import { SwitchEditComponent } from './switch-edit/switch-edit.component';
import { HoldEditComponent } from './hold-edit/hold-edit.component';
import { TeamScheduleModComponent } from './team-schedule-mod/team-schedule-mod.component';
import { LeaveEditComponent } from './leave-edit/leave-edit.component';
import { TeamScheduleSetComponent } from './team-schedule-set/team-schedule-set.component';
import { AttendanceCompareComponent } from './attendance-compare/attendance-compare.component';
import { AttendanceEditComponent } from './attendance-edit/attendance-edit.component';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ClothAddComponent } from './cloth-add/cloth-add.component';
import { ClothChooseComponent } from './cloth-choose/cloth-choose.component';
import { ReturnEditComponent } from './return-edit/return-edit.component';

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
    SwitchEditComponent,
    HoldEditComponent,
    TeamScheduleModComponent,
    LeaveEditComponent,
    TeamScheduleSetComponent,
    AttendanceCompareComponent,
    AttendanceEditComponent,
    ClothAddComponent,
    ClothChooseComponent,
    ReturnEditComponent
  ]
})
export class StaffModule { }
