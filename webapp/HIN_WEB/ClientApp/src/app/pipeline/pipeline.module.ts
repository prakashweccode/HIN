import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PipelineRoutingModule } from './pipeline-routing.module';
import { PipelineComponent } from './pipeline.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [PipelineComponent],
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule,
    PipelineRoutingModule
  ]
})
export class PipelineModule { }
