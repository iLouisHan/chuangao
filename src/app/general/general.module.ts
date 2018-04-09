import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GeneralComponent} from './general.component';
import {SelfDetailComponent} from './person/self-detail/self-detail.component';
import {SelfEditComponent} from './person/self-edit/self-edit.component';
import {GeneralRoute} from './general.routes';
import {RouterModule} from '@angular/router';
import {HasLoginGuard} from '../guard/has-login.guard';
import {GeneralSidebarComponent} from './general-sidebar/general-sidebar.component';
import {SharedModule} from '../shared/shared.module';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {CalendarModule, PaginatorModule} from 'primeng/primeng';
import {LeaveEditComponent} from './leave-edit/leave-edit.component';
import {SwitchEditComponent} from './switch-edit/switch-edit.component';
import {HoldEditComponent} from './hold-edit/hold-edit.component';
import {ReturnEditComponent} from './return-edit/return-edit.component';
import {ImageCropperComponent} from 'ng2-img-cropper';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(GeneralRoute),
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    CalendarModule,
    PaginatorModule
  ],
  declarations: [
    GeneralComponent,
    SelfDetailComponent,
    SelfEditComponent,
    GeneralSidebarComponent,
    LeaveEditComponent,
    SwitchEditComponent,
    HoldEditComponent,
    ReturnEditComponent,
    ImageCropperComponent,
  ],
  providers: [
    HasLoginGuard
  ]
})
export class GeneralModule {
}
