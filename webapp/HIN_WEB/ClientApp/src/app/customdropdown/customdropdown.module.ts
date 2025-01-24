import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomdropdownComponent } from './customdropdown.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';



@NgModule({
  declarations: [CustomdropdownComponent],
  imports: [
    CommonModule, ReactiveFormsModule, FormsModule
  ],
  exports:[CustomdropdownComponent]
})
export class CustomdropdownModule { }
