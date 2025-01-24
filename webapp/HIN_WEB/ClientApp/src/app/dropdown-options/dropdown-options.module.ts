import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownOptionsComponent } from './dropdown-options.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [DropdownOptionsComponent],
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule
  ],
  exports: [DropdownOptionsComponent]
})
export class DropdownOptionsModule { }
