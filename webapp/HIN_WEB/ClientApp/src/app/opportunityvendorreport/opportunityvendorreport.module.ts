import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OpportunityvendorreportRoutingModule } from './opportunityvendorreport-routing.module';
import { OpportunityvendorreportComponent } from './opportunityvendorreport.component';
import { DealgetreportComponent } from '../dealgetreport/dealgetreport.component';
import { DealgridreportComponent } from '../dealgridreport/dealgridreport.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AssignednameModule } from '../assignedname/assignedname.module';
import { SfFileExplorerModule } from '../sf-file-explorer/sf-file-explorer.module';
import { AssignedtogridModule } from '../assignedtogrid/assignedtogrid.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { DealgridreportModule } from '../dealgridreport/dealgridreport.module';
import { DealgetreportModule } from '../dealgetreport/dealgetreport.module';
import { RangeselectModule } from '../rangeselect/rangeselect.module';
import { SelectstatusModule } from '../selectstatus/selectstatus.module';


@NgModule({
  declarations: [OpportunityvendorreportComponent],
  imports: [
    CommonModule,
    OpportunityvendorreportRoutingModule, FormsModule, ReactiveFormsModule, AssignednameModule, SfFileExplorerModule, AssignedtogridModule, NgxPaginationModule, DealgridreportModule, DealgetreportModule, RangeselectModule, SelectstatusModule
  ]
})
export class OpportunityvendorreportModule { }
