import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdddealreportService } from '../adddealreport/adddealreport.service';
import { AdddealsService } from '../adddeals/adddeals.service';
import { Assignedtogrid } from '../assignedtogrid/assignedtogrid';
import { NotyHelper } from '../helper/NotyHelper';
import { ProposalclosedbyrepRequest } from '../model/dealrequest';
import { Proposalclosedbyrep } from '../model/proposalclosedbyrep';
import { Users } from '../users/users';

@Component({
  selector: 'app-proposalsclosedbyrep',
  templateUrl: './proposalsclosedbyrep.component.html',
  styleUrls: ['./proposalsclosedbyrep.component.css']
})
export class ProposalsclosedbyrepComponent implements OnInit {
  request: ProposalclosedbyrepRequest = new ProposalclosedbyrepRequest()
  public lstProposalclosedbyrep: Array<Proposalclosedbyrep> = [];
  user: Users = new Users();
  radioReport: number = 1;
  assignedToGrid: Assignedtogrid = new Assignedtogrid();
  p: number = 1;
  constructor(public router: Router, public addDealReportService: AdddealreportService, private notyHelper: NotyHelper, public dealService: AdddealsService) { }

  ngOnInit() {
    this.getAssignedToGridData();
    this.request.ProposalclosedbyrepRequest.To = new Date();
    this.request.ProposalclosedbyrepRequest.From = new Date();
  }
  cancel() {
    this.router.navigate(['/reports']);
  }
  getProposalClosedByRep() {

    if (this.radioReport == 1) {
      this.request.ProposalclosedbyrepRequest.From = this.request.ProposalclosedbyrepRequest.To;
    }
    if (this.radioReport == 2) {
      var dateSet = new Date(this.request.ProposalclosedbyrepRequest.To);
      dateSet.setMonth(dateSet.getMonth() - 1);
      this.request.ProposalclosedbyrepRequest.From = dateSet;
    }
    if (this.radioReport == 4) {
      var yearSet = new Date(this.request.ProposalclosedbyrepRequest.To);
      yearSet.setFullYear(yearSet.getFullYear() - 1);
      this.request.ProposalclosedbyrepRequest.From = yearSet;
    }

    this.addDealReportService.getProposalClosedByRep(this.request.ProposalclosedbyrepRequest).subscribe(data => {
      if (data)
        this.lstProposalclosedbyrep = data;
    }, err => {

    }, () => {

    });
  }

  selectAssignedValue(evt) {
    this.request.ProposalclosedbyrepRequest.users = evt;
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
      this.request.ProposalclosedbyrepRequest.From = new Date();
      this.request.ProposalclosedbyrepRequest.To = new Date();
      this.lstProposalclosedbyrep = [];
    }
  }
  clearCreatedDate() {
    this.request.ProposalclosedbyrepRequest.To = null;
    this.request.ProposalclosedbyrepRequest.From = null;
  }

}
