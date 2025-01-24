import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomFieldsRoutingModule } from './custom-fields-routing.module';
import { CustomFieldsComponent } from './custom-fields.component';
import { DataGridModule } from '../data-grid/data-grid.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DirectiveHelperModule } from '../helper/directive/DirectiveHelperModule';


@NgModule({
  declarations: [CustomFieldsComponent],
  imports: [
    CommonModule,
    DataGridModule,
    CustomFieldsRoutingModule,
    FormsModule,
    ReactiveFormsModule, DirectiveHelperModule
  ]
})
export class CustomFieldsModule { }
