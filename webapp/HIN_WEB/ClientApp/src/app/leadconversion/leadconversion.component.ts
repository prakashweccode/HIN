import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdddealreportService } from '../adddealreport/adddealreport.service';
import { AdddealsService } from '../adddeals/adddeals.service';
import { Assignedtogrid } from '../assignedtogrid/assignedtogrid';
import { NotyHelper } from '../helper/NotyHelper';
import { Deal, OpportunityCostDTO } from '../model/deal';
import { Dealreport } from '../model/dealreport';
import { LeadConversionRequest } from '../model/dealrequest';
import { Leadconversion } from '../model/leadconversion';
import { Opportunityacquisitioncost } from '../model/opportunityacquisitioncost';
import { Users } from '../users/users';

@Component({
  selector: 'app-leadconversion',
  templateUrl: './leadconversion.component.html',
  styleUrls: ['./leadconversion.component.css']
})
export class LeadconversionComponent implements OnInit {

  request: LeadConversionRequest = new LeadConversionRequest()
  public lstLeadconversion: Array<Leadconversion> = [];
  user: Users = new Users();
  radioReport: number = 1;
  assignedToGrid: Assignedtogrid = new Assignedtogrid();
  p: number = 1;
  constructor(public router: Router, public addDealReportService: AdddealreportService, private notyHelper: NotyHelper, public dealService: AdddealsService) { }

  ngOnInit() {
    this.getAssignedToGridData();
  }
  cancel() {
    this.router.navigate(['/reports']);
  }
  getLeadConversion() {
    this.addDealReportService.getLeadConversion(this.request.LeadConversionRequest).subscribe(data => {
      if (data)
        this.lstLeadconversion = data;
    }, err => {

    }, () => {

    });
  }
  selectAssignedValue(evt) {
    this.request.LeadConversionRequest.users = evt;
  }
  selectCreatedDates(evt) {
    this.request.LeadConversionRequest.From = evt.From;
    this.request.LeadConversionRequest.To = evt.To;
  }

  getAssignedToGridData() {
    this.assignedToGrid.ApiUrl = "/api/Users/GetUsers";
    this.assignedToGrid.AssignedToId = this.user.UserId;
    this.assignedToGrid.AssignedToType = this.user.UserName;
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
      this.request.LeadConversionRequest.From = new Date();
      this.request.LeadConversionRequest.To = new Date();
      this.lstLeadconversion = [];
    }
  }
  clearCreatedDate() {
    this.request.LeadConversionRequest.To = null;
    this.request.LeadConversionRequest.From = null;
  }
  parseInteger(data) {
    if (isNaN(data) || !data) {
      return 0;
    }
    else {
      return parseInt(data);
    }
  }
  calculateCustomer(data) {
    if (data) {
      let totalAmount = 0;
      totalAmount = this.parseInteger((data.LeadToProspect) / (data.BeginningLeads) * 100);
      return totalAmount;
    }
    else {
      return 0;
    }
  }
}
