import { Routes } from '@angular/router';
import { StaffComponent } from './staff.component';
import { StaffSearchComponent } from './staff-search/staff-search.component';
import { StaffEditComponent } from './staff-edit/staff-edit.component';
import { SwitchSearchComponent } from './switch-search/switch-search.component';
import { SwitchEditComponent } from './switch-edit/switch-edit.component';
import { HoldEditComponent } from './hold-edit/hold-edit.component';
import { TeamScheduleSearchComponent } from './team-schedule-search/team-schedule-search.component';
import { TeamScheduleModComponent } from './team-schedule-mod/team-schedule-mod.component';
import { LeaveSearchComponent } from './leave-search/leave-search.component';
import { LeaveEditComponent } from './leave-edit/leave-edit.component';
import { TeamScheduleSetComponent } from './team-schedule-set/team-schedule-set.component';
import { AttendanceCompareComponent } from './attendance-compare/attendance-compare.component';
import { AttendanceCheckComponent } from './attendance-check/attendance-check.component';
import { AttendanceEditComponent } from './attendance-edit/attendance-edit.component';
import { CheckSearchComponent } from './check-search/check-search.component';
import { StaffCountComponent } from './staff-count/staff-count.component';

export const StaffRoutes: Routes = [
  {
    path: '',
    component: StaffComponent,
    children: [
      {
        path: '',
        redirectTo: 'search'
      },
      {
        path: 'search',
        component: StaffSearchComponent
      },
      {
        path: 'edit',
        component: StaffEditComponent
      },
      {
        path: 'leaveSearch',
        component: LeaveSearchComponent
      },
      {
        path: 'switchSearch',
        component: SwitchSearchComponent
      },
      {
        path: 'switchEdit',
        component: SwitchEditComponent
      },
      {
        path: 'leaveEdit',
        component: LeaveEditComponent
      },
      {
        path: 'holdSearch',
        component: HoldEditComponent
      },
      {
        path: 'teamScheduleSearch',
        component: TeamScheduleSearchComponent
      },
      {
        path: 'teamScheduleMod',
        component: TeamScheduleModComponent
      },
      {
        path: 'teamScheduleSet',
        component: TeamScheduleSetComponent
      },
      {
        path: 'switchEdit',
        component: SwitchEditComponent
      },
      {
        path: 'holdEdit',
        component: HoldEditComponent
      },
      {
        path: 'attendanceCompare',
        component: AttendanceCompareComponent
      },
      {
        path: 'attendanceCheck',
        component: AttendanceCheckComponent
      },
      {
        path: 'attendanceEdit',
        component: AttendanceEditComponent
      },
      {
        path: 'checkSearch',
        component: CheckSearchComponent
      },
      {
        path: 'count',
        component: StaffCountComponent
      }
    ]
  }
];
