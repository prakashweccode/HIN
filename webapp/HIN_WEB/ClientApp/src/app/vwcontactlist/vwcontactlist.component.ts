import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vwcontactlist',
  templateUrl: './vwcontactlist.component.html',
  styleUrls: ['./vwcontactlist.component.css']
})
export class VwcontactlistComponent implements OnInit {
  public gridHeaders: Array<any>;
  public dataSource: Array<any>;
  public filterColumns: Array<any>;
  public apiUrl: string;
  public pageSize: number;
  public actions: Array<any>;
  public pageLengthOptions: Array<number>;
  constructor() { }

  ngOnInit() {
    this.gridHeaders = [
      { displayName: 'Contact', propertyName: 'ContactName', dataType: 'string', secondPropertyName: '', filter: '', isLink: true, serializeArray: null },
      { displayName: 'Contact Title', propertyName: 'ContactTitle', dataType: 'string', secondPropertyName: '', filter: '', isLink: false, serializeArray: null },
      { displayName: 'Entity Type', propertyName: 'EntityType', dataType: 'string', secondPropertyName: '', filter: '', isLink: false, serializeArray: null },
      { displayName: 'Email', propertyName: 'Email', dataType: 'string', secondPropertyName: '', filter: '', isLink: false, serializeArray: null },
      { displayName: 'Mobile Number', propertyName: 'CellNumber', dataType: 'string', secondPropertyName: '', filter: '', isLink: false, serializeArray: null },
      { displayName: 'Affiliate/Skill', propertyName: 'CategoryName', dataType: 'string', secondPropertyName: '', filter: '', isLink: false, serializeArray: null },
      { displayName: 'Office Number', propertyName: 'OfficeNumber', dataType: 'string', secondPropertyName: '', filter: '', isLink: false, serializeArray: null }
    ];
    this.dataSource = new Array<any>();
    this.filterColumns = [
      { column: "ContactName", value: "", type: "contains" },
      { column: "ContactTitle", value: "", type: "contains" },
      { column: "Email", value: "", type: "contains" },
      { column: "CellNumber", value: "", type: "contains" },
      { column: "OfficeNumber", value: "", type: "contains" }
    ];
    this.actions = [
    ];
    this.pageLengthOptions = [25, 100, 250];
  }
  editContactInfo(data) {

  }
}
