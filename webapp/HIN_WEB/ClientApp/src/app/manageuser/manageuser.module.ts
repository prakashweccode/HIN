import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageuserRoutingModule } from './manageuser-routing.module';
import { ManageuserComponent } from './manageuser.component';
import { DataGridModule } from '../data-grid/data-grid.module';
import { FormsModule } from '@angular/forms';
import { DirectiveHelperModule } from '../helper/directive/DirectiveHelperModule';


@NgModule({
  declarations: [ManageuserComponent],
  imports: [
    CommonModule,
    ManageuserRoutingModule,
    DataGridModule, FormsModule,
    DirectiveHelperModule
  ]
})
export class ManageuserModule { }
