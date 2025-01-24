import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserchartsRoutingModule } from './usercharts-routing.module';
import { UserchartsComponent } from './usercharts.component';
import { ChartModule } from '../chart/chart.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [UserchartsComponent],
  imports: [
    CommonModule,
    UserchartsRoutingModule, ChartModule, FormsModule, ReactiveFormsModule

  ]
})
export class UserchartsModule { }
