import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListreferralRoutingModule } from './listreferral-routing.module';
import { ListreferralComponent } from './listreferral.component';
import { DataGridModule } from '../data-grid/data-grid.module';
import { EditcolumnModule } from '../editcolumn/editcolumn.module';
import { DirectiveHelperModule } from '../helper/directive/DirectiveHelperModule';


@NgModule({
  declarations: [ListreferralComponent],
  imports: [
    CommonModule,
    ListreferralRoutingModule, DataGridModule, EditcolumnModule, DirectiveHelperModule
  ]
})
export class ListreferralModule { }
