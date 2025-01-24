import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddeventshowRoutingModule } from './addeventshow-routing.module';
import { AddeventshowComponent } from './addeventshow.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContactinformationModule } from '../contactinformation/contactinformation.module';
import { NotesinfoModule } from '../notesinfo/notesinfo.module';
import { AddnewfieldModule } from '../addnewfield/addnewfield.module';
import { CustomFieldsComponent } from '../custom-fields/custom-fields.component';
import { CustomsectionModule } from '../customsection/customsection.module';
import { DirectiveHelperModule } from '../helper/directive/DirectiveHelperModule';
import { CustomdropdownModule } from '../customdropdown/customdropdown.module';
import { CategorylistModule } from '../categorylist/categorylist.module';
import { EntitynameModule } from '../entityname/entityname.module';
import { NgxMaskModule } from 'ngx-mask';
import { SfFileExplorerModule } from '../sf-file-explorer/sf-file-explorer.module';


@NgModule({
  declarations: [AddeventshowComponent],
  imports: [
    CommonModule,
    AddeventshowRoutingModule, FormsModule, ContactinformationModule, ReactiveFormsModule, NotesinfoModule,
    AddnewfieldModule, CustomsectionModule, DirectiveHelperModule, CustomdropdownModule, CategorylistModule,
    EntitynameModule, NgxMaskModule, SfFileExplorerModule
  ]
})
export class AddeventshowModule { }
