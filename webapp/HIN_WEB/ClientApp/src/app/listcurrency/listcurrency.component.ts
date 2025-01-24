import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Datashared } from '../helper/datashared';

@Component({
  selector: 'app-listcurrency',
  templateUrl: './listcurrency.component.html',
  styleUrls: ['./listcurrency.component.css']
})
export class ListcurrencyComponent implements OnInit {
  public staticFilter: any;
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
  public pageLengthOptions: Array<number>;

  constructor(public router: Router, public dataShared: Datashared) { }

  ngOnInit() {
    this.gridHeaders = [
      { displayName: 'Name', propertyName: 'Name', dataType: 'string', secondPropertyName: '', filter: '', isLink: true, serializeArray: null, gridPermissionCheck: '10.3.1.1' },
      { displayName: 'Symbol', propertyName: 'Symbol', dataType: 'string', secondPropertyName: '', filter: '', isLink: false, serializeArray: null, gridPermissionCheck: '10.3.1.2' },
      { displayName: 'Decimal Points', propertyName: 'DecimalPoints', dataType: 'number', secondPropertyName: '', filter: '', isLink: false, serializeArray: null, gridPermissionCheck: '10.3.1.3' },
      { displayName: 'Code', propertyName: 'Code', dataType: 'string', secondPropertyName: '', filter: '', isLink: false, serializeArray: null, gridPermissionCheck: '10.3.1.4' },

    ];
    this.dataSource = new Array<any>();
    this.filterColumns = [
      { column: "Name", value: "", type: "contains" },
      { column: "Symbol", value: "", type: "contains" },
      { column: "DecimalPoints", value: "", type: "contains" },
      { column: "Code", value: "", type: "contains" }
    ];
    this.actions = [
    ];
    this.pageLengthOptions = [25, 100, 250];
  }
  addCurrency() {
    this.router.navigate(['/addcurrency']);
  }
  editCurrency(currencies) {
    this.dataShared.setValue(currencies.dataRow);
    this.router.navigate(['/addcurrency']);
  }

}
