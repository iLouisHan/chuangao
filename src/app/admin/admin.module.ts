import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AdminSidebarComponent } from './admin-sidebar/admin-sidebar.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [AdminComponent, AdminSidebarComponent]
})
export class AdminModule { }
