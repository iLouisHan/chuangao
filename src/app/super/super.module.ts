import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuperComponent } from './super.component';
import { SharedModule } from '../shared/shared.module';

import { SuperRoutes } from './super.routes';

import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule, PaginatorModule, TreeModule } from 'primeng/primeng';
import { HasLoginGuard } from '../guard/has-login.guard';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(SuperRoutes),
    FormsModule,
    ReactiveFormsModule,
    CalendarModule,
    PaginatorModule,
    TreeModule,
    SharedModule
  ],
  declarations: [SuperComponent],
  providers: [
    HasLoginGuard
  ]
})
export class SuperModule { }
