import { Component, OnInit } from '@angular/core';
import { AdddealreportService } from '../adddealreport/adddealreport.service';
import { Router } from '@angular/router';
import { NotyHelper } from '../helper/NotyHelper';
import { Deal } from '../model/deal';
import { Dealreport } from '../model/dealreport';
import { Assignedtogrid } from '../assignedtogrid/assignedtogrid';
import { Opportunityacquisitioncost } from '../model/opportunityacquisitioncost';

@Component({
  selector: 'app-opportunityrevenuereport',
  templateUrl: './opportunityrevenuereport.component.html',
  styleUrls: ['./opportunityrevenuereport.component.css']
})
export class OpportunityrevenuereportComponent implements OnInit {
  opportunityacquisitioncost: Opportunityacquisitioncost = new Opportunityacquisitioncost()
  public listDeal: Array<Deal> = [];
  dealReport: Dealreport = new Dealreport();
  radioReport: number = 1;
  deal: Deal = new Deal();
  assignedToGrid: Assignedtogrid = new Assignedtogrid();
  opportunityGrid: Assignedtogrid = new Assignedtogrid();
  date: Date;
  p: number = 1;

  constructor(public router: Router, public addDealReportService: AdddealreportService, private notyHelper: NotyHelper) { }

  ngOnInit() {
    this.getAssignedToGridData();
    this.getOpportunityToGridData();
    this.opportunityacquisitioncost.To = new Date();
    this.opportunityacquisitioncost.From = new Date();
  }
  cancel() {
    this.router.navigate(['/reports']);
  }

  getOpportunitiesByDate() {
    if (typeof this.deal.AssignedTo === 'undefined') {
      this.notyHelper.ShowNoty("Please fill required field");
    }
    else {
      if (this.radioReport == 1) {
        this.opportunityacquisitioncost.From = this.opportunityacquisitioncost.To;
      }
      if (this.radioReport == 2) {
        var dateSet = new Date(this.opportunityacquisitioncost.To);
        dateSet.setMonth(dateSet.getMonth() - 1);
        this.opportunityacquisitioncost.From = dateSet;
      }
      if (this.radioReport == 4) {
        var yearSet = new Date(this.opportunityacquisitioncost.To);
        yearSet.setFullYear(yearSet.getFullYear() - 1);
        this.opportunityacquisitioncost.From = yearSet;
      }
      
      this.addDealReportService.getOpportunitiesByDate(this.opportunityacquisitioncost).subscribe(data => {
        if (data != null)
          this.listDeal = data;
      }, err => {

      }, () => {

      });
    }
  }

  selectAssignedValue(evt) {
    this.deal.AssignedTo = evt.UserId;
    this.deal.AssignedName = evt.Name;

  }
  selectOpportunityValue(evt) {
    this.deal.DealId = evt.DealId;
    this.deal.DealName = evt.DealName;

  }
  selectCreatedDates(evt) {
    this.opportunityacquisitioncost.OppCreatedFrom = evt.From;
    this.opportunityacquisitioncost.OppCreatedTo = evt.To;
  }
  selectEstimateDates(evt) {
    this.opportunityacquisitioncost.OppEstimateFrom = evt.From;
    this.opportunityacquisitioncost.OppEstimateTo = evt.To;
  }

  getAssignedToGridData() {
    this.assignedToGrid.ApiUrl = "/api/Users/GetUsers";
    this.assignedToGrid.AssignedToId = this.deal.AssignedTo;
    this.assignedToGrid.AssignedToType = this.deal.AssignedType;
    this.assignedToGrid.Title = "Assigned To";
    this.assignedToGrid.KeyId = "UserId";
    this.assignedToGrid.KeyValue = "";
    this.assignedToGrid.DisplayName = "Name";
    this.assignedToGrid.GridHeaders = [
      { displayName: 'Name', propertyName: 'Name' }

    ];
  }
  getOpportunityToGridData() {
    this.opportunityGrid.ApiUrl = "/api/Deal/GetDeals";
    this.opportunityGrid.AssignedToId = this.deal.DealId;
    this.opportunityGrid.AssignedToType = this.deal.AssignedType;
    this.opportunityGrid.Title = "Opportunity List";
    this.opportunityGrid.KeyId = "DealId";
    this.opportunityGrid.KeyValue = "";
    this.opportunityGrid.DisplayName = "DealName";
    this.opportunityGrid.GridHeaders = [
      { displayName: 'Name', propertyName: 'DealName' }

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
      this.opportunityacquisitioncost.From = new Date();
      this.opportunityacquisitioncost.To = new Date();
      this.listDeal = [];
    }
  }


  calculateVariangeDollar(actualAmount, expectedRevenue) {

    return this.parseNumber( actualAmount - expectedRevenue);
  }
  calculateVariangePercentage(actualAmount, expectedRevenue) {
    return this.parseNumber( (actualAmount / expectedRevenue - 1) * 100);
  }
  expectedSalesCalculation(expectedRevenue, percentage) {

    return this.parseNumber(expectedRevenue * percentage) ;
  }
  parseNumber(data) {
    if (isNaN(data)) {
      return 0;
    }
    else {
      return Math.round(data);
    }
  }
}
