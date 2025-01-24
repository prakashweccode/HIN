import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomsectionComponent } from './customsection.component';
import { DirectiveHelperModule } from '../helper/directive/DirectiveHelperModule';


@NgModule({
  declarations: [CustomsectionComponent],
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule, DirectiveHelperModule
  ],
  exports: [CustomsectionComponent]
})
export class CustomsectionModule { }
