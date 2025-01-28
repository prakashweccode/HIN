import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientFileExplorerRoutingModule } from './patient-file-explorer-routing.module';
import { PatientFileExplorerComponent } from './patient-file-explorer.component';
import { SharedmoduleModule } from '../helper/sharedmodule/sharedmodule.module';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


@NgModule({
  declarations: [PatientFileExplorerComponent],
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule, NgxDocViewerModule, SharedmoduleModule,
    PatientFileExplorerRoutingModule
  ],
  exports: [PatientFileExplorerComponent]
})
export class PatientFileExplorerModule { }
