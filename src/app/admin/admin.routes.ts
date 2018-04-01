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
import { ClothSearchComponent } from '../shared/cloth-search/cloth-search.component';
import { ClothHistoryComponent } from '../shared/cloth-history/cloth-history.component';
import { CheckSearchComponent } from '../shared/check-search/check-search.component';
import { AttendanceCheckComponent } from '../shared/attendance-check/attendance-check.component';
import { TollStationComponent } from '../shared/toll-station/toll-station.component';
import { EditPasswordComponent } from '../shared/edit-password/edit-password.component';

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
        path: 'tollStation',
        component: TollStationComponent
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
          },
          {
            path: 'clothSearch',
            component: ClothSearchComponent
          },
          {
            path: 'clothHistory',
            component: ClothHistoryComponent
          },
          {
            path: 'checkSearch',
            component: CheckSearchComponent
          },
          {
            path: 'attendanceCheck',
            component: AttendanceCheckComponent
          }
        ]
      },
      {
        path: 'internal',
        loadChildren: '../shared/internal/internal.module#InternalModule'
      },
      {
        path: 'green',
        loadChildren: '../main/green/green.module#GreenModule'
      },
      {
        path: 'editPassword',
        component: EditPasswordComponent
      }
    ]
  }
];
