import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VwcontactlistRoutingModule } from './vwcontactlist-routing.module';
import { VwcontactlistComponent } from './vwcontactlist.component';
import { DataGridModule } from '../data-grid/data-grid.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [VwcontactlistComponent],
  imports: [
    CommonModule,
    VwcontactlistRoutingModule, DataGridModule, FormsModule, ReactiveFormsModule
  ]
})
export class VwcontactlistModule { }
