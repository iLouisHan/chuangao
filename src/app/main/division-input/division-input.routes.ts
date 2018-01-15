import { Routes } from '@angular/router';
import { HasLoginGuard } from '../../guard/has-login.guard';
import { BasicInfoComponent } from './basic-info/basic-info.component';
import { DivisionImagesComponent } from './division-images/division-images.component';
import { DivisionInputComponent } from './division-input.component';

export const DivisionInputRoutes: Routes = [
  {
    path: '',
    component: DivisionInputComponent,
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
        component: DivisionImagesComponent,
        canActivate: [HasLoginGuard]
      }
    ]
  }
];
