import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddnetworkingRoutingModule } from './addnetworking-routing.module';
import { AddnetworkingComponent } from './addnetworking.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContactinformationModule } from '../contactinformation/contactinformation.module';
import { CustomsectionModule } from '../customsection/customsection.module';
import { NotesinfoModule } from '../notesinfo/notesinfo.module';
import { AddnewfieldModule } from '../addnewfield/addnewfield.module';
import { CategorylistModule } from '../categorylist/categorylist.module';
import { DirectiveHelperModule } from '../helper/directive/DirectiveHelperModule';
import { NgxMaskModule } from 'ngx-mask';


@NgModule({
  declarations: [AddnetworkingComponent],
  imports: [
    CommonModule,
    AddnetworkingRoutingModule, FormsModule, ContactinformationModule, ReactiveFormsModule, NotesinfoModule, AddnewfieldModule, CustomsectionModule, CategorylistModule,
    DirectiveHelperModule, NgxMaskModule
  ]
})
export class AddnetworkingModule { }
