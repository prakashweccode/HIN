import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditTenantUserComponent } from './edit-tenant-user.component';

const routes: Routes = [{ path: '', component: EditTenantUserComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditTenantUserRoutingModule { }
