import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedmoduleModule } from '../helper/sharedmodule/sharedmodule.module';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OnedriveExplorerComponent } from './onedrive-explorer.component';
import { Connectoffice365Module } from '../connectoffice365/connectoffice365.module';
import { OnedriveConnectModule } from '../onedrive-connect/onedrive-connect.module';



@NgModule({
  declarations: [OnedriveExplorerComponent],
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule, NgxDocViewerModule, SharedmoduleModule, Connectoffice365Module, OnedriveConnectModule
  ],
  exports: [OnedriveExplorerComponent]
})
export class OnedriveExplorerModule { }
