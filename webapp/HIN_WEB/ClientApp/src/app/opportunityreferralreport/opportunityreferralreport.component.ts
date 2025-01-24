import { Component, OnInit } from '@angular/core';
import { OpportunityreferralreportService } from './opportunityreferralreport.service';
import { Router } from '@angular/router';
import { NotyHelper } from '../helper/NotyHelper';
import { Deal } from '../model/deal';
import { Dealreport } from '../model/dealreport';
import { Assignedtogrid } from '../assignedtogrid/assignedtogrid';

@Component({
  selector: 'app-opportunityreferralreport',
  templateUrl: './opportunityreferralreport.component.html',
  styleUrls: ['./opportunityreferralreport.component.css']
})
export class OpportunityreferralreportComponent implements OnInit {
  public listDeal: Array<Deal> = [];
  dealReport: Dealreport = new Dealreport();
  radioReport: number = 1;
  deal: Deal = new Deal();
  assignedToGrid: Assignedtogrid = new Assignedtogrid();

  constructor(public router: Router, public opportunityReferralReportService: OpportunityreferralreportService, private notyHelper: NotyHelper) { }

  ngOnInit() {
    this.getAssignedToGridData();
    this.dealReport.reportinput.To = new Date();
    this.dealReport.reportinput.From = new Date();
  }
  cancel() {
    this.router.navigate(['/reports']);
  }
  getOpportunitiesByReferral() {
    if (!this.deal.AssignedTo) {
      this.notyHelper.ShowNoty("Please fill required field");
    }
    else {
      if (this.radioReport == 1) {
        this.dealReport.reportinput.From = this.dealReport.reportinput.To;
      }
      if (this.radioReport == 2) {
        var dateSet = new Date(this.dealReport.reportinput.To);
        dateSet.setMonth(dateSet.getMonth() - 1);
        this.dealReport.reportinput.From = dateSet;
      }
      if (this.radioReport == 4) {
        var yearSet = new Date(this.dealReport.reportinput.To);
        yearSet.setFullYear(yearSet.getFullYear() - 1);
        this.dealReport.reportinput.From = yearSet;
      }
      this.opportunityReferralReportService.getOpportunitiesByReferral(this.changeFormatDate(this.dealReport.reportinput.From), this.changeFormatDate(this.dealReport.reportinput.To), this.deal.AssignedTo).subscribe(data => {
        if (data != null)
          this.listDeal = data;
      }, err => {

      }, () => {

      });
    }
  }

  selectAssignedValue(evt) {
    this.deal.AssignedTo = evt.ReferralId;
    //this.deal.AssignedName = evt.Name;

  }

  getAssignedToGridData() {
    this.assignedToGrid.ApiUrl = "/api/Referral/GetReferral";
    this.assignedToGrid.AssignedToId = this.deal.AssignedTo;
    this.assignedToGrid.AssignedToType = this.deal.AssignedType;
    this.assignedToGrid.Title = "Assigned To";
    this.assignedToGrid.KeyId = "ReferralId";
    this.assignedToGrid.KeyValue = "";
    this.assignedToGrid.DisplayName = "Name";
    this.assignedToGrid.GridHeaders = [
      { displayName: 'Name', propertyName: 'Name' }

    ];
  }
  changeFormatDate(date) {
    if (date) {
      if (Object.prototype.toString.call(date) === "[object Date]")
        return date.getFullYear() + '-' + (date.getMonth() < 10 ? ('0' + (date.getMonth() + 1)) : date.getMonth() + 1) + '-' + (date.getDate() < 10 ? ('0' + (date.getDate())) : (date.getDate()));
      else {
        let clonedDate = new Date(date);
        return clonedDate.getFullYear() + '-' + (clonedDate.getMonth() < 10 ? ('0' + (clonedDate.getMonth() + 1)) : clonedDate.getMonth() + 1) + '-' + (clonedDate.getDate() < 10 ? ('0' + (clonedDate.getDate())) : (clonedDate.getDate()));
      }
    }
  }
  handleFrequencyChange(evt) {
    if (evt.target.checked) {
      this.radioReport = evt.target.value;
      this.dealReport.reportinput.From = new Date();
      this.dealReport.reportinput.To = new Date();
      this.listDeal = [];
    }
  }

}
