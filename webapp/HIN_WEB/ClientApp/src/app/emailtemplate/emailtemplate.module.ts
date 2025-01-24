import { NgModule, COMPILER_OPTIONS, CompilerFactory, Compiler } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmailtemplateRoutingModule } from './emailtemplate-routing.module';
import { EmailtemplateComponent } from './emailtemplate.component';
import { NgxEditorModule } from 'ngx-editor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [EmailtemplateComponent],
  imports: [
    CommonModule,
    EmailtemplateRoutingModule, NgxEditorModule, FormsModule, ReactiveFormsModule
  ],
  exports: [EmailtemplateComponent]
})
export class EmailtemplateModule { }
