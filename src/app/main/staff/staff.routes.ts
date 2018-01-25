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
      }
    ]
  }
];
