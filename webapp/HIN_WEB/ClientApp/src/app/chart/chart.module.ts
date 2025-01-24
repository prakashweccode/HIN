import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartRoutingModule } from './chart-routing.module';
import { ChartComponent } from './chart.component';
import { GaugemeterModule } from '../gaugemeter/gaugemeter.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';


@NgModule({
  declarations: [ChartComponent],
  imports: [
    CommonModule,
    ChartRoutingModule, GaugemeterModule, FormsModule, ReactiveFormsModule, NgMultiSelectDropDownModule.forRoot()
  ],
  exports: [ChartComponent]
})
export class ChartModule { }
``
