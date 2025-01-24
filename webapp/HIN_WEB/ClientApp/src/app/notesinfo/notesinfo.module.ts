import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotesinfoComponent } from './notesinfo.component';
import { RouterModule } from '@angular/router';
import { DirectiveHelperModule } from '../helper/directive/DirectiveHelperModule';
import { SharedmoduleModule } from '../helper/sharedmodule/sharedmodule.module';



@NgModule({
  declarations: [NotesinfoComponent],
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule, RouterModule, DirectiveHelperModule, SharedmoduleModule
  ],
  exports: [NotesinfoComponent]
})
export class NotesinfoModule { }
