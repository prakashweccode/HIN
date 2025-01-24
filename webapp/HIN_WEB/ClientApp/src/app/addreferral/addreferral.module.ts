import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddreferralRoutingModule } from './addreferral-routing.module';
import { AddreferralComponent } from './addreferral.component';
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
import { SfFileExplorerModule } from '../sf-file-explorer/sf-file-explorer.module';
import { AssignedtogridModule } from '../assignedtogrid/assignedtogrid.module';
import { PrimarycontactModule } from '../primarycontact/primarycontact.module';
import { EmailModule } from '../email/email.module';


@NgModule({
  declarations: [AddreferralComponent],
  imports: [
    CommonModule, CategorylistModule,
    AddreferralRoutingModule, FormsModule, ContactinformationModule, ReactiveFormsModule, NotesinfoModule, AddnewfieldModule,
    CustomsectionModule, CustomdropdownModule, DirectiveHelperModule, CustomstringdropdownModule, CreatedbyModule, AssignedtoModule,NgxMaskModule, SfFileExplorerModule, AssignedtogridModule,PrimarycontactModule,EmailModule
  ]
})
export class AddreferralModule { }
