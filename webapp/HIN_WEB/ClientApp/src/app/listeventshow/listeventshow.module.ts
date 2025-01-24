import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListeventshowRoutingModule } from './listeventshow-routing.module';
import { ListeventshowComponent } from './listeventshow.component';
import { DataGridModule } from '../data-grid/data-grid.module';
import { EditcolumnModule } from '../editcolumn/editcolumn.module';
import { DirectiveHelperModule } from '../helper/directive/DirectiveHelperModule';


@NgModule({
  declarations: [ListeventshowComponent],
  imports: [
    CommonModule,
    ListeventshowRoutingModule, DataGridModule, EditcolumnModule, DirectiveHelperModule
  ]
})
export class ListeventshowModule { }
