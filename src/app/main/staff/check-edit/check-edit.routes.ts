import { Routes } from '@angular/router';
import { CheckEditComponent } from './check-edit.component';
import { CompositComponent } from './composit/composit.component';
import { ExamComponent } from './exam/exam.component';
import { StarComponent } from './star/star.component';
import { LevelComponent } from './level/level.component';

export const CheckEditRoutes: Routes = [
  {
    path: '',
    component: CheckEditComponent,
    children: [
      {
        path: '',
        redirectTo: 'composit',
        pathMatch: 'full'
      },
      {
        path: 'composit',
        component: CompositComponent
      },
      {
        path: 'exam',
        component: ExamComponent
      },
      {
        path: 'star',
        component: StarComponent
      },
      {
        path: 'level',
        component: LevelComponent
      }
    ]
  }
];
