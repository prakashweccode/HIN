import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProposalsclosedbycustomerRoutingModule } from './proposalsclosedbycustomer-routing.module';
import { ProposalsclosedbycustomerComponent } from './proposalsclosedbycustomer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AssignednameModule } from '../assignedname/assignedname.module';
import { SfFileExplorerModule } from '../sf-file-explorer/sf-file-explorer.module';
import { AssignedtogridModule } from '../assignedtogrid/assignedtogrid.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { DealgridreportModule } from '../dealgridreport/dealgridreport.module';
import { DealgetreportModule } from '../dealgetreport/dealgetreport.module';
import { CustomdropdownModule } from '../customdropdown/customdropdown.module';
import { RangeselectModule } from '../rangeselect/rangeselect.module';
import { SelectstatusModule } from '../selectstatus/selectstatus.module';


@NgModule({
  declarations: [ProposalsclosedbycustomerComponent],
  imports: [
    CommonModule,
    ProposalsclosedbycustomerRoutingModule, FormsModule, ReactiveFormsModule, AssignednameModule, SfFileExplorerModule, AssignedtogridModule, NgxPaginationModule, DealgridreportModule, DealgetreportModule, CustomdropdownModule, RangeselectModule, SelectstatusModule
  ]
})
export class ProposalsclosedbycustomerModule { }
