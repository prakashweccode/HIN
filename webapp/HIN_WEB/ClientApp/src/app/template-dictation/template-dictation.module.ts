import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemplateDictationRoutingModule } from './template-dictation-routing.module';
import { TemplateDictationComponent } from './template-dictation.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RxSpeechRecognitionService, SpeechRecognitionModule, SpeechRecognitionService } from '@kamiazya/ngx-speech-recognition';
import { SafePipe } from '../helper/safe.pipe';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [TemplateDictationComponent, SafePipe],
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule,
    TemplateDictationRoutingModule, NgSelectModule,
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
