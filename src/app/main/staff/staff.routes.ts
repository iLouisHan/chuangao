import { Routes } from '@angular/router';
import { StaffComponent } from './staff.component';
import { StaffSearchComponent } from './staff-search/staff-search.component';
import { StaffEditComponent } from './staff-edit/staff-edit.component';

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
      },
      {
        path: 'edit',
        component: StaffEditComponent
      }
    ]
  }
];
