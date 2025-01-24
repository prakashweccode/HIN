import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DealsbystatusRoutingModule } from './dealsbystatus-routing.module';
import { DealsbystatusComponent } from './dealsbystatus.component';
import { DealgridreportModule } from '../dealgridreport/dealgridreport.module';
import { DealgetreportModule } from '../dealgetreport/dealgetreport.module';


@NgModule({
  declarations: [DealsbystatusComponent],
  imports: [
    CommonModule,
    DealsbystatusRoutingModule,
    DealgridreportModule, DealgetreportModule
  ]
})
export class DealsbystatusModule { }
