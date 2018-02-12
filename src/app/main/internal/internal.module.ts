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
import { TrainPlanComponent } from './train-plan/train-plan.component';
import { TalkSearchComponent } from './talk-search/talk-search.component';
import { TalkCountComponent } from './talk-count/talk-count.component';
import { DocSearchComponent } from './doc-search/doc-search.component';
import { DocUploadComponent } from './doc-upload/doc-upload.component';
import { StationSearchComponent } from './station-search/station-search.component';
import { StationInputComponent } from './station-input/station-input.component';
import { DeviceSearchComponent } from './device-search/device-search.component';
import { DeviceInputComponent } from './device-input/device-input.component';

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
  declarations: [InternalComponent, TrainExecuteComponent, TrainExecuteSearchComponent,
    TrainPlanSearchComponent, TrainPlanComponent, TalkSearchComponent, TalkCountComponent, DocSearchComponent, DocUploadComponent,
    StationSearchComponent, StationInputComponent, DeviceSearchComponent, DeviceInputComponent]
})
export class InternalModule { }
