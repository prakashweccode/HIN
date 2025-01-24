import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListcompanyregisterRoutingModule } from './listcompanyregister-routing.module';
import { ListcompanyregisterComponent } from './listcompanyregister.component';
import { DataGridModule } from '../data-grid/data-grid.module';
import { EditcolumnModule } from '../editcolumn/editcolumn.module';
import { DirectiveHelperModule } from '../helper/directive/DirectiveHelperModule';


@NgModule({
  declarations: [ListcompanyregisterComponent],
  imports: [
    CommonModule,
    ListcompanyregisterRoutingModule, DataGridModule, EditcolumnModule, DirectiveHelperModule
  ]
})
export class ListcompanyregisterModule { }
