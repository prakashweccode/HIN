import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddpartnerRoutingModule } from './addpartner-routing.module';
import { AddpartnerComponent } from './addpartner.component';
import { CategorylistModule } from '../categorylist/categorylist.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContactinformationModule } from '../contactinformation/contactinformation.module';
import { NotesinfoModule } from '../notesinfo/notesinfo.module';
import { AddnewfieldModule } from '../addnewfield/addnewfield.module';
import { CustomsectionModule } from '../customsection/customsection.module';
import { CustomdropdownModule } from '../customdropdown/customdropdown.module';
import { DirectiveHelperModule } from '../helper/directive/DirectiveHelperModule';
import { CustomstringdropdownModule } from '../customstringdropdown/customstringdropdown.module';
import { NgxMaskModule } from 'ngx-mask';
import { CreatedbyModule } from '../createdby/createdby.module';
import { AssignedtoModule } from '../assignedto/assignedto.module';
import { PrimarycontactModule } from '../primarycontact/primarycontact.module';
import { EmailModule } from '../email/email.module';


@NgModule({
  declarations: [AddpartnerComponent],
  imports: [
    CommonModule, CategorylistModule,
    AddpartnerRoutingModule, FormsModule, ContactinformationModule, ReactiveFormsModule, NotesinfoModule, AddnewfieldModule,
    CustomsectionModule, CustomdropdownModule, DirectiveHelperModule, CustomstringdropdownModule,NgxMaskModule,CreatedbyModule, AssignedtoModule,PrimarycontactModule,EmailModule
  ]
})
export class AddpartnerModule { }
