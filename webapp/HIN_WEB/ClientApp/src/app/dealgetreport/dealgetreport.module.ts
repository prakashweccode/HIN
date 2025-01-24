import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DealgetreportRoutingModule } from './dealgetreport-routing.module';
import { DealgetreportComponent } from './dealgetreport.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [DealgetreportComponent],
  imports: [
    CommonModule,
    DealgetreportRoutingModule, FormsModule, ReactiveFormsModule
  ],
   exports: [DealgetreportComponent]
})
export class DealgetreportModule { }
