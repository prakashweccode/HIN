import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Datashared } from '../helper/datashared';
import { ListpartcatalogService } from './listpartcatalog.service';

@Component({
  selector: 'app-listpartcatalog',
  templateUrl: './listpartcatalog.component.html',
  styleUrls: ['./listpartcatalog.component.css']
})
export class ListpartcatalogComponent implements OnInit {
  public gridHeaders: Array<any>;
  public dataSource: Array<any>;
  public filterColumns: Array<any>;
  public apiUrl: string;
  public pageSize: number;
  public actions: Array<any>;
  public pageLengthOptions: Array<number>;
  public lstUom: any;
  constructor(public router: Router, public dataShared: Datashared, public listPartcatalogServive: ListpartcatalogService) { }

  ngOnInit() {

    this.listPartcatalogServive.getUOMName().subscribe(data => {
      if (data) {
        this.lstUom = data.Item1.map(item => ({
          id: item.Id,
          Name: item.Name
        }));
      }

      this.gridHeaders = [
        { displayName: 'Part Code', propertyName: 'PartCode', dataType: 'string', secondPropertyName: '', filter: '', isLink: true, serializeArray: null, gridPermissionCheck: '9.1.1' },
        { displayName: 'Description', propertyName: 'PartDescription', dataType: 'string', secondPropertyName: '', filter: '', isLink: false, serializeArray: null, gridPermissionCheck: '9.1.2' },
        { displayName: 'Unit of Measure', propertyName: 'Uomid', dataType: 'number', secondPropertyName: '', filter: '', isLink: false, serializeArray: this.lstUom, gridPermissionCheck: '9.1.3' },
        { displayName: 'Sales Price', propertyName: 'SalesPrice', dataType: 'string', secondPropertyName: '', filter: '', isLink: false, serializeArray: null, gridPermissionCheck: '9.1.4' }
      ];
    }, err => { }, () => { });
    this.dataSource = new Array<any>();
    this.filterColumns = [
      { column: "PartCode", value: "", type: "contains" },
      { column: "PartDescription", value: "", type: "contains" },
      { column: "Uomid", value: "", type: "contains" },
      { column: "SalesPrice", value: "", type: "contains" }
    ];
    this.actions = [
    ];
    this.pageLengthOptions = [25, 100, 250];
  }
  addNewPartCatalog() {
    this.router.navigate(['/addpartcatalog']);
  }
  editPartCatalog(evt) {
    this.dataShared.setValue(evt.dataRow);
    this.router.navigate(['/addpartcatalog']);
  }
}
