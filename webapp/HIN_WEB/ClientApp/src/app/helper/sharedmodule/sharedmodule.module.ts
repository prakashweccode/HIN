import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TruncatePipe } from '../truncate-pipe';
import { FileSizePipe } from '../file-size-pipe';



@NgModule({
  declarations: [TruncatePipe, FileSizePipe],
  imports: [
    CommonModule
  ],
  exports: [TruncatePipe, FileSizePipe]
})
export class SharedmoduleModule { }
