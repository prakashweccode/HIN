import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Datashared } from '../helper/datashared';
import { ListdealsService } from './listdeals.service';
import { PipelineGroup, Pipeline } from '../model/pipeline';
import { Deal } from '../model/deal';
import { NotyHelper } from '../helper/NotyHelper';
import { PipelineService } from '../pipeline/pipeline.service';
import { AdddealsService } from '../adddeals/adddeals.service';
import { AdduserService } from '../adduser/adduser.service';

@Component({
  selector: 'app-listdeals',
  templateUrl: './listdeals.component.html',
  styleUrls: ['./listdeals.component.css']
})
export class ListdealsComponent implements OnInit {
  public dynamicFilter: any;
  public staticFilter: any;
  public filterQuery: any;
  public orderBy: any;
  public gridHeaders: Array<any>;
  public dataSource: Array<any>;
  public filterColumns: Array<any>;
  public dragElement: Deal;
  public dropElement: Pipeline;
  public apiUrl: string;
  public pageSize: number;
  public isResponsive: boolean;
  public isSearchEnabled: boolean;
  public isPaginationEnabled: boolean;
  public actions: Array<any>;
  public isSecurityEnabled: boolean = true;
  public pageLengthOptions: Array<number>;
  activeContainer: string = "tab1";
  public listPipeLineGroup: Array<PipelineGroup>;
  public listofPipeline: Array<Pipeline>;
  public pipelineGroupId: number;
  public pipelineOData: any;
  public status: any;
  public dealList: Array<Deal>;
  public users: any;
  constructor(public router: Router, public addusers: AdduserService, public dataShared: Datashared, public listDealService: ListdealsService, public noty: NotyHelper, public pipelineService: PipelineService, public dealService: AdddealsService) { }

  ngOnInit() {
    //this.dynamicFilter = 'StatusId eq 5';
    this.getPipeLineGroup();
    this.pipelineService.getPipelineByGroupTypeName('Sales').subscribe(data => {
      if (data) {
        this.pipelineOData = data.map(item => ({
          id: item.PipelineId,
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
        this.addusers.getUsers().subscribe(data => {
          if (data) {
            this.users = data.map(item => ({
              id: item.UserId,
              Name: item.Name
            }));
          }
          this.gridHeaders = [
            { displayName: 'Practice Number', propertyName: 'DealNumber', dataType: 'string', secondPropertyName: '', filter: '', isLink: true, serializeArray: null },
            { displayName: 'Practice Name', propertyName: 'DealName', dataType: 'string', secondPropertyName: '', filter: '', isLink: true, serializeArray: null },
            //{ displayName: 'Customer - Leads', propertyName: 'Lead.LeadName', dataType: 'string', secondPropertyName: '', filter: '', isLink: false, serializeArray: null, gridPermissionCheck: '4.1.2' },
            //{ displayName: 'Expected Revenue', propertyName: 'ExpectedRevenue', dataType: 'string', secondPropertyName: '', filter: '', isLink: false, serializeArray: null, gridPermissionCheck: '4.1.3' },
            //{ displayName: 'Status', propertyName: 'StatusId', dataType: 'number', secondPropertyName: '', filter: '', isLink: false, serializeArray: this.status },
            { displayName: 'Assigned To', propertyName: 'AssignedTo', dataType: 'number', secondPropertyName: '', filter: '', isLink: false, serializeArray: this.users },
            { displayName: 'Created On', propertyName: 'CreatedOn', dataType: 'date', secondPropertyName: '', filter: '', isLink: false, serializeArray: null },
            { displayName: 'Created By', propertyName: 'CreatedById', dataType: 'number', secondPropertyName: '', filter: '', isLink: false, serializeArray: this.users },
           // { displayName: 'Estimate Date', propertyName: 'EstimationDate', dataType: 'date', secondPropertyName: '', filter: '', isLink: false, serializeArray: null },
            //{ displayName: 'Funnel Stage', propertyName: 'PipelineId', dataType: 'number', secondPropertyName: '', filter: '', isLink: false, serializeArray: this.pipelineOData }
          ];
        }, err => { }, () => { });
      }, err => { }, () => { });
    }, err => { }, () => { });

    this.dataSource = new Array<any>();
    this.filterColumns = [
      { column: "DealName", value: "", type: "contains" },
      { column: "LeadProvider", value: "", type: "contains" },
      { column: "ExpectedRevenue", value: "", type: "contains" },
      { column: "EstimationDate", value: "", type: "contains" },
      { column: "PipelineId", value: "", type: "contains" }
    ];
    this.actions = [
    ];
    this.pageLengthOptions = [25, 100, 250];
  }

  addNewOpportunity() {
    this.router.navigate(['/adddeals']);
  }
  pipeline() {
    this.router.navigate(['/pipeline']);
  }
  noAllowDrop(ev) {
    ev.stopPropagation();
  }
  drop(ev, pipeline) {
    this.dropElement = pipeline;
    var data = ev.dataTransfer.getData("text");
    //ev.target.appendChild(document.getElementById(data));
    this.updatePipelineId(this.dragElement.DealId, this.dropElement);
    ev.preventDefault();
  }

  allowDrop(ev) {
    ev.preventDefault();
  }
  allowDropTile(ev) {
    ev.preventDefault();
  }
  drag(ev, deal) {
    ev.dataTransfer.setData("text", ev.target.id);
    this.dragElement = deal;
  }

  editDeal(evt) {
    this.dataShared.setValue(evt.dataRow);
    this.dataShared.setPermissionBaseValue("4.2");
    this.router.navigate(['/adddeals']);
  }

  editDealFromDrag(deal) {
    this.dataShared.setValue(deal);
    this.router.navigate(['/opportunityview']);
  }

  getPipeLineGroup() {
    this.listDealService.getPipeLineGroup().subscribe(data => {
      if (data != null) {
        this.listPipeLineGroup = data;
        if (data.length >= 0) {
          this.pipelineGroupId = data[0].PipelineGroupId;
          this.getPipeLineByPipeLineGroupId(this.pipelineGroupId);
        }
      }
    });
  }

  wondrop(ev) {

    this.updatePipelineStatus(this.dragElement.DealId, 1);
    ev.preventDefault();
  }

  donedrop(ev) {

    this.updatePipelineStatus(this.dragElement.DealId, 2);
    ev.preventDefault();
  }

  lostdrop(ev) {

    this.updatePipelineStatus(this.dragElement.DealId, 3);
    ev.preventDefault();
  }
  editPipeline(pipelineid) {
    let pipeline = this.listPipeLineGroup.find(x => x.PipelineGroupId == pipelineid);
    this.dataShared.setValue(pipeline);
    this.router.navigate(['/pipeline']);
  }

  getPipeLineByPipeLineGroupId(id) {
    if (id) {
      this.listDealService.getPipeLineByPipeLineGroupId(id).subscribe(data => {
        this.listofPipeline = data;
        this.getDealByPipeLineGroupId(id);
      });
    }

  }

  sortBy(prop: string) {
    return this.listofPipeline ? this.listofPipeline.sort((a, b) => a[prop] > b[prop] ? 1 : a[prop] === b[prop] ? 0 : -1) : [];
  }

  getDealByPipeLineGroupId(id) {
    this.listDealService.getDealByPipeLineGroupId(id).subscribe(data => {
      if (data) {
        this.dealList = data.Item1;
      }
    });
  }

  getStageDeal(id) {
    return this.dealList ? this.dealList.filter(x => x.PipelineId == id) : [];
  }

  updatePipelineId(dealId, pipelineId) {
    this.listDealService.updatePipelineId(dealId, pipelineId).subscribe(data => {
      this.getPipeLineGroup();
    }, err => { }, () => { });
  }
  updatePipelineStatus(dealId, status) {
    this.listDealService.updateStatusId(dealId, status).subscribe(data => {

      if (data != null) {
        this.dragElement.StatusId = data.StatusId;
        this.noty.ShowNoty("Deal status updated !!!");
      }
    }, err => { }, () => { });
  }
}
