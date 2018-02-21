import { Routes } from '@angular/router';
import { SelfDetailComponent } from './person/self-detail/self-detail.component';
import { SelfEditComponent } from './person/self-edit/self-edit.component';
import { HasLoginGuard } from '../guard/has-login.guard';
import { GeneralComponent } from './general.component';

export const GeneralRoute: Routes = [
  {
    path: '',
    component: GeneralComponent,
    canActivate: [HasLoginGuard],
    children: [
      {
        path: '',
        redirectTo: 'person-detail',
        pathMatch: 'full'
      },
      {
        path: 'person-detail',
        component: SelfDetailComponent
      },
      {
        path: 'person-edit',
        component: SelfEditComponent
      }
    ]
  }
];
