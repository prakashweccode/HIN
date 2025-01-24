import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdddealreportService } from '../adddealreport/adddealreport.service';
import { AdddealsService } from '../adddeals/adddeals.service';
import { Assignedtogrid } from '../assignedtogrid/assignedtogrid';
import { NotyHelper } from '../helper/NotyHelper';
import { Deal, OpportunityCostDTO } from '../model/deal';
import { Dealreport } from '../model/dealreport';
import { Opendeals } from '../model/opendeals';
import { Opportunityacquisitioncost } from '../model/opportunityacquisitioncost';
import { Users } from '../users/users';

@Component({
  selector: 'app-dealsclosedbyquarter',
  templateUrl: './dealsclosedbyquarter.component.html',
  styleUrls: ['./dealsclosedbyquarter.component.css']
})
export class DealsclosedbyquarterComponent implements OnInit {
  openDeals: Opendeals = new Opendeals()
  public lstOpenDeals: Array<Opendeals> = [];
  user: Users = new Users();
  assignedToGrid: Assignedtogrid = new Assignedtogrid();
  p: number = 1;
  dealReport: Dealreport = new Dealreport();
  radioReport: number = 1;
  constructor(public router: Router, public addDealReportService: AdddealreportService, private notyHelper: NotyHelper, public dealService: AdddealsService) { }

  ngOnInit() {
    this.getAssignedToGridData();
    this.dealReport.reportinput.To = new Date();
    this.dealReport.reportinput.From = new Date();
  }
  cancel() {
    this.router.navigate(['/reports']);
  }
  getOpenDeals() {

    this.addDealReportService.getOpenDeals(this.changeFormatDate(this.dealReport.reportinput.From), this.changeFormatDate(this.dealReport.reportinput.To),this.user.UserName).subscribe(data => {
      if (data)
        this.lstOpenDeals = data;
    }, err => {

    }, () => {

    });
  }
  selectAssignedValue(evt) {
    this.openDeals.UserList = evt;
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
      this.dealReport.reportinput.From = new Date();
      this.dealReport.reportinput.To = new Date();
      this.lstOpenDeals = [];
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
  parseInteger(data) {
    if (isNaN(data) || !data) {
      return 0;
    }
    else {
      return parseInt(data);
    }
  }
  calculateTotal(data) {
    if (data) {
      let totalAmount = 0;
      totalAmount = (this.parseInteger(data.Jan) + this.parseInteger(data.Feb) + this.parseInteger(data.Mar) + this.parseInteger(data.Apr) + this.parseInteger(data.May) + this.parseInteger(data.Jun) + this.parseInteger(data.Jul) + this.parseInteger(data.Aug) + this.parseInteger(data.Sep) + this.parseInteger(data.Oct) + this.parseInteger(data.Nov) + this.parseInteger(data.Dec)) / 12;
      return totalAmount.toFixed(2);
    }
    else {
      return 0;
    }

  }
  quarterTotal1(data) {
    if (data) {
      let totalAmount = 0;
      totalAmount = this.parseInteger(data.Jan) + this.parseInteger(data.Feb) + this.parseInteger(data.Mar);
      return totalAmount;
    }
    else {
      return 0;
    }

  }
  quarterTotal2(data) {
    if (data) {
      let totalAmount = 0;
      totalAmount = this.parseInteger(data.Apr) + this.parseInteger(data.May) + this.parseInteger(data.Jun);
      return totalAmount;
    }
    else {
      return 0;
    }

  }
  quarterTotal3(data) {
    if (data) {
      let totalAmount = 0;
      totalAmount =  this.parseInteger(data.Jul) + this.parseInteger(data.Aug) + this.parseInteger(data.Sep);
      return totalAmount;
    }
    else {
      return 0;
    }

  }
  quarterTotal4(data) {
    if (data) {
      let totalAmount = 0;
      totalAmount = this.parseInteger(data.Oct) + this.parseInteger(data.Nov) + this.parseInteger(data.Dec);
      return totalAmount;
    }
    else {
      return 0;
    }

  }
  ChangeDDYear(evt) {
    this.dealReport.reportinput.From = new Date();
    this.dealReport.reportinput.From.setFullYear(evt.target.value);
    this.dealReport.reportinput.To = new Date();
    this.dealReport.reportinput.To.setFullYear(evt.target.value);

  }
}
