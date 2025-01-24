import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PartnerimportRoutingModule } from './partnerimport-routing.module';
import { PartnerimportComponent } from './partnerimport.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ImportModule } from '../import/import.module';


@NgModule({
  declarations: [PartnerimportComponent],
  imports: [
    CommonModule,
    PartnerimportRoutingModule,
    ImportModule, FormsModule, ReactiveFormsModule
  ]
})
export class PartnerimportModule { }
