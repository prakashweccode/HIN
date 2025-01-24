import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactgroupRoutingModule } from './contactgroup-routing.module';
import { ContactgroupComponent } from './contactgroup.component';
import { DataGridModule } from '../data-grid/data-grid.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Connectoffice365Module } from '../connectoffice365/connectoffice365.module';
import { ChooseemailtemplateModule } from '../chooseemailtemplate/chooseemailtemplate.module';

@NgModule({
  declarations: [ContactgroupComponent],
  imports: [
    CommonModule,
    ContactgroupRoutingModule, DataGridModule, FormsModule, ReactiveFormsModule, Connectoffice365Module, ChooseemailtemplateModule
  ]
})
export class ContactgroupModule { }
