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
    // Get pipeline group data
    this.getPipeLineGroup();
    // Fetch pipeline data based on 'Sales' group type
    this.pipelineService.getPipelineByGroupTypeName('Sales').subscribe(data => {
      if (data) {
        // Map the received data to pipeline OData format
        this.pipelineOData = data.map(item => ({
          id: item.PipelineId,
          Name: item.Name
        }));
      }
      // Fetch deal status
      this.dealService.getDealStatus().subscribe(data => {
        if (data) {
          // Map the received deal status data
          this.status = data.map(item => ({
            id: item.Id,
            Name: item.Name
          }));
        }
        // Fetch users data
        this.addusers.getUsers().subscribe(data => {
          // Map the received users data
          if (data) {
            this.users = data.map(item => ({
              id: item.UserId,
              Name: item.Name
            }));
          }
          // Set up grid headers
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

    // Initialize data source and filter columns
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
    // Define page length options
    this.pageLengthOptions = [25, 100, 250];
  }

  addNewOpportunity() {
    // Navigate to 'adddeals' route to create a new deal
    this.router.navigate(['/adddeals']);
  }
  pipeline() {
    // Navigate to 'pipeline' route to view the pipeline
    this.router.navigate(['/pipeline']);
  }
  noAllowDrop(ev) {
    // Prevent the default behavior to disallow dropping
    ev.stopPropagation();
  }

  drop(ev, pipeline) {
    // Handle drop event
    this.dropElement = pipeline;
    var data = ev.dataTransfer.getData("text");
    //ev.target.appendChild(document.getElementById(data));
    // Update the pipeline ID for the dragged deal
    this.updatePipelineId(this.dragElement.DealId, this.dropElement);
    ev.preventDefault();
  }
  // Allow the drop event by preventing the default action 
  allowDrop(ev) {
    ev.preventDefault();
  }
  // Allow the drop event for tile elements by preventing the default action
  allowDropTile(ev) {
    ev.preventDefault();
  }
  // Set the data to be transferred during the drag event (Deal ID)
  drag(ev, deal) {
    ev.dataTransfer.setData("text", ev.target.id);
    this.dragElement = deal;
  }

  editDeal(evt) {
    // Set the value of the selected deal to the data shared service
    this.dataShared.setValue(evt.dataRow);
    this.dataShared.setPermissionBaseValue("4.2");
    this.router.navigate(['/adddeals']);
  }

  editDealFromDrag(deal) {
    // Set the dragged deal's data to the shared service
    this.dataShared.setValue(deal);
    this.router.navigate(['/opportunityview']);
  }

  getPipeLineGroup() {
    // Fetch the pipeline groups from the service
    this.listDealService.getPipeLineGroup().subscribe(data => {
      if (data != null) {
        // Store the fetched pipeline groups in the listPipeLineGroup
        this.listPipeLineGroup = data;
        // Check if pipeline groups are available and set the default group
        if (data.length >= 0) {
          this.pipelineGroupId = data[0].PipelineGroupId;
          // Fetch the pipeline information for the selected group
          this.getPipeLineByPipeLineGroupId(this.pipelineGroupId);
        }
      }
    });
  }
  // Handle the "Won" drop event by updating the pipeline status to 1
  wondrop(ev) {

    this.updatePipelineStatus(this.dragElement.DealId, 1);
    ev.preventDefault();
  }
  // Handle the "Done" drop event by updating the pipeline status to 2
  donedrop(ev) {

    this.updatePipelineStatus(this.dragElement.DealId, 2);
    ev.preventDefault();
  }
  // Handle the "Lost" drop event by updating the pipeline status to 3
  lostdrop(ev) {

    this.updatePipelineStatus(this.dragElement.DealId, 3);
    ev.preventDefault();
  }
  // Edit the pipeline by navigating to the pipeline page with the selected pipeline details
  editPipeline(pipelineid) {
    let pipeline = this.listPipeLineGroup.find(x => x.PipelineGroupId == pipelineid);
    this.dataShared.setValue(pipeline);
    this.router.navigate(['/pipeline']);
  }
  // Get the pipelines by pipeline group ID and fetch deals for the group
  getPipeLineByPipeLineGroupId(id) {
    if (id) {
      this.listDealService.getPipeLineByPipeLineGroupId(id).subscribe(data => {
        this.listofPipeline = data;
        this.getDealByPipeLineGroupId(id);
      });
    }

  }
  // Sort the pipelines by a given property 
  sortBy(prop: string) {
    return this.listofPipeline ? this.listofPipeline.sort((a, b) => a[prop] > b[prop] ? 1 : a[prop] === b[prop] ? 0 : -1) : [];
  }
  // Get the deals for a specific pipeline group by its ID
  getDealByPipeLineGroupId(id) {
    this.listDealService.getDealByPipeLineGroupId(id).subscribe(data => {
      if (data) {
        this.dealList = data.Item1;
      }
    });
  }
  // Filter the deals by the pipeline ID
  getStageDeal(id) {
    return this.dealList ? this.dealList.filter(x => x.PipelineId == id) : [];
  }
  // Update the pipeline ID of a deal
  updatePipelineId(dealId, pipelineId) {
    this.listDealService.updatePipelineId(dealId, pipelineId).subscribe(data => {
      this.getPipeLineGroup();
    }, err => { }, () => { });
  }
  // Update the status ID of a deal and show a notification if successful
  updatePipelineStatus(dealId, status) {
    this.listDealService.updateStatusId(dealId, status).subscribe(data => {

      if (data != null) {
        this.dragElement.StatusId = data.StatusId;
        this.noty.ShowNoty("Deal status updated !!!");
      }
    }, err => { }, () => { });
  }
}
