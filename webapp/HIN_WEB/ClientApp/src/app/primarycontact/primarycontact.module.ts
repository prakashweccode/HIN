import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimarycontactComponent } from './primarycontact.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomstringdropdownModule } from '../customstringdropdown/customstringdropdown.module';
import { NgxMaskModule } from 'ngx-mask';



@NgModule({
  declarations: [PrimarycontactComponent],
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule, CustomstringdropdownModule, NgxMaskModule
  ],
  exports:[PrimarycontactComponent]
})
export class PrimarycontactModule { }
