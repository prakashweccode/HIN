import { Component, OnInit } from '@angular/core';
import { AdduserreportService } from './adduserreport.service';
import { Router } from '@angular/router';
import { User } from 'oidc-client';
import { Userreport } from '../model/userreport';

@Component({
  selector: 'app-adduserreport',
  templateUrl: './adduserreport.component.html',
  styleUrls: ['./adduserreport.component.css']
})
export class AdduserreportComponent implements OnInit {

  public listUser: Array<User> = [];
  userReport: Userreport = new Userreport();
  radioReport: number = 1;

  constructor(public router: Router, public addUserReportService: AdduserreportService) { }

  ngOnInit() {
  }


  getUserByDate() {
    this.addUserReportService.getUserByDate(this.userReport.reportinput.From, this.userReport.reportinput.To).subscribe(data => {
      if (data != null)
        this.listUser = data;
    }, err => {

    }, () => {

    });
  }

  cancel() {
    this.router.navigate(['/reports']);
  }

  handleFrequencyChange(evt) {
    if (evt.target.checked) {
      this.radioReport = evt.target.value;
      this.userReport.reportinput.From = null;
      this.userReport.reportinput.To = null;
      this.listUser = [];
    }
  }


}
