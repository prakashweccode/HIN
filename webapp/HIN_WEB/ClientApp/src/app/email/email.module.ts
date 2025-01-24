import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxEditorModule } from 'ngx-editor';
import { EmailRoutingModule } from './email-routing.module';
import { EmailComponent } from './email.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataGridModule } from '../data-grid/data-grid.module';
import { EditcolumnModule } from '../editcolumn/editcolumn.module';
import { DirectiveHelperModule } from '../helper/directive/DirectiveHelperModule';
import { AngularEditorModule } from '@kolkov/angular-editor';


@NgModule({
  declarations: [EmailComponent],
  imports: [
    CommonModule,
    EmailRoutingModule, FormsModule, ReactiveFormsModule, NgxEditorModule,
    DataGridModule, EditcolumnModule, DirectiveHelperModule, AngularEditorModule
  ],
  exports: [EmailComponent]
})
export class EmailModule { }
