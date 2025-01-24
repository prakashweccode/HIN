import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddnewfieldComponent } from '../addnewfield/addnewfield.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [AddnewfieldComponent],
  imports: [
    CommonModule, FormsModule,ReactiveFormsModule
  ],
  exports: [AddnewfieldComponent]
})
export class AddnewfieldModule { }
