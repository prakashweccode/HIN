import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddquoteRoutingModule } from './addquote-routing.module';
import { AddquoteComponent } from './addquote.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DirectiveHelperModule } from '../helper/directive/DirectiveHelperModule';
import { CustomdropdownModule } from '../customdropdown/customdropdown.module';
import { EditcolumnModule } from '../editcolumn/editcolumn.module';
import { AssignedtoModule } from '../assignedto/assignedto.module';
import { NgxMaskModule } from 'ngx-mask';


@NgModule({
  declarations: [AddquoteComponent],
  imports: [
    CommonModule,
    AddquoteRoutingModule, FormsModule, DirectiveHelperModule, ReactiveFormsModule, CustomdropdownModule, EditcolumnModule, AssignedtoModule,NgxMaskModule
  ]
})
export class AddquoteModule { }
