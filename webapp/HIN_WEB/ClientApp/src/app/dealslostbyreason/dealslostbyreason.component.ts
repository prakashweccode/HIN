import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdddealreportService } from '../adddealreport/adddealreport.service';
import { AdddealsService } from '../adddeals/adddeals.service';
import { Assignedtogrid } from '../assignedtogrid/assignedtogrid';
import { NotyHelper } from '../helper/NotyHelper';
import { Deal, OpportunityCostDTO } from '../model/deal';
import { Dealreport } from '../model/dealreport';
import { DealslostyyreasonRequest } from '../model/dealrequest';
import { Dealslostyyreason } from '../model/dealslostyyreason';
import { Opportunityacquisitioncost } from '../model/opportunityacquisitioncost';
import { Reason } from '../model/reason';
import { Users } from '../users/users';

@Component({
  selector: 'app-dealslostbyreason',
  templateUrl: './dealslostbyreason.component.html',
  styleUrls: ['./dealslostbyreason.component.css']
})
export class DealslostbyreasonComponent implements OnInit {

  request: DealslostyyreasonRequest = new DealslostyyreasonRequest()
  public lstDealslostyyreason: Array<Dealslostyyreason> = [];
  user: Users = new Users();
  reason: Reason = new Reason();
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
  getDealsLostByReason() {
    this.addDealReportService.getDealsLostByReason(this.request.DealslostyyreasonRequest).subscribe(data => {
      if (data)
        this.lstDealslostyyreason = data;
    }, err => {

    }, () => {

    });
  }
  selectAssignedValue(evt) {
    this.request.DealslostyyreasonRequest.reasons = evt;
  }
  selectCreatedDates(evt) {
    this.request.DealslostyyreasonRequest.From = evt.From;
    this.request.DealslostyyreasonRequest.To = evt.To;
  }

  getAssignedToGridData() {
    this.assignedToGrid.ApiUrl = "/api/Currency/GetReason";
    this.assignedToGrid.AssignedToId = this.reason.Id;
    this.assignedToGrid.AssignedToType = this.reason.Name;
    this.assignedToGrid.Title = "Assigned To";
    this.assignedToGrid.KeyId = "Id";
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
      this.request.DealslostyyreasonRequest.From = new Date();
      this.request.DealslostyyreasonRequest.To = new Date();
      this.lstDealslostyyreason = [];
    }
  }
  clearCreatedDate() {
    this.request.DealslostyyreasonRequest.To = null;
    this.request.DealslostyyreasonRequest.From = null;
  }

}
