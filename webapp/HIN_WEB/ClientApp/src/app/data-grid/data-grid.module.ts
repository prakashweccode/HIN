import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataGridComponent } from './data-grid.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DirectiveHelperModule } from '../helper/directive/DirectiveHelperModule';
import { SharedmoduleModule } from '../helper/sharedmodule/sharedmodule.module';



@NgModule({
  declarations: [DataGridComponent],
  imports: [
    CommonModule, RouterModule, FormsModule, ReactiveFormsModule, DirectiveHelperModule, SharedmoduleModule
  ],
  exports: [DataGridComponent]
})
export class DataGridModule { }
