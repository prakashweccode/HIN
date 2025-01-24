import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditcolumnComponent } from './editcolumn.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [EditcolumnComponent],
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule
  ],
  exports:[EditcolumnComponent]
})
export class EditcolumnModule { }
