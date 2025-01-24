import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImportRoutingModule } from './import-routing.module';
import { ImportComponent } from './import.component';
import { CsvEntityMapperModule } from '../csv-entity-mapper/csv-entity-mapper.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ImportComponent],
  imports: [
    CommonModule,
    ImportRoutingModule,
    CsvEntityMapperModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [ImportComponent]
})
export class ImportModule { }
