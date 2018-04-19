import { Routes } from '@angular/router';
import { SelfDetailComponent } from './person/self-detail/self-detail.component';
import { SelfEditComponent } from './person/self-edit/self-edit.component';
import { GeneralComponent } from './general.component';
import { HoldEditComponent } from './hold-edit/hold-edit.component';
import { SwitchEditComponent } from './switch-edit/switch-edit.component';
import { LeaveEditComponent } from './leave-edit/leave-edit.component';
import { ReturnEditComponent } from './return-edit/return-edit.component';
import { EditPasswordComponent } from '../shared/edit-password/edit-password.component';

export const GeneralRoute: Routes = [
  {
    path: '',
    component: GeneralComponent,
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
      },
      {
        path: 'internal',
        loadChildren: '../shared/internal/internal.module#InternalModule'
      },
      {
        path: 'holdEdit',
        component: HoldEditComponent
      },
      {
        path: 'switchEdit',
        component: SwitchEditComponent
      },
      {
        path: 'leaveEdit',
        component: LeaveEditComponent
      },
      {
        path: 'returnEdit',
        component: ReturnEditComponent
      },
      {
        path: 'editPassword',
        component: EditPasswordComponent
      }
    ]
  }
];
