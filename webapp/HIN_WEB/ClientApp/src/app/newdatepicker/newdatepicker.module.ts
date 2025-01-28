import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewdatepickerComponent } from './newdatepicker.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';


@NgModule({
  declarations: [NewdatepickerComponent],
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule, NgxMaskModule

  ],
  exports:[NewdatepickerComponent]
})
export class NewdatepickerModule { }
