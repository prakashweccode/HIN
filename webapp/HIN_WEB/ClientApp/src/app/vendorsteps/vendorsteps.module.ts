import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VendorstepsRoutingModule } from './vendorsteps-routing.module';
import { VendorstepsComponent } from './vendorsteps.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DirectiveHelperModule } from '../helper/directive/DirectiveHelperModule';
import { CustomdropdownModule } from '../customdropdown/customdropdown.module';
import { CustomstringdropdownModule } from '../customstringdropdown/customstringdropdown.module';
import { StepsModule } from '../steps/steps.module';
import { NotesinfoModule } from '../notesinfo/notesinfo.module';
import { EmailModule } from '../email/email.module';
import { SfFileExplorerModule } from '../sf-file-explorer/sf-file-explorer.module';
import { DemoUtilsModule } from '../helper/utils/module';

@NgModule({
  declarations: [VendorstepsComponent],
  imports: [
    CommonModule,
    VendorstepsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DirectiveHelperModule, CustomdropdownModule, CustomstringdropdownModule, StepsModule, SfFileExplorerModule, EmailModule, NotesinfoModule, DemoUtilsModule
  ]
})
export class VendorstepsModule { }
