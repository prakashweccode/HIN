import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmaildashboardRoutingModule } from './emaildashboard-routing.module';
import { EmaildashboardComponent } from './emaildashboard.component';


@NgModule({
  declarations: [EmaildashboardComponent],
  imports: [
    CommonModule,
    EmaildashboardRoutingModule
  ]
})
export class EmaildashboardModule { }
