import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-dealgridreport',
  templateUrl: './dealgridreport.component.html',
  styleUrls: ['./dealgridreport.component.css']
})
export class DealgridreportComponent implements OnInit {
  p: number = 1;
  @Input() reportData: any;

  constructor() { }

  ngOnInit() {
  }

}
