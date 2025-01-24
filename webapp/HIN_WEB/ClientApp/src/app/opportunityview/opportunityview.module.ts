import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OpportunityviewRoutingModule } from './opportunityview-routing.module';
import { OpportunityviewComponent } from './opportunityview.component';
import { CalendarModule } from 'angular-calendar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DemoUtilsModule } from '../helper/utils/module';
import { NotesinfoModule } from '../notesinfo/notesinfo.module';
import { CustomdropdownModule } from '../customdropdown/customdropdown.module';
import { EmailModule } from '../email/email.module';
import { CustomstringdropdownModule } from '../customstringdropdown/customstringdropdown.module';
import { SfFileExplorerModule } from '../sf-file-explorer/sf-file-explorer.module';
import { StepsModule } from '../steps/steps.module';
import { ActualamountModule } from '../actualamount/actualamount.module';


@NgModule({
  declarations: [OpportunityviewComponent],
  imports: [
    CommonModule,
    OpportunityviewRoutingModule, CalendarModule, FormsModule, ReactiveFormsModule,
    DemoUtilsModule, NotesinfoModule, CustomdropdownModule, EmailModule, CustomstringdropdownModule, SfFileExplorerModule, StepsModule,ActualamountModule
  ],
  exports: []
})
export class OpportunityviewModule { }
