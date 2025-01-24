import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SecurityPermissionRoutingModule } from './securityPermission-routing.module';
import { SecurityPermissionComponent } from './securityPermission.component';
import { FormsModule } from '@angular/forms';
import { TreeviewComponent } from './treeview/treeview.component';
import { DirectiveHelperModule } from '../helper/directive/DirectiveHelperModule';

@NgModule({
  declarations: [SecurityPermissionComponent, TreeviewComponent],
  imports: [
    CommonModule,
    FormsModule,
    SecurityPermissionRoutingModule, DirectiveHelperModule
  ]
})
export class SecurityPermissionModule { }
