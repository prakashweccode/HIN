import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectstatusComponent } from './selectstatus.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [SelectstatusComponent],
  imports: [
    CommonModule,FormsModule, ReactiveFormsModule
  ],
  exports:[SelectstatusComponent]
})
export class SelectstatusModule { }
