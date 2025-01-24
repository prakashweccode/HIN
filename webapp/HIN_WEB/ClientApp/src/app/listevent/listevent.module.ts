import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListeventRoutingModule } from './listevent-routing.module';
import { ListeventComponent } from './listevent.component';
import { DataGridModule } from '../data-grid/data-grid.module';
import { EditcolumnModule } from '../editcolumn/editcolumn.module';
import { DirectiveHelperModule } from '../helper/directive/DirectiveHelperModule';


@NgModule({
  declarations: [ListeventComponent],
  imports: [
    CommonModule,
    ListeventRoutingModule, DataGridModule, EditcolumnModule, DirectiveHelperModule
  ]
})
export class ListeventModule { }
