import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdddealreportService } from '../adddealreport/adddealreport.service';
import { AdddealsService } from '../adddeals/adddeals.service';
import { Assignedtogrid } from '../assignedtogrid/assignedtogrid';
import { NotyHelper } from '../helper/NotyHelper';
import { Deal, OpportunityCostDTO } from '../model/deal';
import { Dealreport } from '../model/dealreport';
import { ProposalsclosedbycustomerRequest } from '../model/dealrequest';
import { Opportunityacquisitioncost } from '../model/opportunityacquisitioncost';
import { Proposalsclosedbycustomer } from '../model/proposalsclosedbycustomer';
import { Users } from '../users/users';

@Component({
  selector: 'app-proposalsclosedbycustomer',
  templateUrl: './proposalsclosedbycustomer.component.html',
  styleUrls: ['./proposalsclosedbycustomer.component.css']
})
export class ProposalsclosedbycustomerComponent implements OnInit {
  request: ProposalsclosedbycustomerRequest = new ProposalsclosedbycustomerRequest()
  public lstProposalsclosedbycustomer: Array<Proposalsclosedbycustomer> = [];
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
  getProposalsclosedbycustomer() {

    if (this.radioReport == 1) {
      this.request.ProposalsclosedbycustomerRequest.From = this.request.ProposalsclosedbycustomerRequest.To;
    }
    if (this.radioReport == 2) {
      var dateSet = new Date(this.request.ProposalsclosedbycustomerRequest.To);
      dateSet.setMonth(dateSet.getMonth() - 1);
      this.request.ProposalsclosedbycustomerRequest.From = dateSet;
    }
    if (this.radioReport == 4) {
      var yearSet = new Date(this.request.ProposalsclosedbycustomerRequest.To);
      yearSet.setFullYear(yearSet.getFullYear() - 1);
      this.request.ProposalsclosedbycustomerRequest.From = yearSet;
    }

    this.addDealReportService.getProposalsclosedbycustomer(this.request.ProposalsclosedbycustomerRequest).subscribe(data => {
      if (data != null)
        this.lstProposalsclosedbycustomer = data;
    }, err => {

    }, () => {

    });
  }
  selectAssignedValue(evt) {
    this.request.ProposalsclosedbycustomerRequest.users = evt;
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
      this.request.ProposalsclosedbycustomerRequest.From = new Date();
      this.request.ProposalsclosedbycustomerRequest.To = new Date();
      this.lstProposalsclosedbycustomer = [];
    }
  }
  clearCreatedDate() {
    this.request.ProposalsclosedbycustomerRequest.To = null;
    this.request.ProposalsclosedbycustomerRequest.From = null;
  }

}
