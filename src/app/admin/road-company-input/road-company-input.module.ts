import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { RoadCompanyInputRoutes } from './road-company-input.routes';

import { RoadCompanyInputComponent } from './road-company-input.component';
import { BasicInfoComponent } from './basic-info/basic-info.component';
import { RoadCompanyImagesControlComponent } from './road-company-images-control/road-company-images-control.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(RoadCompanyInputRoutes),
    ReactiveFormsModule
  ],
  declarations: [
    RoadCompanyInputComponent,
    BasicInfoComponent,
    RoadCompanyImagesControlComponent
  ]
})
export class RoadCompanyInputModule { }
