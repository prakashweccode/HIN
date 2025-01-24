import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Datashared } from '../helper/datashared';

@Component({
  selector: 'app-listleadreport',
  templateUrl: './listleadreport.component.html',
  styleUrls: ['./listleadreport.component.css']
})
export class ListleadreportComponent implements OnInit {

  constructor(public router: Router, public dataShared: Datashared) { }

  ngOnInit() {
  }

  addLeadReport() {
    this.router.navigate(['/addleadreport']);
  }

}
