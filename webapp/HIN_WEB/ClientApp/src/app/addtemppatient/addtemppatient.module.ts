import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddtemppatientRoutingModule } from './addtemppatient-routing.module';
import { AddtemppatientComponent } from './addtemppatient.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignpadModule } from '../signpad/signpad.module';


@NgModule({
  declarations: [AddtemppatientComponent],
  imports: [
    CommonModule,
    AddtemppatientRoutingModule, FormsModule, ReactiveFormsModule, SignpadModule
  ]
})
export class AddtemppatientModule { }
