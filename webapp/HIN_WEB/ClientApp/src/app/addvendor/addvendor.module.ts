import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddvendorRoutingModule } from './addvendor-routing.module';
import { AddvendorComponent } from './addvendor.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContactinformationModule } from '../contactinformation/contactinformation.module';
import { NotesinfoModule } from '../notesinfo/notesinfo.module';
import { AddnewfieldModule } from '../addnewfield/addnewfield.module';
import { CustomsectionModule } from '../customsection/customsection.module';
import { CategorylistModule } from '../categorylist/categorylist.module';
import { CustomdropdownModule } from '../customdropdown/customdropdown.module';
import { DirectiveHelperModule } from '../helper/directive/DirectiveHelperModule';
import { CustomstringdropdownModule } from '../customstringdropdown/customstringdropdown.module';
import { SfFileExplorerModule } from '../sf-file-explorer/sf-file-explorer.module';
import { NgxMaskModule } from 'ngx-mask';
import { CreatedbyModule } from '../createdby/createdby.module';
import { AssignedtoModule } from '../assignedto/assignedto.module';
import { PrimarycontactModule } from '../primarycontact/primarycontact.module';
import { EmailModule } from '../email/email.module';

@NgModule({
  declarations: [AddvendorComponent],
  imports: [
    CommonModule, CategorylistModule,
    AddvendorRoutingModule, FormsModule, ContactinformationModule, ReactiveFormsModule, NotesinfoModule, AddnewfieldModule,
    CustomsectionModule, CustomdropdownModule, DirectiveHelperModule, CustomstringdropdownModule, SfFileExplorerModule,
    NgxMaskModule,CreatedbyModule,AssignedtoModule,PrimarycontactModule,EmailModule
  ]
})
export class AddvendorModule { }
