import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddleadsRoutingModule } from './addleads-routing.module';
import { AddleadsComponent } from './addleads.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CurrencyModule } from '../helper/currency/currency.module';
import { ContactinformationModule } from '../contactinformation/contactinformation.module';
import { CustomsectionModule } from '../customsection/customsection.module';
import { NotesinfoModule } from '../notesinfo/notesinfo.module';
import { AddnewfieldModule } from '../addnewfield/addnewfield.module';
import { CategorylistModule } from '../categorylist/categorylist.module';
import { CustomdropdownModule } from '../customdropdown/customdropdown.module';
import { DirectiveHelperModule } from '../helper/directive/DirectiveHelperModule';
import { CustomstringdropdownModule } from '../customstringdropdown/customstringdropdown.module';
import { SfFileExplorerModule } from '../sf-file-explorer/sf-file-explorer.module';
import { CreatedbyModule } from '../createdby/createdby.module';
import { AssignedtoModule } from '../assignedto/assignedto.module';
import { AssignedtogridModule } from '../assignedtogrid/assignedtogrid.module';
import { PrimarycontactModule } from '../primarycontact/primarycontact.module';
import { OnedriveExplorerModule } from '../onedrive-explorer/onedrive-explorer.module';


@NgModule({
  declarations: [AddleadsComponent],
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule, CategorylistModule,
    AddleadsRoutingModule, CurrencyModule, ContactinformationModule, CustomsectionModule, NotesinfoModule, AddnewfieldModule, CustomdropdownModule,
    DirectiveHelperModule, CustomstringdropdownModule, SfFileExplorerModule, CreatedbyModule, AssignedtoModule, AssignedtogridModule, PrimarycontactModule, OnedriveExplorerModule
  ]
})
export class AddleadsModule { }
