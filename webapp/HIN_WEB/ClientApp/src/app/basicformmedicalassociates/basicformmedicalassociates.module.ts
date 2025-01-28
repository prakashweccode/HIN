import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BasicformmedicalassociatesRoutingModule } from './basicformmedicalassociates-routing.module';
import { BasicformmedicalassociatesComponent } from './basicformmedicalassociates.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignpadModule } from '../signpad/signpad.module';
import { RxSpeechRecognitionService, SpeechRecognitionModule, SpeechRecognitionService } from '@kamiazya/ngx-speech-recognition';


@NgModule({
  declarations: [BasicformmedicalassociatesComponent],
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule,
    BasicformmedicalassociatesRoutingModule, SignpadModule,
    SpeechRecognitionModule.withConfig({
      lang: 'en-US',
      interimResults: true,
      maxAlternatives: 10,
    })
  ],
  providers: [SpeechRecognitionService, RxSpeechRecognitionService]
})
export class BasicformmedicalassociatesModule { }
