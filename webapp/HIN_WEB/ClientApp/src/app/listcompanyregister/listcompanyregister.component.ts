import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Datashared } from '../helper/datashared';

@Component({
  selector: 'app-listcompanyregister',
  templateUrl: './listcompanyregister.component.html',
  styleUrls: ['./listcompanyregister.component.css']
})
export class ListcompanyregisterComponent implements OnInit {
  public gridHeaders: Array<any>;
  public dataSource: Array<any>;
  public filterColumns: Array<any>;
  public apiUrl: string;
  public pageSize: number;
  public actions: Array<any>;
  public pageLengthOptions: Array<number>;
  constructor(public router: Router, public dataShared: Datashared) { }

  ngOnInit() {
    this.gridHeaders = [
      { displayName: 'Company Name', propertyName: 'CompanyName', dataType: 'string', secondPropertyName: '', filter: '', isLink: true, serializeArray: null, gridPermissionCheck: '10.2.1.1'  },
      { displayName: 'Fax Number', propertyName: 'FaxNumber', dataType: 'string', secondPropertyName: '', filter: '', isLink: false, serializeArray: null, gridPermissionCheck: '10.2.1.2' },
      { displayName: 'Extension', propertyName: 'Extension', dataType: 'string', secondPropertyName: '', filter: '', isLink: false, serializeArray: null, gridPermissionCheck: '10.2.1.3' },
      { displayName: 'Phone Number', propertyName: 'PhoneNumber', dataType: 'string', secondPropertyName: '', filter: '', isLink: false, serializeArray: null, gridPermissionCheck: '10.2.1.4' }
    ];
    this.dataSource = new Array<any>();
    this.filterColumns = [
      { column: "CompanyName", value: "", type: "contains" },
      { column: "FaxNumber", value: "", type: "contains" },
      { column: "Extension", value: "", type: "contains" },
      { column: "PhoneNumber", value: "", type: "contains" }
    ];
    this.actions = [
    ];
    this.pageLengthOptions = [25, 100, 250];
  }

  addNewCompany() {
    this.router.navigate(['/companyregister']);
  }

  editCompany(evt) {
    this.dataShared.setValue(evt.dataRow);
    this.router.navigate(['/companyregister']);
  }

}
