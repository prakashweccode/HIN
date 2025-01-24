import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomstringdropdownComponent } from './customstringdropdown.component';



@NgModule({
  declarations: [CustomstringdropdownComponent],
  imports: [
    CommonModule, ReactiveFormsModule, FormsModule
  ],
  exports:[CustomstringdropdownComponent]
})
export class CustomstringdropdownModule { }
