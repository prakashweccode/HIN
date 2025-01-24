import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Datashared } from '../helper/datashared';

@Component({
  selector: 'app-listorganization',
  templateUrl: './listorganization.component.html',
  styleUrls: ['./listorganization.component.css']
})
export class ListorganizationComponent implements OnInit {
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
      { displayName: 'Name', propertyName: 'Name', dataType: 'string', secondPropertyName: '', filter: '', isLink: true, serializeArray: null },
      { displayName: 'Address', propertyName: 'Address', dataType: 'string', secondPropertyName: '', filter: '', isLink: false, serializeArray: null }
    ];
    this.dataSource = new Array<any>();
    this.filterColumns = [
      { column: "Name", value: "", type: "contains" },
      { column: "Address", value: "", type: "contains" }
    ];
    this.actions = [
    ];
    this.pageLengthOptions = [25, 100, 250];
  }

  addOrganization() {
    this.router.navigate(['/addorganization']);
  }
  editOrganization(evt) {
    this.dataShared.setValue(evt.dataRow);
    this.router.navigate(['/addorganization']);
  }
}
