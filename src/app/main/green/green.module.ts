import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GreenRoutes } from './green.routes';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule, PaginatorModule, TreeModule } from 'primeng/primeng';

import { GreenCheckComponent } from './green-check/green-check.component';
import { GreenHistoryComponent } from './green-history/green-history.component';
import { GreenSearchComponent } from './green-search/green-search.component';
import { GreenCheckDetailComponent } from './green-check-detail/green-check-detail.component';
import { GoodsSearchComponent } from './goods-search/goods-search.component';
import { GoodsControlComponent } from './goods-control/goods-control.component';
import { GreenComponent } from './green.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(GreenRoutes),
    FormsModule,
    ReactiveFormsModule,
    CalendarModule,
    PaginatorModule,
    TreeModule
  ],
  declarations: [
    GreenCheckComponent,
    GreenHistoryComponent,
    GreenSearchComponent,
    GreenCheckDetailComponent,
    GoodsSearchComponent,
    GoodsControlComponent,
    GreenComponent
  ]
})
export class GreenModule { }
