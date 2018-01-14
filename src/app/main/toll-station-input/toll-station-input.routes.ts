import { Routes } from '@angular/router';
import { HasLoginGuard } from '../../guard/has-login.guard';
import { BasicInfoComponent } from './basic-info/basic-info.component';
import { TollStationInputComponent } from './toll-station-input.component';
import { TollStationImagesComponent } from './toll-station-images/toll-station-images.component';
import { ContactComponent } from './contact/contact.component';
import { OtherComponent } from './other/other.component';
import { LineComponent } from './line/line.component';

export const TollStationInputRoutes: Routes = [
  {
    path: '',
    component: TollStationInputComponent,
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
        path: 'contact',
        component: ContactComponent,
        canActivate: [HasLoginGuard]
      },
      {
        path: 'line',
        component: LineComponent,
        canActivate: [HasLoginGuard]
      },
      {
        path: 'other',
        component: OtherComponent,
        canActivate: [HasLoginGuard]
      },
      {
        path: 'images',
        component: TollStationImagesComponent,
        canActivate: [HasLoginGuard]
      }
    ]
  }
];
