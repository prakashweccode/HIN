import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListpartcatalogRoutingModule } from './listpartcatalog-routing.module';
import { ListpartcatalogComponent } from './listpartcatalog.component';
import { DataGridModule } from '../data-grid/data-grid.module';


@NgModule({
  declarations: [ListpartcatalogComponent],
  imports: [
    CommonModule,
    ListpartcatalogRoutingModule,
    DataGridModule
  ]
})
export class ListpartcatalogModule { }
