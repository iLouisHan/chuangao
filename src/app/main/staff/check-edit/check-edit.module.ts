import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CheckEditRoutes } from './check-edit.routes';
import { CommonModule } from '@angular/common';
import { CheckEditComponent } from './check-edit.component';
import { CompositComponent } from './composit/composit.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ExamComponent } from './exam/exam.component';
import { StarComponent } from './star/star.component';
import { LevelComponent } from './level/level.component';
import { CalendarModule, PaginatorModule } from 'primeng/primeng';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(CheckEditRoutes),
    PaginatorModule,
    CalendarModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [CheckEditComponent, CompositComponent, ExamComponent, StarComponent, LevelComponent]
})
export class CheckEditModule { }
