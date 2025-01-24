import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DealgridreportRoutingModule } from './dealgridreport-routing.module';
import { DealgridreportComponent } from './dealgridreport.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [DealgridreportComponent],
  imports: [
    CommonModule,
    DealgridreportRoutingModule, NgxPaginationModule, FormsModule, ReactiveFormsModule
  ],
  exports: [DealgridreportComponent]
})
export class DealgridreportModule { }
