import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuperComponent } from './super.component';
import { SharedModule } from '../shared/shared.module';

import { SuperRoutes } from './super.routes';

import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TreeModule } from 'primeng/primeng';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(SuperRoutes),
    FormsModule,
    ReactiveFormsModule,
    TreeModule,
    SharedModule
  ],
  declarations: [SuperComponent]
})
export class SuperModule { }
