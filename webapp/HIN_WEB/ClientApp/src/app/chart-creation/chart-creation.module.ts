import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartCreationComponent } from './chart-creation.component';
import { AngularGoogleChartsModule } from '../angular-google-charts/angular-google-charts.module';

@NgModule({
  declarations: [ChartCreationComponent],
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule, AngularGoogleChartsModule
  ],
  exports: [ChartCreationComponent]
})
export class ChartCreationModule { }
