import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StepsRoutingModule } from './steps-routing.module';
import { StepsComponent } from './steps.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomdropdownModule } from '../customdropdown/customdropdown.module';
import { CustomstringdropdownModule } from '../customstringdropdown/customstringdropdown.module';
import { SfFileExplorerModule } from '../sf-file-explorer/sf-file-explorer.module';
import { EmailModule } from '../email/email.module';
import { CalendarModule } from 'angular-calendar';
import { DemoUtilsModule } from '../helper/utils/module';
import { NotesinfoModule } from '../notesinfo/notesinfo.module';
import { NgxMaskModule } from 'ngx-mask';
import { DropdownOptionsModule } from '../dropdown-options/dropdown-options.module';
import { CategorylistModule } from '../categorylist/categorylist.module';


@NgModule({
  declarations: [StepsComponent],
  imports: [
    CommonModule,
    StepsRoutingModule, CalendarModule, FormsModule, ReactiveFormsModule,
    DemoUtilsModule, NotesinfoModule, CustomdropdownModule, EmailModule, CustomstringdropdownModule, SfFileExplorerModule, NgxMaskModule, DropdownOptionsModule, CategorylistModule
  ],
  exports:[StepsComponent]
})
export class StepsModule { }
