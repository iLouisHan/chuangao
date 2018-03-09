import { Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { HasLoginGuard } from '../guard/has-login.guard';
import { TollGuard } from '../guard/toll.guard';
import { AdminGuard } from '../guard/admin.guard';

import { TollStationComponent } from './toll-station/toll-station.component';
import { HomeComponent } from '../shared/home/home.component';
import { StaffDetailComponent } from '../shared/staff-detail/staff-detail.component';

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
        path: 'tollStation',
        component: TollStationComponent
      },
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'staff',
        loadChildren: './staff/staff.module#StaffModule'
      },
      {
        path: 'green',
        loadChildren: './green/green.module#GreenModule'
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
        path: 'tollStationInput',
        loadChildren: './toll-station-input/toll-station-input.module#TollStationInputModule'
      },
      {
        path: 'internal',
        loadChildren: '../shared/internal/internal.module#InternalModule'
      }
    ]
  }
];
