import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReferralimportRoutingModule } from './referralimport-routing.module';
import { ReferralimportComponent } from './referralimport.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ImportModule } from '../import/import.module';


@NgModule({
  declarations: [ReferralimportComponent],
  imports: [
    CommonModule,
    ReferralimportRoutingModule,
    ImportModule, FormsModule, ReactiveFormsModule
  ]
})
export class ReferralimportModule { }
