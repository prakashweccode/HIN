import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListDashboardConfigRoutingModule } from './list-dashboard-config-routing.module';
import { ListDashboardConfigComponent } from './list-dashboard-config.component';
import { DataGridModule } from '../data-grid/data-grid.module';


@NgModule({
  declarations: [ListDashboardConfigComponent],
  imports: [
    CommonModule,
    ListDashboardConfigRoutingModule, DataGridModule
  ]
})
export class ListDashboardConfigModule { }
