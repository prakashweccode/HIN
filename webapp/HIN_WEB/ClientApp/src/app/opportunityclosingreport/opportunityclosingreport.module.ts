import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OpportunityclosingreportRoutingModule } from './opportunityclosingreport-routing.module';
import { OpportunityclosingreportComponent } from './opportunityclosingreport.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AssignednameModule } from '../assignedname/assignedname.module';
import { SfFileExplorerModule } from '../sf-file-explorer/sf-file-explorer.module';
import { AssignedtogridModule } from '../assignedtogrid/assignedtogrid.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { DealgridreportModule } from '../dealgridreport/dealgridreport.module';
import { DealgetreportModule } from '../dealgetreport/dealgetreport.module';
import { CustomdropdownModule } from '../customdropdown/customdropdown.module';
import { SelectstatusModule } from '../selectstatus/selectstatus.module';
import { RangeselectModule } from '../rangeselect/rangeselect.module';


@NgModule({
  declarations: [OpportunityclosingreportComponent],
  imports: [
    CommonModule,
    OpportunityclosingreportRoutingModule, FormsModule, ReactiveFormsModule, AssignednameModule, SfFileExplorerModule, AssignedtogridModule, NgxPaginationModule, DealgridreportModule, DealgetreportModule, CustomdropdownModule, SelectstatusModule, RangeselectModule
  ]
})
export class OpportunityclosingreportModule { }
