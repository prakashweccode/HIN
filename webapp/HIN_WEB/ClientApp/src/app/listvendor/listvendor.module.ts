import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListvendorRoutingModule } from './listvendor-routing.module';
import { ListvendorComponent } from './listvendor.component';
import { DataGridModule } from '../data-grid/data-grid.module';
import { EditcolumnModule } from '../editcolumn/editcolumn.module';
import { DirectiveHelperModule } from '../helper/directive/DirectiveHelperModule';


@NgModule({
  declarations: [ListvendorComponent],
  imports: [
    CommonModule,
    ListvendorRoutingModule, DataGridModule, EditcolumnModule, DirectiveHelperModule
  ]
})
export class ListvendorModule { }
