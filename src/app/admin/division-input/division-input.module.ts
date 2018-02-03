import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DivisionInputComponent } from './division-input.component';
import { BasicInfoComponent } from './basic-info/basic-info.component';
import { DivisionImagesComponent } from './division-images/division-images.component';
import { DivisionInputRoutes } from './division-input.routes';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(DivisionInputRoutes),
    ReactiveFormsModule
  ],
  declarations: [
    DivisionInputComponent,
    BasicInfoComponent,
    DivisionImagesComponent
  ]
})
export class DivisionInputModule { }
