import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-gaugemeter',
  templateUrl: './gaugemeter.component.html',
  styleUrls: ['./gaugemeter.component.css']
})
export class GaugemeterComponent implements OnInit {
  @Input() canvasWidth: number;
  @Input() needleValue: number;
  @Input() centralLabel: string;
  @Input() name: string = '';
  @Input() bottomLabel: string = '';
  @Input() options: any;
  constructor() { }
  ngOnInit() {
  }
}
