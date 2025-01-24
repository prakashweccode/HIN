import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChooseemailtemplateComponent } from './chooseemailtemplate.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ChooseemailtemplateComponent],
  imports: [
    CommonModule, AngularEditorModule,FormsModule, ReactiveFormsModule
  ],
  exports:[ChooseemailtemplateComponent]
})
export class ChooseemailtemplateModule { }
