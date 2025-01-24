import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListservicesRoutingModule } from './listservices-routing.module';
import { ListservicesComponent } from './listservices.component';
import { DataGridModule } from '../data-grid/data-grid.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DirectiveHelperModule } from '../helper/directive/DirectiveHelperModule';


@NgModule({
  declarations: [ListservicesComponent],
  imports: [
    CommonModule,
    ListservicesRoutingModule,
    DataGridModule, FormsModule, ReactiveFormsModule, DirectiveHelperModule
  ]
})
export class ListservicesModule { }
