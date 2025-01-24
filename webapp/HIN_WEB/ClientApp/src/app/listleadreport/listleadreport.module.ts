import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListleadreportRoutingModule } from './listleadreport-routing.module';
import { ListleadreportComponent } from './listleadreport.component';


@NgModule({
  declarations: [ListleadreportComponent],
  imports: [
    CommonModule,
    ListleadreportRoutingModule
  ]
})
export class ListleadreportModule { }
