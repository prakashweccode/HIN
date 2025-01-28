import { EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { SimpleChanges } from '@angular/core';
import { AfterViewInit } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import SignaturePad from 'signature_pad';

@Component({
  selector: 'app-signpad',
  templateUrl: './signpad.component.html',
  styleUrls: ['./signpad.component.css']
})
export class SignpadComponent implements OnInit, AfterViewInit {
  @ViewChild('sPad', { static: true }) signaturePadElement: ElementRef | undefined;
  signaturePad: any;

  @Input() canvasWidth: number;
  @Output() image = new EventEmitter();
  @Input() color: string = 'rgb(0,0,0)';

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.signaturePad = new SignaturePad(this.signaturePadElement ? this.signaturePadElement.nativeElement : '');
    this.signaturePad.penColor = this.color;
  }

  selectSignature() {
    const dataURL = this.signaturePad.toDataURL();
    const parts = dataURL.split(';base64,');
    this.image.emit(parts[1]);
  }

  clear() {
    this.signaturePad.clear();
  }

  undo() {
    const data = this.signaturePad.toData();
    if (data) {
      data.pop(); // remove the last dot or line
      this.signaturePad.fromData(data);
    }
  }

  changeColor() {
    const r = Math.round(Math.random() * 255);
    const g = Math.round(Math.random() * 255);
    const b = Math.round(Math.random() * 255);
    const color = 'rgb(' + r + ',' + g + ',' + b + ')';
    this.signaturePad.penColor = color;
  }

}
