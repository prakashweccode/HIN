import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OpportunityreferralreportRoutingModule } from './opportunityreferralreport-routing.module';
import { OpportunityreferralreportComponent } from './opportunityreferralreport.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AssignednameModule } from '../assignedname/assignedname.module';
import { SfFileExplorerModule } from '../sf-file-explorer/sf-file-explorer.module';
import { AssignedtogridModule } from '../assignedtogrid/assignedtogrid.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { DealgridreportModule } from '../dealgridreport/dealgridreport.module';
import { DealgetreportModule } from '../dealgetreport/dealgetreport.module';


@NgModule({
  declarations: [OpportunityreferralreportComponent],
  imports: [
    CommonModule,
    OpportunityreferralreportRoutingModule, FormsModule, ReactiveFormsModule, AssignednameModule, SfFileExplorerModule, AssignedtogridModule, NgxPaginationModule, DealgridreportModule, DealgetreportModule
  ]
})
export class OpportunityreferralreportModule { }
