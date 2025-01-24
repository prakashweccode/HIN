import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
declare var webkitSpeechRecognition: any;
@Injectable({
  providedIn: 'root'
})
export class VoiceToTextService {
  recognition = new webkitSpeechRecognition();
  isStoppedSpeechRecog = false;
  public text = '';
  public textAllDictation = '';
  public tempWords = '';
  public tempAllDicationWords = '';
  private voiceToTextSubject: Subject<string> = new Subject();
  documentForm: Document;
  counter: number = 1;
  //element: HTMLInputElement;
  constructor() { }
  InitAllDictation(doc: Document) {
    this.documentForm = doc;
    this.recognition.interimResults = true;
    this.recognition.lang = 'en-US';
    this.recognition.addEventListener('result', (e: any) => {
      const transcript = Array.from(e.results)
        .map((result: any) => result[0])
        .map((result) => result.transcript)
        .join('');
      this.tempAllDicationWords = transcript;
      //console.log(this.tempWords);
    });
    return this.initListeners();
  }

  init(doc: Document) {
    this.documentForm = doc;
    this.recognition.interimResults = true;
    this.recognition.lang = 'en-US';
    this.recognition.addEventListener('result', (e: any) => {
      const transcript = Array.from(e.results)
        .map((result: any) => result[0])
        .map((result) => result.transcript)
        .join('');
      this.tempWords = transcript;
    });
    return this.initListeners();
  }

  /**
   * @description Add event listeners to get the updated input and when stoped
   */
  initListeners() {
    this.recognition.addEventListener('end', (condition: any) => {
      this.recognition.stop();
    });
  }

  /**
   * @description Function to return observable so voice sample text can be send to input.
   */
  speechInput() {
    return this.voiceToTextSubject.asObservable();
  }
  
  
  start() {
    this.tempWords = '';
    this.isStoppedSpeechRecog = false;
    this.recognition.start();
    this.recognition.addEventListener('end', (condition) => {
      if (this.isStoppedSpeechRecog) {
        this.recognition.isActive = true;
        this.recognition.stop();
      } else {
        this.isStoppedSpeechRecog = false;
        this.wordConcat();
        if (!this.recognition.lastActiveTime || (Date.now() - this.recognition.lastActive) > 200) {
          this.recognition.start();
          this.recognition.lastActive = Date.now();
        }
      }
      //this.voiceToTextSubject.next(this.text);
    });
  }
  stop() {
    this.isStoppedSpeechRecog = true;
    //this.wordConcat();
    //this.tempWords = '';
    //this.counter = 0;
    this.recognition.stop();
    this.recognition.isActive = false;
  }
  wordConcat() {
    //this.text = this.text + this.tempWords;
    //this.text = this.text.trim();
    this.voiceToTextSubject.next(this.tempWords);
  }
  startAllDictation() {
    this.isStoppedSpeechRecog = false;
    this.recognition.start();
    //this.counter = 1;
    //console.log("Speech recognition started")
    this.recognition.addEventListener('end', (condition) => {
      if (this.isStoppedSpeechRecog) {
        this.recognition.isActive = true;
        this.recognition.stop();
      } else {
        this.isStoppedSpeechRecog = false;
        this.wordAllDictationConcat();
        if (!this.recognition.lastActiveTime || (Date.now() - this.recognition.lastActive) > 200) {
          this.recognition.start();
          this.recognition.lastActive = Date.now();
        }
      }
    });
  }
  stopAllDictation() {
    this.isStoppedSpeechRecog = true;
    this.tempAllDicationWords = '';
    this.textAllDictation = '';
    this.counter = 0;
    //this.wordConcat()
    this.recognition.stop();
    //console.log("End speech recognition")
  }
  wordAllDictationConcat() {
    console.log(this.textAllDictation);
    switch (this.tempAllDicationWords) {
      case "hello clear":
        this.textAllDictation = '';
        this.tempAllDicationWords = '';
        break;
      case "hello next":
        this.counter++;
        this.textAllDictation = '';
        if (this.tempAllDicationWords) {
          this.tempAllDicationWords = '';
          this.textAllDictation = this.textAllDictation + ' ' + this.tempAllDicationWords;
        }
        break;
      case "hello previous":
        this.counter--;
        this.textAllDictation = '';
        if (this.tempAllDicationWords) {
          this.tempAllDicationWords = '';
          this.textAllDictation = this.textAllDictation + ' ' + this.tempAllDicationWords;
        }
        break;
      default:
        if (this.tempAllDicationWords) {
          this.textAllDictation = this.textAllDictation + ' ' + this.tempAllDicationWords;
          this.tempAllDicationWords = '';
        }
        break;
    }
    this.ResetInputBorderColor();
    this.AssignValuesToTextControl(this.textAllDictation, this.counter);
    //this.documentForm.querySelector('input[tabIndex]="' + this.counter + 1 + '"').innerHTML = this.text;
  }
  AssignValuesToTextControl(val, counter) {
    console.log(counter + " $ " + val);
    var currentCtrl = this.documentForm.querySelector('[tabindex="' + counter + '"]') as HTMLInputElement;
    if (currentCtrl) {
      currentCtrl.style.borderColor = "red";
      currentCtrl.focus();
      currentCtrl.value = val;
    }
  }
  ResetInputBorderColor() {
    this.documentForm.querySelectorAll('[tabindex]').forEach((ctrl: HTMLInputElement) => {
      if (ctrl)
        ctrl.style.borderColor = "#999";
    });
  }
}
