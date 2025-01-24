import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgendaRoutingModule } from './agenda-routing.module';
import { AgendaComponent } from './agenda.component';
import { DataGridModule } from '../data-grid/data-grid.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TodolistModule } from '../todolist/todolist.module';
import { CustomdropdownModule } from '../customdropdown/customdropdown.module';
import { ActualamountModule } from '../actualamount/actualamount.module';


@NgModule({
  declarations: [AgendaComponent],
  imports: [
    CommonModule,
    AgendaRoutingModule,
    DataGridModule, FormsModule, ReactiveFormsModule, TodolistModule, CustomdropdownModule,ActualamountModule
  ]
})
export class AgendaModule { }
