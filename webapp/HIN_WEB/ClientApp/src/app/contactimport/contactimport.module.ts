import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactimportRoutingModule } from './contactimport-routing.module';
import { ContactimportComponent } from './contactimport.component';
import { ImportModule } from '../import/import.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ContactimportComponent],
  imports: [
    CommonModule,
    ContactimportRoutingModule, ImportModule, FormsModule, ReactiveFormsModule
  ]
})
export class ContactimportModule { }
