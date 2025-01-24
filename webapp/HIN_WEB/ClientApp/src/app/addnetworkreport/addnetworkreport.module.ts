import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddnetworkreportRoutingModule } from './addnetworkreport-routing.module';
import { AddnetworkreportComponent } from './addnetworkreport.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AssignednameModule } from '../assignedname/assignedname.module';
import { SfFileExplorerModule } from '../sf-file-explorer/sf-file-explorer.module';
import { AssignedtogridModule } from '../assignedtogrid/assignedtogrid.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { DealgetreportModule } from '../dealgetreport/dealgetreport.module';


@NgModule({
  declarations: [AddnetworkreportComponent],
  imports: [
    CommonModule,
    AddnetworkreportRoutingModule, FormsModule, ReactiveFormsModule, AssignednameModule, SfFileExplorerModule, AssignedtogridModule, NgxPaginationModule, DealgetreportModule
  ]
})
export class AddnetworkreportModule { }
