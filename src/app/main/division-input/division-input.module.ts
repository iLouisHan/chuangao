import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DivisionInputComponent } from './division-input.component';
import { BasicInfoComponent } from './basic-info/basic-info.component';
import { DivisionImagesComponent } from './division-images/division-images.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    DivisionInputComponent,
    BasicInfoComponent,
    DivisionImagesComponent
  ]
})
export class DivisionInputModule { }
