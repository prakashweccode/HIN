import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdduserreportRoutingModule } from './adduserreport-routing.module';
import { AdduserreportComponent } from './adduserreport.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AssignednameModule } from '../assignedname/assignedname.module';
import { SfFileExplorerModule } from '../sf-file-explorer/sf-file-explorer.module';
import { AssignedtogridModule } from '../assignedtogrid/assignedtogrid.module';


@NgModule({
  declarations: [AdduserreportComponent],
  imports: [
    CommonModule,
    AdduserreportRoutingModule, FormsModule, ReactiveFormsModule, AssignednameModule, SfFileExplorerModule, AssignedtogridModule
  ]
})
export class AdduserreportModule { }
