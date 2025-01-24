import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddserviceRoutingModule } from './addservice-routing.module';
import { AddserviceComponent } from './addservice.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomsectionModule } from '../customsection/customsection.module';
import { AddnewfieldModule } from '../addnewfield/addnewfield.module';
import { CustomstringdropdownModule } from '../customstringdropdown/customstringdropdown.module';
import { CustomdropdownModule } from '../customdropdown/customdropdown.module';
import { AssignednameModule } from '../assignedname/assignedname.module';
import { SfFileExplorerModule } from '../sf-file-explorer/sf-file-explorer.module';
import { AssignedtogridModule } from '../assignedtogrid/assignedtogrid.module';
import { NgxMaskModule } from 'ngx-mask';
import { ContactinformationModule } from '../contactinformation/contactinformation.module';
import { NotesinfoModule } from '../notesinfo/notesinfo.module';
import { Connectoffice365Module } from '../connectoffice365/connectoffice365.module';
import { CreatedbyModule } from '../createdby/createdby.module';
import { OnedriveExplorerModule } from '../onedrive-explorer/onedrive-explorer.module';
import { DirectiveHelperModule } from '../helper/directive/DirectiveHelperModule';


@NgModule({
  declarations: [AddserviceComponent],
  imports: [
    CommonModule,
    AddserviceRoutingModule, FormsModule, ReactiveFormsModule, CustomsectionModule, ContactinformationModule, NotesinfoModule,
    AddnewfieldModule, CustomstringdropdownModule, CustomdropdownModule, AssignednameModule, SfFileExplorerModule, AssignedtogridModule, NgxMaskModule, Connectoffice365Module, CreatedbyModule, OnedriveExplorerModule, DirectiveHelperModule
  ]
})
export class AddserviceModule { }
