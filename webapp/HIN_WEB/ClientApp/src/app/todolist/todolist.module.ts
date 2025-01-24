import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodolistRoutingModule } from './todolist-routing.module';
import { TodolistComponent } from './todolist.component';
import { DataGridModule } from '../data-grid/data-grid.module';
import { DirectiveHelperModule } from '../helper/directive/DirectiveHelperModule';


@NgModule({
  declarations: [TodolistComponent],
  imports: [
    CommonModule, DataGridModule,
    TodolistRoutingModule, DirectiveHelperModule
  ],
  exports: [TodolistComponent]
})
export class TodolistModule { }
