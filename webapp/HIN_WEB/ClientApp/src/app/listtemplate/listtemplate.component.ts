import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { parse } from 'date-fns/esm';
import { Datashared } from '../helper/datashared';
import { TemplateStatus } from '../model/template';

@Component({
  selector: 'app-listtemplate',
  templateUrl: './listtemplate.component.html',
  styleUrls: ['./listtemplate.component.css']
})
export class ListtemplateComponent implements OnInit {
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
  public status: any;
  constructor(public router: Router, private route: ActivatedRoute, public dataShared: Datashared) {
    this.status = this.getENUM(TemplateStatus);
  }

  ngOnInit() {
    this.gridHeaders = [
      { displayName: 'Appointment', propertyName: 'AppointmentNumber', dataType: 'string', secondPropertyName: '', filter: '', isLink: true, serializeArray: null },
      { displayName: 'Created On', propertyName: 'CreatedOn', dataType: 'date', secondPropertyName: '', filter: '', isLink: false, className: '' },
      { displayName: 'Created By', propertyName: 'CreatedBy', dataType: 'string', secondPropertyName: '', filter: '', isLink: false, className: '' },
      { displayName: 'Status', propertyName: 'Status', dataType: 'number', secondPropertyName: '', filter: '', isLink: false, className: '', serializeArray: this.status }
    ];
    this.dataSource = new Array<any>();
    this.filterColumns = [
      { column: "AppointmentNumber", value: "", type: "contains" },
      { column: "CreatedOn", value: "", type: "contains" },
      { column: "CreatedBy", value: "", type: "contains" },
      { column: "Status", value: "", type: "contains" }
    ];
    this.actions = [];
    this.pageLengthOptions = [25, 100, 250];
  }

  addTemplate() {
    this.router.navigate(['/template-dictation']);
  }
  editTemplate(evt) {
    //this.dataShared.setValue(evt.dataRow);
    if (evt && evt.dataRow)
      this.router.navigate(['/template-draft', evt.dataRow.Id], { relativeTo: this.route });
  }
  getENUM(ENUM: any): string[] {
    let myEnum = [];
    let objectEnum = Object.keys(ENUM);
    const values = objectEnum.slice(0, objectEnum.length / 2);
    const keys = objectEnum.slice(objectEnum.length / 2);

    for (let i = 0; i < objectEnum.length / 2; i++) {
      myEnum.push({ Name: keys[i], id: parseInt(values[i]) });
    }
    return myEnum;
  }
}
