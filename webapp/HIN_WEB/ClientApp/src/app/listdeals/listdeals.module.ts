import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListdealsRoutingModule } from './listdeals-routing.module';
import { ListdealsComponent } from './listdeals.component';
import { DataGridModule } from '../data-grid/data-grid.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DirectiveHelperModule } from '../helper/directive/DirectiveHelperModule';


@NgModule({
  declarations: [ListdealsComponent],
  imports: [
    CommonModule,
    ListdealsRoutingModule,
    DataGridModule, FormsModule, ReactiveFormsModule, DirectiveHelperModule
  ]
})
export class ListdealsModule { }
