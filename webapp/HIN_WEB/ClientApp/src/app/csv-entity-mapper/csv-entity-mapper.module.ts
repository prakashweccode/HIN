import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CsvEntityMapperComponent } from './csv-entity-mapper.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [CsvEntityMapperComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [CsvEntityMapperComponent]
})
export class CsvEntityMapperModule { }
