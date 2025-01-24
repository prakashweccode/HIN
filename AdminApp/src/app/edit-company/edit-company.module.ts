import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditCompanyRoutingModule } from './edit-company-routing.module';
import { EditCompanyComponent } from './edit-company.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    EditCompanyComponent
  ],
  imports: [
    CommonModule,
    EditCompanyRoutingModule,
    FormsModule, ReactiveFormsModule
  ]
})
export class EditCompanyModule { }
