import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssignednameComponent } from './assignedname.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [AssignednameComponent],
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule
  ],
  exports:[AssignednameComponent]
})
export class AssignednameModule { }
