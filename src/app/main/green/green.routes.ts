import { Routes } from '@angular/router';
import { GreenComponent } from './green.component';
import { GreenHistoryComponent } from './green-history/green-history.component';
import { GreenSearchComponent } from './green-search/green-search.component';
import { GoodsControlComponent } from './goods-control/goods-control.component';
import { GoodsSearchComponent } from './goods-search/goods-search.component';
import { GreenCheckComponent } from './green-check/green-check.component';
import { GreenCheckDetailComponent } from './green-check-detail/green-check-detail.component';

export const GreenRoutes: Routes = [
  {
    path: '',
    component: GreenComponent,
    children: [
      {
        path: '',
        redirectTo: 'history',
        pathMatch: 'full'
      },
      {
        path: 'history',
        component: GreenHistoryComponent
      },
      {
        path: 'search',
        component: GreenSearchComponent
      },
      {
        path: 'goodsControl',
        component: GoodsControlComponent
      },
      {
        path: 'goodsSearch',
        component: GoodsSearchComponent
      },
      {
        path: 'check',
        component: GreenCheckComponent
      },
      {
        path: 'checkDetail',
        component: GreenCheckDetailComponent
      }
    ]
  }
];
