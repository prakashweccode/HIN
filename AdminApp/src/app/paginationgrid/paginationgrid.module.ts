import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaginationgridRoutingModule } from './paginationgrid-routing.module';
import { PaginationgridComponent } from './paginationgrid.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PaginationgridComponent
  ],
  imports: [
    CommonModule,
    PaginationgridRoutingModule, FormsModule, ReactiveFormsModule
  ], exports: [PaginationgridComponent]
})
export class PaginationgridModule { }
