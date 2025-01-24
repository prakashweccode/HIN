import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListcurrencyRoutingModule } from './listcurrency-routing.module';
import { ListcurrencyComponent } from './listcurrency.component';
import { DataGridModule } from '../data-grid/data-grid.module';
import { FormsModule } from '@angular/forms';
import { DirectiveHelperModule } from '../helper/directive/DirectiveHelperModule';


@NgModule({
  declarations: [ListcurrencyComponent],
  imports: [
    CommonModule,
    ListcurrencyRoutingModule, DataGridModule, FormsModule, DirectiveHelperModule
  ]
})
export class ListcurrencyModule { }
