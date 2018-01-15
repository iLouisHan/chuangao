import { Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { HasLoginGuard } from '../guard/has-login.guard';
import { TollGuard } from '../guard/toll.guard';

import { RoadCompanyComponent } from './road-company/road-company.component';
import { TollStationComponent } from './toll-station/toll-station.component';
import { HomeComponent } from './home/home.component';
import { DivisionComponent } from './division/division.component';

export const MainRoutes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [HasLoginGuard],
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
        canActivate: [HasLoginGuard]
      },
      {
        path: 'roadCompany',
        component: RoadCompanyComponent,
        canActivate: [HasLoginGuard]
      },
      {
        path: 'division',
        component: DivisionComponent,
        canActivate: [HasLoginGuard]
      },
      {
        path: 'tollStation',
        component: TollStationComponent,
        canActivate: [HasLoginGuard]
      },
      {
        path: 'home',
        component: HomeComponent,
        canActivate: [HasLoginGuard, TollGuard]
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
      }
    ]
  }
];
