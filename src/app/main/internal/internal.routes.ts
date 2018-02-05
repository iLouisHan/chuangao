import { Routes } from '@angular/router';
import { InternalComponent } from './internal.component';
import { TrainPlanSearchComponent } from './train-plan-search/train-plan-search.component';
import { TrainExecuteSearchComponent } from './train-execute-search/train-execute-search.component';
import { TrainExecuteComponent } from './train-execute/train-execute.component';
import { TrainPlanComponent } from './train-plan/train-plan.component';
import { TalkSearchComponent } from './talk-search/talk-search.component';
import { TalkCountComponent } from './talk-count/talk-count.component';
import { DocSearchComponent } from './doc-search/doc-search.component';
import { StationSearchComponent } from './station-search/station-search.component';
import { StationInputComponent } from './station-input/station-input.component';
import { DeviceSearchComponent } from './device-search/device-search.component';
import { DeviceInputComponent } from './device-input/device-input.component';

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
        },
        {
            path: 'trainPlan',
            component: TrainPlanComponent
        },
        {
            path: 'talkSearch',
            component: TalkSearchComponent
        },
        {
            path: 'talkCount',
            component: TalkCountComponent
        },
        {
            path: 'docSearch',
            component: DocSearchComponent
        },
        {
            path: 'stationSearch',
            component: StationSearchComponent
        },
        {
            path: 'stationInput',
            component: StationInputComponent
        },
        {
            path: 'deviceSearch',
            component: DeviceSearchComponent
        },
        {
            path: 'deviceInput',
            component: DeviceInputComponent
        }
    ]
  }
];
