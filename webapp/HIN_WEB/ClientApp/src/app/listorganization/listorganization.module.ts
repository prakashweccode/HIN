import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListorganizationRoutingModule } from './listorganization-routing.module';
import { ListorganizationComponent } from './listorganization.component';
import { DataGridModule } from '../data-grid/data-grid.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [ListorganizationComponent],
  imports: [
    CommonModule,
    ListorganizationRoutingModule,DataGridModule, FormsModule
  ]
})
export class ListorganizationModule { }
