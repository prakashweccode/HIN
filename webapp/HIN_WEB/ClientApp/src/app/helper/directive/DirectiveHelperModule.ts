import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavPermissionCheck } from './NavPermissionCheck';
import { PermissionCheck } from './PermissionCheck';
import { GridPermissionCheck } from './TablePermissionCheck';

@NgModule({
  declarations: [NavPermissionCheck, PermissionCheck, GridPermissionCheck],
  imports: [
    CommonModule
  ],
  exports: [NavPermissionCheck, PermissionCheck, GridPermissionCheck]
})
export class DirectiveHelperModule { }
