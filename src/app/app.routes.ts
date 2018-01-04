import { Routes } from '@angular/router';

export const AppRoutes: Routes = [
  {
    path: '',
    redirectTo: 'login'
  },
  {
    path: 'login',
    loadChildren: './login/login.module.ts#LoginModule'
  },
  {
    path: 'main',
    loadChildren: './main/main.module.ts#MainModule'
  }
];
