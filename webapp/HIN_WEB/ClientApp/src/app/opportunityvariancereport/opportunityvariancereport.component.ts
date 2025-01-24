import { Component, OnInit } from '@angular/core';
import { AdddealreportService } from '../adddealreport/adddealreport.service';
import { Router } from '@angular/router';
import { NotyHelper } from '../helper/NotyHelper';
import { AdddealsService } from '../adddeals/adddeals.service';
import { Opportunityacquisitioncost } from '../model/opportunityacquisitioncost';
import { Dealreport } from '../model/dealreport';
import { Deal, OpportunityCostDTO } from '../model/deal';
import { Assignedtogrid } from '../assignedtogrid/assignedtogrid';

@Component({
  selector: 'app-opportunityvariancereport',
  templateUrl: './opportunityvariancereport.component.html',
  styleUrls: ['./opportunityvariancereport.component.css']
})
export class OpportunityvariancereportComponent implements OnInit {
  opportunityacquisitioncost: Opportunityacquisitioncost = new Opportunityacquisitioncost()
  public listDeal: Array<any> = [];
  public listOppCostDTO: Array<OpportunityCostDTO> = [];
  dealReport: Dealreport = new Dealreport();
  radioReport: number = 1;
  deal: Deal = new Deal();
  assignedToGrid: Assignedtogrid = new Assignedtogrid();
  p: number = 1;
  status: any;
  opportunityGrid: Assignedtogrid = new Assignedtogrid();

  constructor(public router: Router, public addDealReportService: AdddealreportService, private notyHelper: NotyHelper, public dealService: AdddealsService) { }

  ngOnInit() {
    this.getAssignedToGridData();
    this.getOpportunityToGridData();

    this.getStatus();
    this.getTotalWon();
  }

  cancel() {
    this.router.navigate(['/reports']);
  }
  getOpportunitiesByDate() {
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

  selectAssignedValue(evt) {
    this.opportunityacquisitioncost.UserList = evt;
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

  getStatus() {
    this.dealService.getDealStatus().subscribe(data => {
      if (data) {
        this.status = data.map(item => ({
          id: item.Id,
          Name: item.Name
        }));
      }
    });
  }
  GetSerializedValue(_arr, _key) {
    return _arr.find(x => x.id == _key) ? _arr.find(x => x.id == _key).Name : '';
  }

  getTotalWon() {
    if (this.listDeal.length > 0) {
      var deals = this.listDeal.filter(x => x.Item1.StatusId == 1);
      if (deals) {
        return deals.length;
      }
      else {
        return 0;
      }
    }
    return 0;
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
  selectFunnelPercent(evt) {
    this.opportunityacquisitioncost.OppFunnelPercentFrom = evt.From;
    this.opportunityacquisitioncost.OppFunnelPercentTo = evt.To;
  }
  selectPercent(evt) {
    this.opportunityacquisitioncost.OppClosingPercentFrom = evt.From;
    this.opportunityacquisitioncost.OppClosingPercentTo = evt.To;
  }
  clearCreatedDate() {
    this.opportunityacquisitioncost.To = null;
    this.opportunityacquisitioncost.From = null;
  }
  parseNumber(data) {
    if (isNaN(data)) {
      return 0;
    }
    else {
      return Math.round(data);
    }
  }
  selectOpportunityValue(evt) {
    this.opportunityacquisitioncost.OpportunityList = evt;

  }
  parseInteger(data) {
    if (isNaN(data) || !data) {
      return 0;
    }
    else {
      return parseInt(data);
    }
  }
  calculateTotalExReCost(listDeal) {
    let totalOpportunityAmount = 0;
    listDeal.forEach(data => {
      totalOpportunityAmount += this.parseInteger(data.ExpectedRevenue);
    });
    return totalOpportunityAmount;
  }
  calculateTotalActualAmount(listDeal) {
    let totalOpportunityAmount = 0;
    listDeal.forEach(data => {
      totalOpportunityAmount += this.parseInteger(data.ActualAmount);
    });
    return totalOpportunityAmount;
  }
  calculateTotalVarianceAmountdollar(listDeal) {
    let totalOpportunityAmount = 0;
    listDeal.forEach(data => {
      totalOpportunityAmount += this.parseInteger(data.ActualAmount) - (data.ExpectedRevenue);
    });
    return totalOpportunityAmount;
  }
  calculateProbalityVariance(listDeal) {
    let totalOpportunityAmount = 0;
    listDeal.forEach(data => {
      totalOpportunityAmount += this.parseInteger(data.Percentage) - (data.OriginalPercentage);
    });
    return totalOpportunityAmount;
  }
  calculateTotalVarianceAmountPer(listDeal) {
    let totalOpportunityAmount = 0;
    listDeal.forEach(data => {
      totalOpportunityAmount += ((data.ActualAmount) / (data.ExpectedRevenue) - 1);
    });
    return totalOpportunityAmount;
  }
  calculateExpectedSales(listDeal) {
    let totalOpportunityAmount = 0;
    listDeal.forEach(data => {
      totalOpportunityAmount += this.parseInteger(data.ExpectedRevenue) * (data.Percentage);
    });
    return totalOpportunityAmount;
  }
  exportCSV() {
    const items = this.parseOppCostList(this.listDeal);
    const replacer = (key, value) => value === null ? '' : value // specify how you want to handle null values here
    const header = Object.keys(items[0])
    const csv = [
      header.join(','), // header row first
      ...items.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','))
    ].join('\r\n')
    console.log(csv)
    this.saveBlob(csv, "Opp_VarianceReport.csv");
  }
  saveBlob(csv, fileName) {
    var blob = new Blob([csv], { type: 'text/csv' });
    var a = document.createElement('a');
    a.href = window.URL.createObjectURL(blob);
    a.download = fileName;
    a.dispatchEvent(new MouseEvent('click'));
  }
  parseOppCostList(lstDeal) {
    this.listOppCostDTO = [];
    for (let i = 0; i < lstDeal.length; i++) {
      let _oppCost = new OpportunityCostDTO();
      _oppCost.OpportunityName = lstDeal[i].DealName;
      _oppCost.OpportunityStatus = this.GetSerializedValue(this.status, lstDeal[i].StatusId);
      _oppCost.CreatedOn = this.changeFormatDate(lstDeal[i].CreatedOn);
      _oppCost.EstimationDate = this.changeFormatDate(lstDeal[i].EstimationDate);
      _oppCost.Percentage = lstDeal[i].OriginalPercentage;
      _oppCost.SalesFunnel = lstDeal[i].Percentage;
      _oppCost.ProbabilityVariance = (this.parseNumber(lstDeal[i].Percentage) - (lstDeal[i].OriginalPercentage));
      _oppCost.ExpectedSales = lstDeal[i].ExpectedRevenue;
      _oppCost.ActualAmount = lstDeal[i].ActualAmount;
      _oppCost.VarianceAmountDollar = this.parseNumber(lstDeal[i].ActualAmount) - (lstDeal[i].ExpectedRevenue);
      _oppCost.VarianceAmountPercentage = ((this.parseNumber(lstDeal[i].ActualAmount) / (lstDeal[i].ExpectedRevenue)) - 1);
      
      this.listOppCostDTO.push(_oppCost);
    }
    return this.listOppCostDTO;
  }

}
