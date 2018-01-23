import { Routes } from '@angular/router';
import { StaffComponent } from './staff.component';
import { StaffSearchComponent } from './staff-search/staff-search.component';
import { StaffEditComponent } from './staff-edit/staff-edit.component';
import { StaffLeaveComponent } from './staff-leave/staff-leave.component';
import { SwitchSearchComponent } from './switch-search/switch-search.component';
import { SwitchEditComponent } from './switch-edit/switch-edit.component';
import { HoldEditComponent } from './hold-edit/hold-edit.component';

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
      },
      {
        path: 'leave',
        component: StaffLeaveComponent
      },
      {
        path: 'switchSearch',
        component: SwitchSearchComponent
      },
      {
        path: 'switchEdit',
        component: SwitchEditComponent
      },
      {
        path: 'holdSearch',
        component: HoldEditComponent
      }
    ]
  }
];
