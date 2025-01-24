import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContactinformationComponent } from './contactinformation.component';
import { AddnewfieldModule } from '../addnewfield/addnewfield.module';
import { CustomsectionModule } from '../customsection/customsection.module';
import { DirectiveHelperModule } from '../helper/directive/DirectiveHelperModule';
import { CustomdropdownModule } from '../customdropdown/customdropdown.module';
import { CustomstringdropdownModule } from '../customstringdropdown/customstringdropdown.module';
import { CategorylistModule } from '../categorylist/categorylist.module';
import { AssignedtogridModule } from '../assignedtogrid/assignedtogrid.module';



@NgModule({
  declarations: [ContactinformationComponent],
  imports: [
    CommonModule, RouterModule, FormsModule, ReactiveFormsModule, AddnewfieldModule, CustomsectionModule, DirectiveHelperModule,CustomdropdownModule, CustomstringdropdownModule,CategorylistModule, AssignedtogridModule
  ],
  exports: [ContactinformationComponent]
})
export class ContactinformationModule { }
