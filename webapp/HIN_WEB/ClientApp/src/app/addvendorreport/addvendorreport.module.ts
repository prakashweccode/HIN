import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddvendorreportRoutingModule } from './addvendorreport-routing.module';
import { AddvendorreportComponent } from './addvendorreport.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AssignednameModule } from '../assignedname/assignedname.module';
import { SfFileExplorerModule } from '../sf-file-explorer/sf-file-explorer.module';
import { AssignedtogridModule } from '../assignedtogrid/assignedtogrid.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { DealgetreportModule } from '../dealgetreport/dealgetreport.module';


@NgModule({
  declarations: [AddvendorreportComponent],
  imports: [
    CommonModule,
    AddvendorreportRoutingModule, FormsModule, ReactiveFormsModule, AssignednameModule, SfFileExplorerModule, AssignedtogridModule, NgxPaginationModule, DealgetreportModule
  ]
})
export class AddvendorreportModule { }
