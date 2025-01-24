import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-angular-google-charts',
  templateUrl: './angular-google-charts.component.html',
  styleUrls: ['./angular-google-charts.component.css']
})
export class AngularGoogleChartsComponent implements OnInit {
  @Input() title: string;
  @Input() type: string;
  @Input() data: any;
  @Input() columns: any;
  @Input() options: any;
  @Input() width: number;
  @Input() height: number;
  constructor() { }

  ngOnInit() {
  }

}
