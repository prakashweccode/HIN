import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddCompanyRoutingModule } from './add-company-routing.module';
import { AddCompanyComponent } from './add-company.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AddCompanyComponent
  ],
  imports: [
    CommonModule,
    AddCompanyRoutingModule,
    FormsModule, ReactiveFormsModule
  ]
})
export class AddCompanyModule { }
