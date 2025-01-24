import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Datashared } from '../helper/datashared';

@Component({
  selector: 'app-listevent',
  templateUrl: './listevent.component.html',
  styleUrls: ['./listevent.component.css']
})
export class ListeventComponent implements OnInit {
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
  public isSecurityEnabled: boolean = false;
  public pageLengthOptions: Array<number>;


  constructor(public router: Router, public dataShared: Datashared) { }

  ngOnInit() {
      this.gridHeaders = [
        { displayName: 'Event Number', propertyName: 'EventNumber', dataType: 'string', secondPropertyName: '', filter: '', isLink: true, serializeArray: null },
        { displayName: 'Event Name', propertyName: 'EventName', dataType: 'string', secondPropertyName: '', filter: '', isLink: true, serializeArray: null, gridPermissionCheck: '7.1.1' },
        /*{ displayName: 'AssignedTo', propertyName: 'Owner', dataType: 'number', secondPropertyName: '', filter: '', isLink: false, className: '' },*/
        { displayName: 'Created On', propertyName: 'CreatedOn', dataType: 'date', secondPropertyName: '', filter: '', isLink: false, serializeArray: null, className: '' },
        { displayName: 'Created By', propertyName: 'CreatedBy', dataType: 'number', secondPropertyName: '', filter: '', isLink: false, className: '' }
      ];
    this.dataSource = new Array<any>();
    this.filterColumns = [
      { column: "EventNumber", value: "", type: "contains" },
      { column: "EventName", value: "", type: "contains" },
      { column: "Owner", value: "", type: "contains" },
      { column: "CreatedOn", value: "", type: "contains" },
      { column: "CreatedBy", value: "", type: "contains" }
    ];
    this.actions = [];
    this.pageLengthOptions = [25, 100, 250];
  }

  addEvent() {
    this.router.navigate(['/addevent']);
  }
  editEvent(evt) {
    this.dataShared.setValue(evt.dataRow);
    this.router.navigate(['/addevent']);
  }

}
