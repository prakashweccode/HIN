import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportSettingsRoutingModule } from './report-settings-routing.module';
import { ReportSettingsComponent } from './report-settings.component';
import { ChartCreationModule } from '../chart-creation/chart-creation.module';


@NgModule({
  declarations: [ReportSettingsComponent],
  imports: [
    CommonModule,
    ReportSettingsRoutingModule, ChartCreationModule
  ]
})
export class ReportSettingsModule { }
