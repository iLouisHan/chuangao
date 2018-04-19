import { Routes } from '@angular/router';
import { HasLoginGuard } from './guard/has-login.guard';
import { TollGuard, AdminGuard, GeneralGuard, SuperGuard } from './guard/guards.guard';

export const AppRoutes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: './login/login.module#LoginModule'
  },
  {
    path: 'main',
    loadChildren: './main/main.module#MainModule',
    canActivate: [HasLoginGuard, TollGuard]
  },
  {
    path: 'admin',
    loadChildren: './admin/admin.module#AdminModule',
    canActivate: [HasLoginGuard, AdminGuard]
  },
  {
    path: 'general',
    loadChildren: './general/general.module#GeneralModule',
    canActivate: [HasLoginGuard, GeneralGuard]
  },
  {
    path: 'super',
    loadChildren: './super/super.module#SuperModule',
    canActivate: [HasLoginGuard, SuperGuard]
  }
];
