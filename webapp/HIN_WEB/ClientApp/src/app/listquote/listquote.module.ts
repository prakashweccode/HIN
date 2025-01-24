import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListquoteRoutingModule } from './listquote-routing.module';
import { ListquoteComponent } from './listquote.component';
import { DataGridModule } from '../data-grid/data-grid.module';


@NgModule({
  declarations: [ListquoteComponent],
  imports: [
    CommonModule,
    ListquoteRoutingModule, DataGridModule
  ]
})
export class ListquoteModule { }
