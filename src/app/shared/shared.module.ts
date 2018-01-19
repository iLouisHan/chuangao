import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DropOrgTreeComponent } from '../main/common/drop-org-tree/drop-org-tree.component';
import { TreeModule } from 'primeng/primeng';

@NgModule({
  imports: [
    CommonModule,
    TreeModule
  ],
  declarations: [
    DropOrgTreeComponent
  ],
  exports: [
    DropOrgTreeComponent
  ]
})
export class SharedModule { }
