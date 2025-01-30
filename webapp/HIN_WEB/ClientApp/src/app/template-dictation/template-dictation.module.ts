import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemplateDictationRoutingModule } from './template-dictation-routing.module';
import { TemplateDictationComponent } from './template-dictation.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RxSpeechRecognitionService, SpeechRecognitionModule, SpeechRecognitionService } from '@kamiazya/ngx-speech-recognition';
import { SafePipe } from '../helper/safe.pipe';
import { NgSelectModule } from '@ng-select/ng-select';
import { DirectiveHelperModule } from '../helper/directive/DirectiveHelperModule';
import { DataGridModule } from '../data-grid/data-grid.module';
import { EditcolumnModule } from '../editcolumn/editcolumn.module';


@NgModule({
  declarations: [TemplateDictationComponent, SafePipe],
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule,
    TemplateDictationRoutingModule, DataGridModule, EditcolumnModule, DirectiveHelperModule, NgSelectModule,
    SpeechRecognitionModule.withConfig({
      lang: 'en-US',
      interimResults: true,
      maxAlternatives: 10,
    })
  ],
  exports: [SafePipe],
  providers: [SpeechRecognitionService, RxSpeechRecognitionService]
})
export class TemplateDictationModule { }
