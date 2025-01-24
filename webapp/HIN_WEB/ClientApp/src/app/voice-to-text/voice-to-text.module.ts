import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VoiceToTextComponent } from './voice-to-text.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [VoiceToTextComponent],
  imports: [
    CommonModule, FormsModule
  ],
  exports: [VoiceToTextComponent]
})
export class VoiceToTextModule { }
