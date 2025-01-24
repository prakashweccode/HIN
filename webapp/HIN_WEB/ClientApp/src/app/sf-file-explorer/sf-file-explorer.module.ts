import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SfFileExplorerComponent } from './sf-file-explorer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDocViewerModule } from 'ngx-doc-viewer'
import { SharedmoduleModule } from '../helper/sharedmodule/sharedmodule.module';



@NgModule({
  declarations: [SfFileExplorerComponent],
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule, NgxDocViewerModule, SharedmoduleModule
  ],
  exports: [SfFileExplorerComponent]
})
export class SfFileExplorerModule { }
