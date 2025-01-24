import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeadimportRoutingModule } from './leadimport-routing.module';
import { LeadimportComponent } from './leadimport.component';
import { ImportModule } from '../import/import.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [LeadimportComponent],
  imports: [
    CommonModule,
    LeadimportRoutingModule, ImportModule, FormsModule, ReactiveFormsModule
  ]
})
export class LeadimportModule { }
