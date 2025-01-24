import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComposeemailComponent } from './composeemail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditcolumnModule } from '../editcolumn/editcolumn.module';
import { DirectiveHelperModule } from '../helper/directive/DirectiveHelperModule';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { NgxEditorModule } from 'ngx-editor';



@NgModule({
  declarations: [ComposeemailComponent],
  imports: [
    CommonModule, ReactiveFormsModule, FormsModule, NgxEditorModule, EditcolumnModule, DirectiveHelperModule, AngularEditorModule
  ],
  exports:[ComposeemailComponent]
})
export class ComposeemailModule { }
