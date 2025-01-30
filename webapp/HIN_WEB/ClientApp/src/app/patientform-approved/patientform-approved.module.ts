import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientformApprovedRoutingModule } from './patientform-approved-routing.module';
import { PatientformApprovedComponent } from './patientform-approved.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignpadModule } from '../signpad/signpad.module';
import { SpeechRecognitionModule, SpeechRecognitionService, RxSpeechRecognitionService } from '@kamiazya/ngx-speech-recognition';


@NgModule({
  declarations: [PatientformApprovedComponent],
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule, SignpadModule,
    PatientformApprovedRoutingModule,
    SpeechRecognitionModule.withConfig({
      lang: 'en-US',
      interimResults: true,
      maxAlternatives: 10,
    })
  ],
  exports: [PatientformApprovedComponent],
  providers: [SpeechRecognitionService, RxSpeechRecognitionService]
})
export class PatientformApprovedModule { }
