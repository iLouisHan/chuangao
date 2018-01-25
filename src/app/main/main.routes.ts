import { Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { HasLoginGuard } from '../guard/has-login.guard';
import { TollGuard } from '../guard/toll.guard';
import { AdminGuard } from '../guard/admin.guard';

import { RoadCompanyComponent } from './road-company/road-company.component';
import { TollStationComponent } from './toll-station/toll-station.component';
import { HomeComponent } from './home/home.component';
import { DivisionComponent } from './division/division.component';
import { StaffComponent } from './staff/staff.component';
import { StaffDetailComponent } from './staff-detail/staff-detail.component';
import { StaffInputComponent } from './staff-input/staff-input.component';

export const MainRoutes: Routes = [
  {
    path: '',
    component: MainComponent,
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
        path: 'division',
        component: DivisionComponent
      },
      {
        path: 'tollStation',
        component: TollStationComponent
      },
      {
        path: 'home',
        component: HomeComponent,
        canActivate: [AdminGuard, TollGuard]
      },
      {
        path: 'staff',
        loadChildren: './staff/staff.module#StaffModule'
      },
      {
        path: 'staffDetail',
        component: StaffDetailComponent
      },
      {
        path: 'staffDetailInput',
        loadChildren: './staff-input/staff-input.module#StaffInputModule'
      },
      {
        path: 'roadCompanyInput',
        loadChildren: './road-company-input/road-company-input.module#RoadCompanyInputModule'
      },
      {
        path: 'divisionInput',
        loadChildren: './division-input/division-input.module#DivisionInputModule'
      },
      {
        path: 'tollStationInput',
        loadChildren: './toll-station-input/toll-station-input.module#TollStationInputModule'
      },
      {
        path: 'internal',
        loadChildren: './internal/internal.module#InternalModule'
      }
    ]
  }
];
