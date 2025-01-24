import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularGoogleChartsComponent } from './angular-google-charts.component';
import { GoogleChartsModule } from 'angular-google-charts';


@NgModule({
  declarations: [AngularGoogleChartsComponent],
  imports: [
    CommonModule, GoogleChartsModule
  ],
  exports: [GoogleChartsModule, AngularGoogleChartsComponent]
})
export class AngularGoogleChartsModule { }
