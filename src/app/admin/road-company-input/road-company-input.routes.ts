import { Routes } from '@angular/router';
import { HasLoginGuard } from '../../guard/has-login.guard';
import { RoadCompanyInputComponent } from './road-company-input.component';
import { BasicInfoComponent } from './basic-info/basic-info.component';
import { RoadCompanyImagesControlComponent } from './road-company-images-control/road-company-images-control.component';

export const RoadCompanyInputRoutes: Routes = [
  {
    path: '',
    component: RoadCompanyInputComponent,
    canActivate: [HasLoginGuard],
    children: [
      {
        path: '',
        redirectTo: 'basic',
        pathMatch: 'full',
        canActivate: [HasLoginGuard]
      },
      {
        path: 'basic',
        component: BasicInfoComponent,
        canActivate: [HasLoginGuard]
      },
      {
        path: 'images',
        component: RoadCompanyImagesControlComponent,
        canActivate: [HasLoginGuard]
      }
    ]
  }
];
