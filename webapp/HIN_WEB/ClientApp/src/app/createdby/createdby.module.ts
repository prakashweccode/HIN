import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreatedbyComponent } from './createdby.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


@NgModule({
  declarations: [CreatedbyComponent],
  imports: [
    CommonModule, ReactiveFormsModule, FormsModule
  ],
  exports:[CreatedbyComponent]
})
export class CreatedbyModule { }
