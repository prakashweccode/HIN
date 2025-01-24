import { Component, OnInit } from '@angular/core';
import { Deal } from '../model/deal';
import { Dealreport } from '../model/dealreport';
import { Assignedtogrid } from '../assignedtogrid/assignedtogrid';
import { Router } from '@angular/router';
import { AdddealreportService } from '../adddealreport/adddealreport.service';
import { NotyHelper } from '../helper/NotyHelper';
import { Opportunityacquisitioncost } from '../model/opportunityacquisitioncost';

@Component({
  selector: 'app-opportunitycostreport',
  templateUrl: './opportunitycostreport.component.html',
  styleUrls: ['./opportunitycostreport.component.css']
})
export class OpportunitycostreportComponent implements OnInit {
  opportunityacquisitioncost: Opportunityacquisitioncost = new Opportunityacquisitioncost()
  public listDeal: Array<any> = [];
  dealReport: Dealreport = new Dealreport();
  radioReport: number = 1;
  deal: Deal = new Deal();
  assignedToGrid: Assignedtogrid = new Assignedtogrid();
  opportunityGrid: Assignedtogrid = new Assignedtogrid();
  p: number = 1;
  totalOpportunityCost: number = 0;
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
  getOpportunityCostReport() {
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
      this.addDealReportService.getOpportunityCostReport(this.opportunityacquisitioncost).subscribe(data => {
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
    this.assignedToGrid.AssignedToId = evt.UserId;

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

  addOpportunityCost(opportunityCost, materialCostList, timeCostList)
  {
    var materialCost = this.getMaterialCost(materialCostList);
    var timeCost = this.getTimeCost(timeCostList);
   
    return this.parseNumber(this.parseInteger(opportunityCost) + materialCost + timeCost);
  }

  getMaterialCost(materialCostList) {
    var materialCost = 0;
    for (var i = 0; i < materialCostList.length; i++) {
      var material = materialCostList[i];
      materialCost = this.parseNumber(material.Quantity * material.Price);
    }
    return this.parseInteger(materialCost);
  }

  getTimeCost(timeCostList) {
    var timeCost = 0;
    for (var i = 0; i < timeCostList.length; i++) {
      var time = timeCostList[i];
      timeCost = time.Cost;
    }
    return this.parseInteger(timeCost);
  }

  parseInteger(data) {
    if (isNaN(data)|| !data) {
      return 0;
    }
    else {
      return parseInt(data);
    }
  }
 
  parseNumber(data) {
    if (isNaN(data)) {
      return 0;
    }
    else {
      return Math.round(data);
    }
  }
  calculateTotalCost(listDeal) {
    let totalAmount = 0;
    listDeal.forEach(data => {
      totalAmount += this.addOpportunityCost(data.Item1.LeadCost, data.Item2, data.Item3);
    });
    return totalAmount;
  }
  calculateTotalOriginalCost(listDeal) {
    let totalOriginalAmount = 0;
    listDeal.forEach(data => {
      totalOriginalAmount += this.getMaterialCost(data.Item2);
    });
    return totalOriginalAmount;
  }
  calculateTotalTimeCost(listDeal) {
    let totalTimeAmount = 0;
    listDeal.forEach(data => {
      totalTimeAmount += this.getTimeCost(data.Item3);
    });
    return totalTimeAmount;
  }
  calculateTotalOppCost(listDeal) {
    let totalOpportunityAmount = 0;
    listDeal.forEach(data => {
      totalOpportunityAmount += this.parseInteger(data.Item1.LeadCost);
    });
    return totalOpportunityAmount;
  }

  selectOpportunityValue(evt) {
    this.deal.DealId = evt.DealId;
    this.deal.DealName = evt.DealName;

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

  selectCreatedDates(evt) {
    this.opportunityacquisitioncost.OppCreatedFrom = evt.From;
    this.opportunityacquisitioncost.OppCreatedTo = evt.To;
  }

  selectEstimateDates(evt) {
    this.opportunityacquisitioncost.OppEstimateFrom = evt.From;
    this.opportunityacquisitioncost.OppEstimateTo = evt.To;
  }

}
