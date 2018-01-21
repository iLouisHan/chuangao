import { Routes } from '@angular/router';
import { StaffComponent } from './staff.component';
import { StaffSearchComponent } from './staff-search/staff-search.component';

export const StaffRoutes: Routes = [
  {
    path: '',
    component: StaffComponent,
    children: [
      {
        path: '',
        redirectTo: 'search'
      },
      {
        path: 'search',
        component: StaffSearchComponent
      }
    ]
  }
];
