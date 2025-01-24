import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BasicformRoutingModule } from './basicform-routing.module';
import { BasicformComponent } from './basicform.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignpadModule } from '../signpad/signpad.module';
import { RxSpeechRecognitionService, SpeechRecognitionModule, SpeechRecognitionService } from '@kamiazya/ngx-speech-recognition';


@NgModule({
  declarations: [BasicformComponent],
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    BasicformRoutingModule, SignpadModule,
    SpeechRecognitionModule.withConfig({
      lang: 'en-US',
      interimResults: true,
      maxAlternatives: 10,
    })
  ],
  providers: [SpeechRecognitionService, RxSpeechRecognitionService]
})
export class BasicformModule { }
