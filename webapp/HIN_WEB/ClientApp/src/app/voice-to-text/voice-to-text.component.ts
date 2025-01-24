import { Component, OnInit } from '@angular/core';
import { VoiceToTextService } from './voice-to-text.service';

@Component({
  selector: 'app-voice-to-text',
  templateUrl: './voice-to-text.component.html',
  styleUrls: ['./voice-to-text.component.css'],
  providers: [VoiceToTextService]
})
export class VoiceToTextComponent implements OnInit {
  recordStart: boolean = false;
  constructor(private speechService: VoiceToTextService) {  }

  ngOnInit() {
  }
  startSpeech() {
    if (!this.recordStart) {
      this.speechService.start();
      this.recordStart = true;
    }
  }
  stopSpeech() {
    this.speechService.stop();
    this.recordStart = false;
  }
}
