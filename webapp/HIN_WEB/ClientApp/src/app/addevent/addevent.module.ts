import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddeventRoutingModule } from './addevent-routing.module';
import { AddeventComponent } from './addevent.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AssignedtogridModule } from '../assignedtogrid/assignedtogrid.module';
import { CreatedbyModule } from '../createdby/createdby.module';
import { CustomdropdownModule } from '../customdropdown/customdropdown.module';
import { AddnewfieldModule } from '../addnewfield/addnewfield.module';
import { CustomsectionModule } from '../customsection/customsection.module';
import { ContactinformationModule } from '../contactinformation/contactinformation.module';
import { NotesinfoModule } from '../notesinfo/notesinfo.module';
import { OnedriveExplorerModule } from '../onedrive-explorer/onedrive-explorer.module';
import { DirectiveHelperModule } from '../helper/directive/DirectiveHelperModule';


@NgModule({
  declarations: [AddeventComponent],
  imports: [
    CommonModule,
    AddeventRoutingModule, FormsModule, ReactiveFormsModule, AssignedtogridModule, CreatedbyModule, CustomdropdownModule, AddnewfieldModule, CustomsectionModule, ContactinformationModule, NotesinfoModule, OnedriveExplorerModule, DirectiveHelperModule
  ]
})
export class AddeventModule { }
