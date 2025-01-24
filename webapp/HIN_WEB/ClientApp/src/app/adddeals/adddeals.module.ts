import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdddealsRoutingModule } from './adddeals-routing.module';
import { AdddealsComponent } from './adddeals.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CurrencyModule } from '../helper/currency/currency.module';
import { ContactinformationModule } from '../contactinformation/contactinformation.module';
import { NotesinfoModule } from '../notesinfo/notesinfo.module';
import { CustomsectionModule } from '../customsection/customsection.module';
import { AddnewfieldModule } from '../addnewfield/addnewfield.module';
import { DirectiveHelperModule } from '../helper/directive/DirectiveHelperModule';
import { CustomdropdownModule } from '../customdropdown/customdropdown.module';
import { CustomstringdropdownModule } from '../customstringdropdown/customstringdropdown.module';
import { AssignednameModule } from '../assignedname/assignedname.module';
import { SfFileExplorerModule } from '../sf-file-explorer/sf-file-explorer.module';
import { AssignedtogridModule } from '../assignedtogrid/assignedtogrid.module';
import { NgxMaskModule } from 'ngx-mask';
import { ActualamountModule } from '../actualamount/actualamount.module';
import { CreatedbyModule } from '../createdby/createdby.module';


@NgModule({
  declarations: [AdddealsComponent],
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule,
    AdddealsRoutingModule, CurrencyModule, ContactinformationModule, NotesinfoModule, CustomsectionModule, AddnewfieldModule, CustomstringdropdownModule, DirectiveHelperModule, CustomdropdownModule, AssignednameModule, SfFileExplorerModule, AssignedtogridModule, NgxMaskModule, ActualamountModule, CreatedbyModule
  ]
})
export class AdddealsModule { }
