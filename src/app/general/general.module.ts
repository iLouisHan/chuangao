import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneralComponent } from './general.component';
import { SelfDetailComponent } from './person/self-detail/self-detail.component';
import { SelfEditComponent } from './person/self-edit/self-edit.component';
import { GeneralRoute } from './general.routes';
import { RouterModule } from '@angular/router';
import { HasLoginGuard } from '../guard/has-login.guard';
import { GeneralSidebarComponent } from './general-sidebar/general-sidebar.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/primeng';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(GeneralRoute),
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    CalendarModule
  ],
  declarations: [
    GeneralComponent,
    SelfDetailComponent,
    SelfEditComponent,
    GeneralSidebarComponent
  ],
  providers: [
    HasLoginGuard
  ]
})
export class GeneralModule { }
