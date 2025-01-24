import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { SfTimelineModule } from 'sf-timeline'
import { CommonModule } from '@angular/common';
import { DashboardWidgetComponent } from '../helper/dashboard-widget/dashboard-widget.component';
import { ChartWidgetComponent } from '../helper/chart-widget/chart-widget.component';
import { ChartModule } from '../chart/chart.module';
import { AngularGoogleChartsModule } from '../angular-google-charts/angular-google-charts.module';


@NgModule({
  declarations: [
    HomeComponent, DashboardWidgetComponent, ChartWidgetComponent
  ],
  imports: [
    HomeRoutingModule, CommonModule, SfTimelineModule, ChartModule, AngularGoogleChartsModule
  ]
})
export class HomeModule { }
