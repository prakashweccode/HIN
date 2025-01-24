import { query } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Datashared } from '../helper/datashared';
import { LeadGenType } from '../helper/LeadGenType';

@Component({
  selector: 'app-report-settings',
  templateUrl: './report-settings.component.html',
  styleUrls: ['./report-settings.component.css']
})
export class ReportSettingsComponent implements OnInit {
  public entity: number = LeadGenType.Deal;
  public dashBoardQueryId: number;
  constructor(public dataShared: Datashared, private router: Router) { }

  ngOnInit() {
    let queryId = this.dataShared.getValue();
    if (queryId) {
      this.dashBoardQueryId = queryId;
    }
  }
  backToDashboardConfig() {
    this.router.navigate(['/listDashboardConfig']);
  }
}
