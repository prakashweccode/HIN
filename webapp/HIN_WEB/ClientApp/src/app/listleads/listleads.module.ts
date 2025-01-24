import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListleadsRoutingModule } from './listleads-routing.module';
import { ListleadsComponent } from './listleads.component';
import { DataGridModule } from '../data-grid/data-grid.module';
import { EditcolumnModule } from '../editcolumn/editcolumn.module';
import { DirectiveHelperModule } from '../helper/directive/DirectiveHelperModule';
import { CustomdropdownModule } from '../customdropdown/customdropdown.module';
import { AssignedtoModule } from '../assignedto/assignedto.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ListleadsComponent],
  imports: [
    CommonModule,
    ListleadsRoutingModule, DataGridModule, EditcolumnModule, DirectiveHelperModule, CustomdropdownModule, AssignedtoModule, FormsModule, ReactiveFormsModule
  ]
})
export class ListleadsModule { }
