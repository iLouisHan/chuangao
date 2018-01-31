import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DropOrgTreeComponent } from '../main/common/drop-org-tree/drop-org-tree.component';
import { TreeModule } from 'primeng/primeng';
import { SwitchChooseComponent } from './switch-choose/switch-choose.component';
import { InputSelectComponent } from './input-select/input-select.component';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  imports: [
    CommonModule,
    TreeModule,
    FormsModule
  ],
  declarations: [
    DropOrgTreeComponent,
    SwitchChooseComponent,
    InputSelectComponent,
    NavbarComponent
  ],
  exports: [
    DropOrgTreeComponent,
    SwitchChooseComponent,
    InputSelectComponent,
    NavbarComponent
  ]
})
export class SharedModule { }
