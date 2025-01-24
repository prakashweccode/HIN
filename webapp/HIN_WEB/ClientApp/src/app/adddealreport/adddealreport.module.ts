import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdddealreportRoutingModule } from './adddealreport-routing.module';
import { AdddealreportComponent } from './adddealreport.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AssignednameModule } from '../assignedname/assignedname.module';
import { SfFileExplorerModule } from '../sf-file-explorer/sf-file-explorer.module';
import { AssignedtogridModule } from '../assignedtogrid/assignedtogrid.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { DealgetreportComponent } from '../dealgetreport/dealgetreport.component';
import { DealgridreportComponent } from '../dealgridreport/dealgridreport.component';
import { DealgridreportModule } from '../dealgridreport/dealgridreport.module';
import { DealgetreportModule } from '../dealgetreport/dealgetreport.module';
import { CustomdropdownModule } from '../customdropdown/customdropdown.module';
import { RangeselectModule } from '../rangeselect/rangeselect.module';
import { SelectstatusModule } from '../selectstatus/selectstatus.module';


@NgModule({
  declarations: [AdddealreportComponent],
  imports: [
    CommonModule,
    AdddealreportRoutingModule, FormsModule, ReactiveFormsModule, AssignednameModule, SfFileExplorerModule, AssignedtogridModule, NgxPaginationModule, DealgridreportModule, DealgetreportModule, CustomdropdownModule,RangeselectModule,SelectstatusModule
  ]
})
export class AdddealreportModule { }
