import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdddealsService } from '../adddeals/adddeals.service';
import { AddreferralService } from '../addreferral/addreferral.service';
import { Datashared } from '../helper/datashared';
import { ListdealsService } from '../listdeals/listdeals.service';
import { PipelineService } from '../pipeline/pipeline.service';
import { ListpartnerService } from './listpartner.service';

@Component({
  selector: 'app-listpartner',
  templateUrl: './listpartner.component.html',
  styleUrls: ['./listpartner.component.css']
})
export class ListpartnerComponent implements OnInit {
  public allLead: boolean = false;
  public additionalFilter: any;
  public isSecurityEnabled: boolean = true;

  public gridHeaders: Array<any>;
  public dataSource: Array<any>;
  public filterColumns: Array<any>;
  public apiUrl: string;
  public toggle: boolean;
  public pageSize: number;
  public actions: Array<any>;
  public pageLengthOptions: Array<number>;
  public industryList: any;
  public lstOriginType: any;
  public status: any;
  public pipelineOData: any;
  public pipelineGroupOData: any;
  public providerType: any;
  constructor(public router: Router, public listDealService: ListdealsService, public pipelineService: PipelineService, public dealService: AdddealsService, public dataShared: Datashared, public listPartnerService: ListpartnerService, public referralService:AddreferralService) { }

  ngOnInit() {
    this.additionalFilter = 'Inactive eq null or Inactive eq false';

    this.listPartnerService.getIndustryEntityType().subscribe(data => {
      if (data) {
        this.industryList = data.Item1.map(item => ({
          id: item.Id,
          Name: item.Name
        }));
        this.lstOriginType = data.Item2.map(item => ({
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
            this.referralService.getProviderType().subscribe(data => {
              if (data) {
                this.providerType = data.map(item => ({
                  id: item.Id,
                  Name: item.Name
                }));
              }
              this.gridHeaders = [
                { displayName: 'Partner Name', propertyName: 'Name', dataType: 'string', secondPropertyName: '', filter: '', isLink: true, serializeArray: null, gridPermissionCheck: '7.1.1' },
                //{ displayName: 'Partner Status', propertyName: 'PartnerStatus', dataType: 'number', secondPropertyName: '', filter: '', isLink: true, serializeArray: this.status },
                { displayName: 'Provider Type', propertyName: 'ProviderTypeId', dataType: 'number', secondPropertyName: '', filter: '', isLink: false, serializeArray: this.providerType },
                { displayName: 'Phone Number', propertyName: 'Telephone', dataType: 'string', secondPropertyName: '', filter: '', isLink: false, serializeArray: null, gridPermissionCheck: '7.1.2' },
                { displayName: 'Funnel', propertyName: 'PipelineGroupId', dataType: 'number', secondPropertyName: '', filter: '', isLink: false, serializeArray: this.pipelineGroupOData },
                { displayName: 'Funnel Stage', propertyName: 'PipelineId', dataType: 'number', secondPropertyName: '', filter: '', isLink: false, serializeArray: this.pipelineOData }

              ];
            }, err => { }, () => { });
          }, err => { }, () => { });
        }, err => { }, () => { });
      }, err => { }, () => { });
    }, err => { }, () => { });

    this.dataSource = new Array<any>();
    this.filterColumns = [
      { column: "Name", value: "", type: "contains" },
      { column: "OriginId", value: "", type: "contains" },
      { column: "Telephone", value: "", type: "contains" },
      { column: "City", value: "", type: "contains" },
      { column: "State", value: "", type: "contains" },
      { column: "Industry", value: "", type: "contains" }
    ];

    this.actions = [
    ];
    this.pageLengthOptions = [25, 100, 250];

  }
  gotoImport() {
    this.router.navigate(['/partnerimport']);
  }
  addPartner() {
    this.router.navigate(['/addpartner']);
  }
  editPartner(evt) {
    this.dataShared.setValue(evt.dataRow);
    this.router.navigate(['/addpartner']);
  }

}
