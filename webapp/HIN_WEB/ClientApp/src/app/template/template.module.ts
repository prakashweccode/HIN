import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TemplateRoutingModule } from './template-routing.module';
import { TemplateComponent } from './template.component';
import { RxSpeechRecognitionService, SpeechRecognitionModule, SpeechRecognitionService } from '@kamiazya/ngx-speech-recognition';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DirectiveHelperModule } from '../helper/directive/DirectiveHelperModule';


@NgModule({
  declarations: [TemplateComponent],
  imports: [
    CommonModule,
    TemplateRoutingModule, FormsModule, ReactiveFormsModule, DirectiveHelperModule,
    SpeechRecognitionModule.withConfig({
      lang: 'en-US',
      interimResults: true,
      maxAlternatives: 10,
    })
  ],
  providers: [SpeechRecognitionService, RxSpeechRecognitionService]
})
export class TemplateModule { }
