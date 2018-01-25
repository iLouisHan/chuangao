import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { InternalComponent } from './internal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InternalRoutes } from './internal.routes';
import { CalendarModule, PaginatorModule } from 'primeng/primeng';
import { SharedModule } from '../../shared/shared.module';
import { TrainExecuteComponent } from './train-execute/train-execute.component';
import { TrainExecuteSearchComponent } from './train-execute-search/train-execute-search.component';
import { TrainPlanSearchComponent } from './train-plan-search/train-plan-search.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(InternalRoutes),
    PaginatorModule,
    CalendarModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [InternalComponent, TrainExecuteComponent, TrainExecuteSearchComponent, TrainPlanSearchComponent]
})
export class InternalModule { }
