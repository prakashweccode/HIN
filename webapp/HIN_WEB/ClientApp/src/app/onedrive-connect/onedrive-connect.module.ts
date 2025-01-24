import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnedriveConnectComponent } from './onedrive-connect.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [OnedriveConnectComponent],
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule
  ],
  exports: [OnedriveConnectComponent]
})
export class OnedriveConnectModule { }
