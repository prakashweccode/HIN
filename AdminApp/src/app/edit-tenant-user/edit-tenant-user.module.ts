import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditTenantUserRoutingModule } from './edit-tenant-user-routing.module';
import { EditTenantUserComponent } from './edit-tenant-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    EditTenantUserComponent
  ],
  imports: [
    CommonModule,
    EditTenantUserRoutingModule, FormsModule, ReactiveFormsModule
  ]
})
export class EditTenantUserModule { }
