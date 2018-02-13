import { Routes } from '@angular/router';
import { StaffComponent } from './staff.component';
import { SwitchEditComponent } from './switch-edit/switch-edit.component';
import { HoldEditComponent } from './hold-edit/hold-edit.component';
import { TeamScheduleModComponent } from './team-schedule-mod/team-schedule-mod.component';
import { LeaveEditComponent } from './leave-edit/leave-edit.component';
import { TeamScheduleSetComponent } from './team-schedule-set/team-schedule-set.component';
import { AttendanceCompareComponent } from './attendance-compare/attendance-compare.component';
import { AttendanceEditComponent } from './attendance-edit/attendance-edit.component';
import { StaffSearchComponent } from '../../shared/staff-search/staff-search.component';
import { StaffCountComponent } from '../../shared/staff-count/staff-count.component';
import { StaffEditComponent } from '../../shared/staff-edit/staff-edit.component';
import { TeamScheduleSearchComponent } from '../../shared/team-schedule-search/team-schedule-search.component';
import { SwitchSearchComponent } from '../../shared/switch-search/switch-search.component';
import { LeaveSearchComponent } from '../../shared/leave-search/leave-search.component';
import { AttendanceCheckComponent } from '../../shared/attendance-check/attendance-check.component';
import { CheckSearchComponent } from '../../shared/check-search/check-search.component';

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
      },
      {
        path: 'checkEdit',
        loadChildren: './check-edit/check-edit.module#CheckEditModule'
      }
    ]
  }
];
