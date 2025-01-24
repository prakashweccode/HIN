import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServicesstepsRoutingModule } from './servicessteps-routing.module';
import { ServicesstepsComponent } from './servicessteps.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DirectiveHelperModule } from '../helper/directive/DirectiveHelperModule';
import { CustomdropdownModule } from '../customdropdown/customdropdown.module';
import { CustomstringdropdownModule } from '../customstringdropdown/customstringdropdown.module';
import { StepsModule } from '../steps/steps.module';
import { SfFileExplorerModule } from '../sf-file-explorer/sf-file-explorer.module';
import { EmailModule } from '../email/email.module';
import { NotesinfoModule } from '../notesinfo/notesinfo.module';
import { DemoUtilsModule } from '../helper/utils/module';


@NgModule({
  declarations: [ServicesstepsComponent],
  imports: [
    CommonModule,
    ServicesstepsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DirectiveHelperModule, CustomdropdownModule, CustomstringdropdownModule, StepsModule, SfFileExplorerModule, EmailModule, NotesinfoModule, DemoUtilsModule
  ]
})
export class ServicesstepsModule { }
