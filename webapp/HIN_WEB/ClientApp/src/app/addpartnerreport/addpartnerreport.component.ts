import { Component, OnInit } from '@angular/core';
import { Assignedtogrid } from '../assignedtogrid/assignedtogrid';
import { Leadreport } from '../model/leadreport';
import { Lead } from '../model/lead';
import { AddpartnerreportService } from './addpartnerreport.service';
import { Router } from '@angular/router';
import { NotyHelper } from '../helper/NotyHelper';
import { Opportunityacquisitioncost } from '../model/opportunityacquisitioncost';

@Component({
  selector: 'app-addpartnerreport',
  templateUrl: './addpartnerreport.component.html',
  styleUrls: ['./addpartnerreport.component.css']
})
export class AddpartnerreportComponent implements OnInit {
  opportunityacquisitioncost: Opportunityacquisitioncost = new Opportunityacquisitioncost()
  p: number = 1;
  public listLead: Array<Lead> = [];
  leadReport: Leadreport = new Leadreport();
  radioReport: number = 1;
  lead: Lead = new Lead();
  assignedToGrid: Assignedtogrid = new Assignedtogrid();

  constructor(public router: Router, public addPartnerReportService: AddpartnerreportService, private notyHelper: NotyHelper) { }

  ngOnInit() {
    this.getAssignedToGridData();
  }

  cancel() {
    this.router.navigate(['/reports']);
  }

  handleFrequencyChange(evt) {
    if (evt.target.checked) {
      this.radioReport = evt.target.value;
      this.opportunityacquisitioncost.From = new Date();
      this.opportunityacquisitioncost.To = new Date();
      this.listLead = [];
    }
  }

  getAssignedToGridData() {
    this.assignedToGrid.ApiUrl = "/api/Partner/GetPartner";
    this.assignedToGrid.AssignedToId = this.lead.Owner;
    //this.assignedToGrid.AssignedToType = this.vendor.AssignedType;
    this.assignedToGrid.Title = "Assigned To";
    this.assignedToGrid.KeyId = "PartnerId";
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

  getLeadReportByPartner() {
    //if (!this.lead.Owner) {
    //  this.notyHelper.ShowNoty("Please fill required field");
    //}
    //else {
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
    this.addPartnerReportService.getLeadReportByPartner(this.opportunityacquisitioncost).subscribe(data => {
      if (data != null)
        this.listLead = data;
    }, err => {

    }, () => {

    });
    //}
  }
  clearCreatedDate() {
    this.opportunityacquisitioncost.To = null;
    this.opportunityacquisitioncost.From = null;
  }
  selectAssignedValue(evt) {
    this.opportunityacquisitioncost.UserList = evt;

  }
  exportCSV() {
    const items = this.listLead;
    const replacer = (key, value) => value === null ? '' : value // specify how you want to handle null values here
    const header = Object.keys(items[0])
    const csv = [
      header.join(','), // header row first
      ...items.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','))
    ].join('\r\n')
    console.log(csv)
    this.saveBlob(csv, "LeadReportByPartner.csv");
  }
  saveBlob(csv, fileName) {
    var blob = new Blob([csv], { type: 'text/csv' });
    var a = document.createElement('a');
    a.href = window.URL.createObjectURL(blob);
    a.download = fileName;
    a.dispatchEvent(new MouseEvent('click'));
  }
}
