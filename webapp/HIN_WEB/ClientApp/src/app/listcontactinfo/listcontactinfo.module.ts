import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListcontactinfoRoutingModule } from './listcontactinfo-routing.module';
import { ListcontactinfoComponent } from './listcontactinfo.component';
import { DataGridModule } from '../data-grid/data-grid.module';
import { EditcolumnModule } from '../editcolumn/editcolumn.module';
import { DirectiveHelperModule } from '../helper/directive/DirectiveHelperModule';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddnewfieldModule } from '../addnewfield/addnewfield.module';
import { CustomsectionModule } from '../customsection/customsection.module';
import { CustomdropdownModule } from '../customdropdown/customdropdown.module';
import { CustomstringdropdownModule } from '../customstringdropdown/customstringdropdown.module';
import { Connectoffice365Module } from '../connectoffice365/connectoffice365.module';
import { ChooseemailtemplateModule } from '../chooseemailtemplate/chooseemailtemplate.module';
import { CategorylistModule } from '../categorylist/categorylist.module';
import { ContactinformationModule } from '../contactinformation/contactinformation.module';


@NgModule({
  declarations: [ListcontactinfoComponent],
  imports: [
    CommonModule,
    ListcontactinfoRoutingModule, DataGridModule, EditcolumnModule, DirectiveHelperModule, FormsModule, ReactiveFormsModule, AddnewfieldModule, CustomsectionModule,
    CustomdropdownModule, CustomstringdropdownModule, Connectoffice365Module, ChooseemailtemplateModule, CategorylistModule, ContactinformationModule
  ]
})
export class ListcontactinfoModule { }
