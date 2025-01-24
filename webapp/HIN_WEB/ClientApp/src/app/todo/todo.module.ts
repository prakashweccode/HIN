import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodoRoutingModule } from './todo-routing.module';
import { TodoComponent } from './todo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddnewfieldModule } from '../addnewfield/addnewfield.module';
import { CustomsectionModule } from '../customsection/customsection.module';
import { DirectiveHelperModule } from '../helper/directive/DirectiveHelperModule';
import { CustomdropdownModule } from '../customdropdown/customdropdown.module';
import { CalendarselectModule } from '../calendarselect/calendarselect.module';
import { CustomstringdropdownModule } from '../customstringdropdown/customstringdropdown.module';
import { Assignedname } from '../assignedname/assignedname';
import { AssignednameModule } from '../assignedname/assignedname.module';
import { EntitynameModule } from '../entityname/entityname.module';
import { DropdownOptionsModule } from '../dropdown-options/dropdown-options.module';
import { CreatedbyModule } from '../createdby/createdby.module';
import { ContactinformationModule } from '../contactinformation/contactinformation.module';


@NgModule({
  declarations: [TodoComponent],
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule,
    TodoRoutingModule, AddnewfieldModule, AssignednameModule, CustomsectionModule, DirectiveHelperModule, CustomdropdownModule, CalendarselectModule, CustomdropdownModule, CustomstringdropdownModule, EntitynameModule, DropdownOptionsModule, CreatedbyModule, ContactinformationModule
  ]
})
export class TodoModule { }
