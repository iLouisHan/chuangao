import { Routes } from '@angular/router';
import { LoginComponent } from './login.component';
import { HasLoginGuard } from '../guard/has-login.guard';

export const LoginRoutes: Routes = [
  {
    path: '',
    component: LoginComponent,
    canActivate: [HasLoginGuard]
  }
];
