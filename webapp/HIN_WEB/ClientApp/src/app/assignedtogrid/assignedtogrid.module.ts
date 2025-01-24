import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssignedtogridComponent } from './assignedtogrid.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';



@NgModule({
  declarations: [AssignedtogridComponent],
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule, NgxPaginationModule
  ],
  exports:[AssignedtogridComponent]
})
export class AssignedtogridModule { }
