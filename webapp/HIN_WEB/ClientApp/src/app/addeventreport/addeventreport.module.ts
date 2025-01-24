import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddeventreportRoutingModule } from './addeventreport-routing.module';
import { AddeventreportComponent } from './addeventreport.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AssignednameModule } from '../assignedname/assignedname.module';
import { SfFileExplorerModule } from '../sf-file-explorer/sf-file-explorer.module';
import { AssignedtogridModule } from '../assignedtogrid/assignedtogrid.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { DealgetreportModule } from '../dealgetreport/dealgetreport.module';


@NgModule({
  declarations: [AddeventreportComponent],
  imports: [
    CommonModule,
    AddeventreportRoutingModule, FormsModule, ReactiveFormsModule, AssignednameModule, SfFileExplorerModule, AssignedtogridModule, NgxPaginationModule, DealgetreportModule
  ]
})
export class AddeventreportModule { }
