import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssignedtoComponent } from './assignedto.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [AssignedtoComponent],
  imports: [
    CommonModule,ReactiveFormsModule, FormsModule
  ],
  exports:[AssignedtoComponent]
})
export class AssignedtoModule { }
