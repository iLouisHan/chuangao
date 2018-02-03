import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/primeng';
import { RouterModule } from '@angular/router';
import { staffInputRoutes } from './staff-input.routes';
import { StaffInputComponent } from './staff-input.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    CalendarModule,
    RouterModule.forChild(staffInputRoutes)
  ],
  declarations: [
    StaffInputComponent
  ]
})
export class StaffInputModule { }
