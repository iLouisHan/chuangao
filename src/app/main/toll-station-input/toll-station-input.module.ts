import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { TollStationInputComponent } from './toll-station-input.component';
import { ContactComponent } from './contact/contact.component';
import { BasicInfoComponent } from './basic-info/basic-info.component';
import { LineComponent } from './line/line.component';
import { OtherComponent } from './other/other.component';
import { TollStationImagesComponent } from './toll-station-images/toll-station-images.component';

import { TollStationInputRoutes } from './toll-station-input.routes';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(TollStationInputRoutes)
  ],
  declarations: [
    TollStationInputComponent,
    ContactComponent,
    BasicInfoComponent,
    LineComponent,
    OtherComponent,
    TollStationImagesComponent
  ]
})
export class TollStationInputModule { }
