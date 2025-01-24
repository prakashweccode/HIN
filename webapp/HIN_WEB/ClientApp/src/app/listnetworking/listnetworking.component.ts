import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Datashared } from '../helper/datashared';

@Component({
  selector: 'app-listnetworking',
  templateUrl: './listnetworking.component.html',
  styleUrls: ['./listnetworking.component.css']
})
export class ListnetworkingComponent implements OnInit {
  public allLead: boolean = false;
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
    this.additionalFilter = 'Inactive eq null or Inactive eq false';

    this.gridHeaders = [
      { displayName: 'Network Number', propertyName: 'NetworkingNumber', dataType: 'string', secondPropertyName: '', filter: '', isLink: true, serializeArray: null},
      { displayName: 'Network Name', propertyName: 'NetworkingName', dataType: 'string', secondPropertyName: '', filter: '', isLink: true, serializeArray: null, gridPermissionCheck: '9.1.1' },
      { displayName: 'Industry', propertyName: 'Industry', dataType: 'string', secondPropertyName: '', filter: '', isLink: false, serializeArray: null, gridPermissionCheck: '9.1.4' },
      { displayName: 'City', propertyName: 'City', dataType: 'string', secondPropertyName: '', filter: '', isLink: false, serializeArray: null, gridPermissionCheck: '9.1.2' },
      { displayName: 'State', propertyName: 'State', dataType: 'string', secondPropertyName: '', filter: '', isLink: false, serializeArray: null, gridPermissionCheck: '9.1.3' }
      
    ];
    this.dataSource = new Array<any>();
    this.filterColumns = [
      { column: "NetworkingName", value: "", type: "contains" },
      { column: "Address", value: "", type: "contains" },
      { column: "City", value: "", type: "contains" },
      { column: "Fax", value: "", type: "contains" }
    ];
    this.actions = [
    ];
    this.pageLengthOptions = [25, 100, 250];
  }
  addNetworking() {
    this.router.navigate(['/addnetworking']);
  }
  editNetworking(evt) {
    this.dataShared.setValue(evt.dataRow);
    this.router.navigate(['/editnetworking']);
  }
}
