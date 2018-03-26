import { Routes } from '@angular/router';
import { SuperComponent } from './super.component';
import { HasLoginGuard } from '../guard/has-login.guard';

export const SuperRoutes: Routes = [
  {
    path: '',
    component: SuperComponent,
    canActivate: [ HasLoginGuard ]
  }
];
