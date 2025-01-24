import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Datashared } from '../helper/datashared';

@Component({
  selector: 'app-list-dashboard-config',
  templateUrl: './list-dashboard-config.component.html',
  styleUrls: ['./list-dashboard-config.component.css']
})
export class ListDashboardConfigComponent implements OnInit {
  public additionalFilter: any;
  public isSecurityEnabled: boolean = false;
  public gridHeaders: Array<any>;
  public dataSource: Array<any>;
  public filterColumns: Array<any>;
  public apiUrl: string;
  public pageSize: number;
  public actions: Array<any>;
  public pageLengthOptions: Array<number>;
  
  constructor(public router: Router, public dataShared: Datashared) { }

  ngOnInit() {
    this.additionalFilter = '';
    this.gridHeaders = [
      { displayName: 'Name', propertyName: 'Name', dataType: 'string', secondPropertyName: '', filter: '', isLink: true, serializeArray: null },
      { displayName: 'Created On', propertyName: 'CreatedOn', dataType: 'date', secondPropertyName: '', filter: '', isLink: false, serializeArray: null},
      { displayName: 'Created By', propertyName: 'CreatedBy', dataType: 'string', secondPropertyName: '', filter: '', isLink: false, serializeArray: null}
    ];
    this.dataSource = new Array<any>();
    this.filterColumns = [
      { column: "Name", value: "", type: "contains" },
      { column: "Status", value: "", type: "contains" },
      { column: "CreatedOn", value: "", type: "contains" },
      { column: "Fax", value: "", type: "contains" }
    ];
    this.actions = [
    ];
    this.pageLengthOptions = [25, 100, 250];
  }
  addNewConfig() {
    this.router.navigate(['/reportsettings']);
  }

  editConfig(evt) {
    this.dataShared.setValue(evt.dataRow.Id);
    this.router.navigate(['/reportsettings']);
  }
}
