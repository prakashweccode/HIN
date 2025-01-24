import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdddealreportService } from '../adddealreport/adddealreport.service';
import { AdddealsService } from '../adddeals/adddeals.service';
import { Assignedtogrid } from '../assignedtogrid/assignedtogrid';
import { NotyHelper } from '../helper/NotyHelper';
import { Deal, OpportunityCostDTO } from '../model/deal';
import { Dealreport } from '../model/dealreport';
import { OpportunitiesovertimeRequest } from '../model/dealrequest';
import { Opportunitiesovertime } from '../model/opportunitiesovertime';
import { Opportunityacquisitioncost } from '../model/opportunityacquisitioncost';
import { Users } from '../users/users';

@Component({
  selector: 'app-opportunitieswonovertime',
  templateUrl: './opportunitieswonovertime.component.html',
  styleUrls: ['./opportunitieswonovertime.component.css']
})
export class OpportunitieswonovertimeComponent implements OnInit {

  request: OpportunitiesovertimeRequest = new OpportunitiesovertimeRequest()
  public lstOpportunitiesovertime: Array<Opportunitiesovertime> = [];
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
  getOpportunitieswonovertime() {
    this.addDealReportService.getOpportunitieswonovertime(this.request.OpportunitiesovertimeRequest).subscribe(data => {
      if (data != null)
        this.lstOpportunitiesovertime = data;
    }, err => {

    }, () => {

    });
  }
  selectAssignedValue(evt) {
    this.request.OpportunitiesovertimeRequest.users = evt;
  }
  selectCreatedDates(evt) {
    this.request.OpportunitiesovertimeRequest.From = evt.From;
    this.request.OpportunitiesovertimeRequest.To = evt.To;
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
      this.request.OpportunitiesovertimeRequest.From = new Date();
      this.request.OpportunitiesovertimeRequest.To = new Date();
      this.lstOpportunitiesovertime = [];
    }
  }
  clearCreatedDate() {
    this.request.OpportunitiesovertimeRequest.To = null;
    this.request.OpportunitiesovertimeRequest.From = null;
  }
}
