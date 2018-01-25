import { Routes } from '@angular/router';
import { InternalComponent } from './internal.component';
import { TrainPlanSearchComponent } from './train-plan-search/train-plan-search.component';
import { TrainExecuteSearchComponent } from './train-execute-search/train-execute-search.component';
import { TrainExecuteComponent } from './train-execute/train-execute.component'


export const InternalRoutes: Routes = [
  {
    path: '',
    component: InternalComponent,
    children: [
        {
            path: 'trainPlanSearch',
            component: TrainPlanSearchComponent
        },
        {
            path: 'trainExecuteSearch',
            component: TrainExecuteSearchComponent
        },
        {
            path: 'trainExecute',
            component: TrainExecuteComponent
        }
    ]
  }
];
