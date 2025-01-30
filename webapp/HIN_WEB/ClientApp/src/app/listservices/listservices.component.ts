import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Datashared } from '../helper/datashared';
import { NotyHelper } from '../helper/NotyHelper';

@Component({
  selector: 'app-listservices',
  templateUrl: './listservices.component.html',
  styleUrls: ['./listservices.component.css']
})
export class ListservicesComponent implements OnInit {
  //declarations
  public additionalFilter: any;
  public dynamicFilter: any;
  public staticFilter: any;
  public filterQuery: any;
  public orderBy: any;
  public gridHeaders: Array<any>;
  public dataSource: Array<any>;
  public filterColumns: Array<any>;
  public apiUrl: string;
  public pageSize: number;
  public isResponsive: boolean;
  public isSearchEnabled: boolean;
  public isPaginationEnabled: boolean;
  public actions: Array<any>;
  public isSecurityEnabled: boolean = true;
  public pageLengthOptions: Array<number>;
  public serviceType = [{ id: 1, Name: "Service" }, { id: 2, Name: "Job" }];
  constructor(public router: Router, public dataShared: Datashared, public noty: NotyHelper) { }
  //Init
  ngOnInit() {
    this.gridHeaders = [
      { displayName: 'Number', propertyName: 'ServiceNumber', dataType: 'string', secondPropertyName: '', filter: '', isLink: true, serializeArray: null },
      { displayName: 'Patient', propertyName: 'LeadName', dataType: 'string', secondPropertyName: '', filter: '', isLink: false, serializeArray: null },
      { displayName: 'Company', propertyName: 'CompanyName', dataType: 'string', secondPropertyName: '', filter: '', isLink: false, serializeArray: null },
      /*{ displayName: 'Appointment Type', propertyName: 'ApplicationRemarks', dataType: 'string', secondPropertyName: '', filter: '', isLink: false, serializeArray: null },*/
      { displayName: 'Assigned To', propertyName: 'AssignedTo', dataType: 'string', secondPropertyName: '', filter: '', isLink: false, serializeArray: null },
      { displayName: 'Created On', propertyName: 'CreatedOn', dataType: 'date', secondPropertyName: '', filter: '', isLink: false, serializeArray: null },
      { displayName: 'Created By', propertyName: 'CreatedBy', dataType: 'string', secondPropertyName: '', filter: '', isLink: false, serializeArray: null }
    ];
    this.dataSource = new Array<any>();
    this.filterColumns = [
      { column: "ServiceNumber", value: "", type: "contains" },
      { column: "ServiceName", value: "", type: "contains" },
      { column: "CompanyName", value: "", type: "contains" },
      { column: "AssignedTo", value: "", type: "contains" },
      { column: "CreatedBy", value: "", type: "contains" }
    ];
    this.actions = [
    ];
    this.pageLengthOptions = [25, 100, 250];
  }
  // Edit service click starts
  editService(evt) {
    this.dataShared.setValue(evt.dataRow);
    this.router.navigate(['/editservice']);
  }
  // Add service click
  addService() {
    this.router.navigate(['/addservice']);
  }
}
