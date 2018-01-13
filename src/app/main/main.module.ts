import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MainRoutes } from './main.routes';
import { HasLoginGuard } from '../guard/has-login.guard';
import { SharedModule } from '../shared/shared.module';

import { SidebarComponent } from './common/sidebar/sidebar.component';
import { NavbarComponent } from './common/navbar/navbar.component';
import { MainComponent } from './main.component';

import { CalendarModule } from 'primeng/primeng';

import { RoadCompanyComponent } from './road-company/road-company.component';
import { HomeComponent } from './home/home.component';
import { TollStationComponent } from './toll-station/toll-station.component';
import { RoadCompanyInputComponent } from './road-company-input/road-company-input.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(MainRoutes),
    SharedModule,
    CalendarModule,
  ],
  declarations: [
    SidebarComponent,
    NavbarComponent,
    MainComponent,
    RoadCompanyComponent,
    HomeComponent,
    TollStationComponent,
    RoadCompanyInputComponent
  ],
  providers: [
    HasLoginGuard
  ]
})
export class MainModule { }
