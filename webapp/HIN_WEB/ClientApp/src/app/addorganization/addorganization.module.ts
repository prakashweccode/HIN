import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddorganizationRoutingModule } from './addorganization-routing.module';
import { AddorganizationComponent } from './addorganization.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [AddorganizationComponent],
  imports: [
    CommonModule,
    AddorganizationRoutingModule, FormsModule
  ]
})
export class AddorganizationModule { }
