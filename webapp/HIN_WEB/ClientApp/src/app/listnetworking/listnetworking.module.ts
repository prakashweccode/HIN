import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListnetworkingRoutingModule } from './listnetworking-routing.module';
import { ListnetworkingComponent } from './listnetworking.component';
import { DataGridModule } from '../data-grid/data-grid.module';
import { EditcolumnModule } from '../editcolumn/editcolumn.module';
import { DirectiveHelperModule } from '../helper/directive/DirectiveHelperModule';


@NgModule({
  declarations: [ListnetworkingComponent],
  imports: [
    CommonModule,
    ListnetworkingRoutingModule, DataGridModule, EditcolumnModule, DirectiveHelperModule
  ]
})
export class ListnetworkingModule { }
