import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RangeselectComponent } from './rangeselect.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [RangeselectComponent],
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule
  ],
  exports:[RangeselectComponent]
})
export class RangeselectModule { }
