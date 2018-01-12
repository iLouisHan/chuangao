import { Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { HasLoginGuard } from '../guard/has-login.guard';

import { RoadCompanyComponent } from './road-company/road-company.component';
import { TollStationComponent } from './toll-station/toll-station.component';

export const MainRoutes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [HasLoginGuard],
    children: [
      {
        path: '',
        redirectTo: 'roadCompany',
        pathMatch: 'full',
        canActivate: [HasLoginGuard]
      },
      {
        path: 'roadCompany',
        component: RoadCompanyComponent,
        canActivate: [HasLoginGuard]
      },
      {
        path: 'tollStation',
        component: TollStationComponent,
        canActivate: [HasLoginGuard]
      }
    ]
  }
];
