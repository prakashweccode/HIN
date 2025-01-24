import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SecurityPermissionComponent } from './securityPermission.component';

const routes: Routes = [{ path: '', component: SecurityPermissionComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecurityPermissionRoutingModule { }
