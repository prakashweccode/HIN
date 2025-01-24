import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActualamountComponent } from './actualamount.component';
import { NgxMaskModule } from 'ngx-mask';



@NgModule({
  declarations: [ActualamountComponent],
  imports: [
    CommonModule,FormsModule,ReactiveFormsModule, NgxMaskModule
  ],
  exports:[ActualamountComponent]
})
export class ActualamountModule { }
