import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListpartnerRoutingModule } from './listpartner-routing.module';
import { ListpartnerComponent } from './listpartner.component';
import { DataGridModule } from '../data-grid/data-grid.module';
import { EditcolumnModule } from '../editcolumn/editcolumn.module';
import { DirectiveHelperModule } from '../helper/directive/DirectiveHelperModule';


@NgModule({
  declarations: [ListpartnerComponent],
  imports: [
    CommonModule,
    ListpartnerRoutingModule, DataGridModule, EditcolumnModule, DirectiveHelperModule
  ]
})
export class ListpartnerModule { }
