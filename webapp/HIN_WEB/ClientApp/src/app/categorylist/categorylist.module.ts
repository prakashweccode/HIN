import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategorylistComponent } from './categorylist.component';
import { DirectiveHelperModule } from '../helper/directive/DirectiveHelperModule';



@NgModule({
  declarations: [CategorylistComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DirectiveHelperModule
  ],
  exports: [CategorylistComponent]
})
export class CategorylistModule { }
