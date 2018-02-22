import { Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { RoadCompanyComponent } from './road-company/road-company.component';
import { HasLoginGuard } from '../guard/has-login.guard';
import { HomeComponent } from '../shared/home/home.component';
import { DivisionComponent } from './division/division.component';
import { StaffDetailComponent } from '../shared/staff-detail/staff-detail.component';
import { StaffSearchComponent } from '../shared/staff-search/staff-search.component';
import { StaffCountComponent } from '../shared/staff-count/staff-count.component';
import { StaffEditComponent } from '../shared/staff-edit/staff-edit.component';
import { TeamScheduleSearchComponent } from '../shared/team-schedule-search/team-schedule-search.component';
import { SwitchSearchComponent } from '../shared/switch-search/switch-search.component';
import { LeaveSearchComponent } from '../shared/leave-search/leave-search.component';
import { StaffTransferComponent } from './staff-transfer/staff-transfer.component';

export const AdminRoutes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [HasLoginGuard],
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'roadCompany',
        component: RoadCompanyComponent
      },
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'roadCompanyInput',
        loadChildren: './road-company-input/road-company-input.module#RoadCompanyInputModule'
      },
      {
        path: 'division',
        component: DivisionComponent
      },
      {
        path: 'divisionInput',
        loadChildren: './division-input/division-input.module#DivisionInputModule'
      },
      {
        path: 'staffDetail',
        component: StaffDetailComponent
      },
      {
        path: 'staffDetailInput',
        loadChildren: '../shared/staff-input/staff-input.module#StaffInputModule'
      },
      {
        path: 'staff',
        children: [
          {
            path: '',
            redirectTo: 'search',
            pathMatch: 'full'
          },
          {
            path: 'search',
            component: StaffSearchComponent
          },
          {
            path: 'count',
            component: StaffCountComponent
          },
          {
            path: 'edit',
            component: StaffEditComponent
          },
          {
            path: 'teamScheduleSearch',
            component: TeamScheduleSearchComponent
          },
          {
            path: 'switchSearch',
            component: SwitchSearchComponent
          },
          {
            path: 'leaveSearch',
            component: LeaveSearchComponent
          },
          {
            path: 'staffTransfer',
            component: StaffTransferComponent
          }
        ]
      },
      {
        path: 'internal',
        loadChildren: '../shared/internal/internal.module#InternalModule'
      }
    ]
  }
];
