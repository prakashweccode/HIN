import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdddealsService } from '../adddeals/adddeals.service';
import { Datashared } from '../helper/datashared';
import { ListdealsService } from '../listdeals/listdeals.service';
import { ListpartnerService } from '../listpartner/listpartner.service';
import { PipelineService } from '../pipeline/pipeline.service';

@Component({
  selector: 'app-listvendor',
  templateUrl: './listvendor.component.html',
  styleUrls: ['./listvendor.component.css']
})
export class ListvendorComponent implements OnInit {
  public allLead: boolean = false;
  public additionalFilter: any;

  public isSecurityEnabled: boolean = false;
  public gridHeaders: Array<any>;
  public dataSource: Array<any>;
  public filterColumns: Array<any>;
  public apiUrl: string;
  public toggle: boolean;
  public pageSize: number;
  public actions: Array<any>;
  public pageLengthOptions: Array<number>;
  public industryList: any;
  public status: any;
  public pipelineOData: any;
  public pipelineGroupOData: any;
  constructor(public router: Router, public dataShared: Datashared, public listDealService: ListdealsService,public pipelineService: PipelineService, public dealService: AdddealsService, public listPartnerService: ListpartnerService) { }

  ngOnInit() {
    this.additionalFilter = 'Inactive eq null or Inactive eq false';

    this.listPartnerService.getIndustryEntityType().subscribe(data => {
      if (data) {
        this.industryList = data.Item1.map(item => ({
          id: item.Id,
          Name: item.Name
        }));
      }
      this.dealService.getDealStatus().subscribe(data => {
        if (data) {
          this.status = data.map(item => ({
            id: item.Id,
            Name: item.Name
          }));
        }
        this.pipelineService.getPipeLine().subscribe(data => {
          if (data) {
            this.pipelineOData = data.map(item => ({
              id: item.PipelineId,
              Name: item.Name
            }));
          }
          this.listDealService.getPipeLineGroup().subscribe(data => {
            if (data) {
              this.pipelineGroupOData = data.map(item => ({
                id: item.PipelineGroupId,
                Name: item.Name
              }));
            }
            this.gridHeaders = [
              { displayName: 'Vendor Number', propertyName: 'VendorNumber', dataType: 'string', secondPropertyName: '', filter: '', isLink: true, serializeArray: null },
              { displayName: 'Vendor Name', propertyName: 'Name', dataType: 'string', secondPropertyName: '', filter: '', isLink: true, serializeArray: null, gridPermissionCheck: '7.1.1' },
             /* { displayName: 'Vendor Status', propertyName: 'VendorStatus', dataType: 'number', secondPropertyName: '', filter: '', isLink: true, serializeArray: this.status },*/
              { displayName: 'Industry', propertyName: 'Industry', dataType: 'number', secondPropertyName: '', filter: '', isLink: false, serializeArray: this.industryList, gridPermissionCheck: '7.1.5' },
              { displayName: 'Phone Number', propertyName: 'Telephone', dataType: 'string', secondPropertyName: '', filter: '', isLink: false, serializeArray: null, gridPermissionCheck: '7.1.2' },
              { displayName: 'Funnel', propertyName: 'PipelineGroupId', dataType: 'number', secondPropertyName: '', filter: '', isLink: false, serializeArray: this.pipelineGroupOData },
              { displayName: 'Funnel Stage', propertyName: 'PipelineId', dataType: 'number', secondPropertyName: '', filter: '', isLink: false, serializeArray: this.pipelineOData }


            ];
          }, err => { }, () => { });
        }, err => { }, () => { });
      }, err => { }, () => { });
    }, err => { }, () => { });
    this.dataSource = new Array<any>();
    this.filterColumns = [
      { column: "Name", value: "", type: "contains" },
      { column: "Telephone", value: "", type: "contains" },
      { column: "City", value: "", type: "contains" },
      { column: "State", value: "", type: "contains" },
      { column: "Industry", value: "", type: "contains" }
    ];
    this.actions = [
    ];
    this.pageLengthOptions = [25, 100, 250];
  }
  //addVendor() {
  //  this.router.navigate(['/addvendor']);
  //}
  editVendor(evt) {
    this.dataShared.setValue(evt.dataRow);
    this.router.navigate(['/editvendor']);
  }
  addVendor() {
    this.dataShared.setPermissionBaseValue("7.2");
    this.router.navigate(['/addvendor']);
  }

  gotoImport() {
    this.router.navigate(['/vendorimport']);
  }
}
