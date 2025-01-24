import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdddealreportService } from '../adddealreport/adddealreport.service';
import { AdddealsService } from '../adddeals/adddeals.service';
import { Assignedtogrid } from '../assignedtogrid/assignedtogrid';
import { NotyHelper } from '../helper/NotyHelper';
import { Deal, OpportunityCostDTO } from '../model/deal';
import { Dealreport } from '../model/dealreport';
import { WonDealsRequest } from '../model/dealrequest';
import { Opportunityacquisitioncost } from '../model/opportunityacquisitioncost';
import { Wondealsbyrep } from '../model/wondealsbyrep';
import { Users } from '../users/users';

@Component({
  selector: 'app-wondealsbyrep',
  templateUrl: './wondealsbyrep.component.html',
  styleUrls: ['./wondealsbyrep.component.css']
})
export class WondealsbyrepComponent implements OnInit {

  request: WonDealsRequest = new WonDealsRequest()
  public lstWondealsbyrep: Array<Wondealsbyrep> = [];
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
  getWonDealsByRep() {
    this.addDealReportService.getWonDealsByRep(this.request.WonDealsRequest).subscribe(data => {
      if (data)
        this.lstWondealsbyrep = data;
    }, err => {

    }, () => {

    });
  }
  selectAssignedValue(evt) {
    this.request.WonDealsRequest.users = evt;
  }
  selectCreatedDates(evt) {
    this.request.WonDealsRequest.From = evt.From;
    this.request.WonDealsRequest.To = evt.To;
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
      this.request.WonDealsRequest.From = new Date();
      this.request.WonDealsRequest.To = new Date();
      this.lstWondealsbyrep = [];
    }
  }
  clearCreatedDate() {
    this.request.WonDealsRequest.To = null;
    this.request.WonDealsRequest.From = null;
  }
}
