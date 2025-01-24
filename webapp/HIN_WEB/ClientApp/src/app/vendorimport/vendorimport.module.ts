import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VendorimportRoutingModule } from './vendorimport-routing.module';
import { VendorimportComponent } from './vendorimport.component';
import { ImportModule } from '../import/import.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [VendorimportComponent],
  imports: [
    CommonModule,
    VendorimportRoutingModule,
    ImportModule, FormsModule, ReactiveFormsModule
  ]
})
export class VendorimportModule { }
