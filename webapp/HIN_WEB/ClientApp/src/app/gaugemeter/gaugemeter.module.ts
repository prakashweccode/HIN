import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GaugemeterComponent } from './gaugemeter/gaugemeter.component';
import { GaugeChartModule } from 'angular-gauge-chart'



@NgModule({
  declarations: [GaugemeterComponent],
  imports: [
    CommonModule, GaugeChartModule
  ],
  exports: [GaugeChartModule, GaugemeterComponent]
})
export class GaugemeterModule { }
