import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListtemplateRoutingModule } from './listtemplate-routing.module';
import { ListtemplateComponent } from './listtemplate.component';
import { DirectiveHelperModule } from '../helper/directive/DirectiveHelperModule';
import { DataGridModule } from '../data-grid/data-grid.module';
import { EditcolumnModule } from '../editcolumn/editcolumn.module';


@NgModule({
  declarations: [ListtemplateComponent],
  imports: [
    CommonModule,
    ListtemplateRoutingModule, DataGridModule, EditcolumnModule, DirectiveHelperModule
  ]
})
export class ListtemplateModule { }
