import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Lead } from '../model/lead';
import { Datashared } from '../helper/datashared';
import { UserDetail } from '../login/login';
import { AddleadsService } from '../addleads/addleads.service';
import { DataGridComponent } from '../data-grid/data-grid.component';
import { Assignedtogrid } from '../assignedtogrid/assignedtogrid';
import { ListleadsService } from './listleads.service';
import { NotyHelper } from '../helper/NotyHelper';
import { AssignedInput, Bulkassign } from '../model/bulkassign';
import { LeadGenType } from '../helper/LeadGenType';
import { AdduserService } from '../adduser/adduser.service';

@Component({
  selector: 'app-listleads',
  templateUrl: './listleads.component.html',
  styleUrls: ['./listleads.component.css']
})
export class ListleadsComponent implements OnInit {
  public allLead: boolean = false;
  public additionalFilter: any;

  public filterQuery: any;
  public changeStatus: boolean = false;
  public changeSecurityGroup: boolean = false;
  public changeAssignedTo: boolean = false;
  public statusId: number;
  public securityId: number;
  public assignedId: number;
  assignedToGrid: Assignedtogrid = new Assignedtogrid();
  public selectedArrayofData: Array<any> = [];
  public bulkAssign: Bulkassign = new Bulkassign();
  public selectedLeads: Array<Lead> = [];
  public bulkAssignToggle: boolean = false;
  @ViewChild(DataGridComponent, { static: false }) public dataGrid: DataGridComponent;
  public staticFilter: any;
  public unapprovedstaticFilter: any;
  public isSecurityEnabled: boolean = true;
  public orderBy: any;
  public gridHeaders: Array<any>;
  public unapprovedgridHeaders: Array<any>;
  public dataSource: Array<any>;
  public unapproveddataSource: Array<any>;
  public filterColumns: Array<any>;
  public unapprovedfilterColumns: Array<any>;
  public apiUrl: string;
  public pageSize: number;
  public isResponsive: boolean;
  public isSearchEnabled: boolean;
  public isPaginationEnabled: boolean;
  public actions: Array<any>;
  public unapprovedactions: Array<any>;
  public pageLengthOptions: Array<number>;
  public unapprovedpageLengthOptions: Array<number>;
  public toggle: boolean;
  public editToggle: boolean = false;
  public tempModel: Lead = new Lead();
  public industry: any;
  public leadStatus: any;
  public users: any;
  public isOpen: Boolean = false;
  activeContainer: string = 'tab1';
  //public userDetails: UserDetail = new UserDetail();
  constructor(public router: Router,public addusers:AdduserService, public addleadsService: AddleadsService, public dataShared: Datashared, public listLeadsService:ListleadsService, public noty:NotyHelper) { }

  ngOnInit() {
    this.additionalFilter = 'Inactive eq null or Inactive eq false';
    this.unapprovedstaticFilter = 'IsPatientApproved eq null or IsPatientApproved eq false';
    this.getAssignedToGridData();
    this.addleadsService.getIndustryType().subscribe(data => {
      if (data) {
        this.industry = data.map(item => ({
          id: item.Id,
          Name: item.Name
        }));
      }
      this.addleadsService.getLeadStatus().subscribe(data => {
      if (data) {
        this.leadStatus = data.map(item => ({
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
    let ArrStatus = [{ id: 1, Name: "Cold" }, { id: 2, Name: "Hot" }];
        this.gridHeaders = [
      //{ displayName: 'Select', propertyName: 'x', dataType: '', secondPropertyName: '', filter: '', isLink: false, serializeArray: null, className: '', isCheckBox:true},
          { displayName: 'Patient Number', propertyName: 'LeadNumber', dataType: 'string', secondPropertyName: '', filter: '', isLink: true, serializeArray: null, className: '', isCheckBox: true },
          { displayName: 'Patient EMR', propertyName: 'BatchNumber', dataType: 'string', secondPropertyName: '', filter: '', isLink: true, serializeArray: null, className: '' },
          { displayName: 'Patient Name', propertyName: 'LeadName', dataType: 'string', secondPropertyName: '', filter: '', isLink: true, serializeArray: null, className: '', gridPermissionCheck: '2.1.1'},
      //{ displayName: 'Status', propertyName: 'LeadStatus', dataType: 'number', secondPropertyName: '', filter: '', isLink: false, serializeArray: this.leadStatus, className: '' },
          { displayName: 'City', propertyName: 'City', dataType: 'string', secondPropertyName: '', filter: '', isLink: false, serializeArray: null, className: '', gridPermissionCheck: '2.1.2' },
          { displayName: 'AssignedTo', propertyName: 'Owner', dataType: 'number', secondPropertyName: '', filter: '', isLink: false, serializeArray: this.users, className: '' },
          { displayName: 'Created On', propertyName: 'CreatedOn', dataType: 'date', secondPropertyName: '', filter: '', isLink: false, serializeArray: null, className: ''},
          { displayName: 'Created By', propertyName: 'CreatedById', dataType: 'number', secondPropertyName: '', filter: '', isLink: false, serializeArray: this.users, className: ''}
      //{ displayName: 'Company Name', propertyName: 'CompanyName', dataType: 'string', secondPropertyName: '', filter: '', isLink: false, serializeArray: null, className: '', gridPermissionCheck: '2.1.3' },
      //{ displayName: '# Opportunities', propertyName: 'OpportunityCount', dataType: 'number', secondPropertyName: '', filter: '', isLink: false, serializeArray: null, className: '', gridPermissionCheck: '2.1.4' },
      //{ displayName: 'Revenue', propertyName: 'AnnualRevenue', dataType: 'number', secondPropertyName: '', filter: '', isLink: false, serializeArray: null, className: '', gridPermissionCheck: '2.1.5' },
      //{ displayName: 'Industry', propertyName: 'Industry', dataType: 'number', secondPropertyName: '', filter: '', isLink: false, serializeArray: this.industry, className: '', gridPermissionCheck: '2.1.6' }
    ];
  }, err => { }, () => { });
      }, err => { }, () => { });
    }, err => { }, () => { });
    this.dataSource = new Array<any>();
    this.filterColumns = [
      { column: "ContactPersonName", value: "", type: "contains" },
      { column: "Title", value: "", type: "contains" },
      { column: "CompanyName", value: "", type: "contains" },
      { column: "AnnualRevenue", value: "", type: "contains" }
    ];
    this.actions = [
    ];
    this.pageLengthOptions = [25, 100, 250];


    this.unapprovedgridHeaders = [
      { displayName: 'Patient Name', propertyName: 'PatientName', dataType: 'string', secondPropertyName: '', filter: '', isLink: true, serializeArray: null, className: '' },
      { displayName: 'Email', propertyName: 'EmailAddress', dataType: 'string', secondPropertyName: '', filter: '', isLink: true, serializeArray: null, className: '' },
      { displayName: 'Address', propertyName: 'Address', dataType: 'string', secondPropertyName: '', filter: '', isLink: true, serializeArray: null, className: '' },
      { displayName: 'State', propertyName: 'State', dataType: 'string', secondPropertyName: '', filter: '', isLink: true, serializeArray: null, className: '' }
    ];
    this.unapprovedactions = [
    ];
    this.unapproveddataSource = new Array<any>();
    this.unapprovedfilterColumns = [
      
    ];
    this.unapprovedpageLengthOptions = [25, 100, 250];


  }


  
  getAssignedToGridData() {
    this.assignedToGrid.ApiUrl = "/api/Users/GetUsers";
    this.assignedToGrid.AssignedToId = this.assignedId;
    this.assignedToGrid.AssignedToType = "";
    this.assignedToGrid.Title = "Assigned To";
    this.assignedToGrid.KeyId = "UserId";
    this.assignedToGrid.KeyValue = "";
    this.assignedToGrid.DisplayName = "Name";
    this.assignedToGrid.GridHeaders = [
      { displayName: 'Name', propertyName: 'Name' },
      { displayName: 'Email', propertyName: 'Email' }
    ];
    this.assignedToGrid.unapprovedgridHeaders = [
      { displayName: 'Patient Name', propertyName: 'PatientName'},
    ];
  }

  addLead() {
    this.dataShared.setPermissionBaseValue("2.2");
    this.router.navigate(['/addleads']);
  }

  gotoImport() {
    this.router.navigate(['/leadimport']);
  }
  selectedArray(evt) {
    if (evt) {
      this.selectedLeads = evt;
      if (this.selectedLeads.length > 0) {
        this.selectedLeads.forEach(_data => {
          var assignedInput = new AssignedInput();
          assignedInput.Id = _data.LeadId;
          assignedInput.EntityType = LeadGenType.Lead;
          this.bulkAssign.ArrayOfData.push(assignedInput);
        });
        this.bulkAssignToggle = true;
      }
      else {
        this.bulkAssignToggle = false;
      }
    }
  }
  //selectedArray(evt) {
  //  if (evt && evt.length > 0) {
  //    this.selectedArrayofData = evt;
  //    if (this.selectedArrayofData) {
  //      for (var i = 0; i < this.selectedArrayofData.length; i++) {
  //        var assignedInput = new AssignedInput();
  //        assignedInput.Id = this.selectedArrayofData[i].LeadId;
  //        assignedInput.EntityType = LeadGenType.Lead;
  //        this.bulkAssign.ArrayOfData.push(assignedInput);
  //      }
  //    }
  //    this.bulkAssignToggle = true;
  //  }
  //  else {
  //    this.bulkAssignToggle = false;
  //  }
  //}

  openStatusModal() {
    this.changeStatus = true;
  }

  openSecurityGroup() {
    this.changeSecurityGroup = true;
  }

  openAssignedTo() {
    this.changeAssignedTo = true;
  }


  closeStatusModal() {
    this.bulkAssign = new Bulkassign();
    this.changeStatus = false;
  }

  closeSecurityGrouptModal() {
    this.bulkAssign = new Bulkassign();
    this.changeSecurityGroup = false;
  }

  closeAssignedToModal() {
    this.bulkAssign = new Bulkassign();
    this.changeAssignedTo = false;
  }

  updateStatus() {
    this.listLeadsService.updateStatus(this.bulkAssign).subscribe(data => {
      if (data) {
        this.noty.ShowNoty("Lead status updated successfully.");
        this.bulkAssign = new Bulkassign();
        this.changeStatus = false;
        this.reloadCurrentRoute();
      }
    }, err => { }, () => { });
  }

  updateSecurityGroup() {
    this.listLeadsService.updateSecurityGroup(this.bulkAssign).subscribe(data => {
      if (data) {
        this.noty.ShowNoty("SecurityGroup updated successfully.");
        this.bulkAssign = new Bulkassign();
        this.changeSecurityGroup = false;
        this.reloadCurrentRoute();
      }
    }, err => { }, () => { });
  }

  updateAssignedTo() {
    this.listLeadsService.updateAssignedTo(this.bulkAssign).subscribe(data => {
      if (data) {
        this.noty.ShowNoty("Assigned to updated successfully.");
        this.bulkAssign = new Bulkassign();
        this.changeAssignedTo = false;
        this.reloadCurrentRoute();
      }
    }, err => { }, () => { });
  }


  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }


  editLead(evt) {
    this.dataShared.setPermissionBaseValue("2.2");
    this.dataShared.setValue(evt.dataRow);
    this.router.navigate(['/addleads']);
  }

  editTempPatient(evt) {
    this.dataShared.setValue(evt.dataRow);
    this.router.navigate(['/addtemppatient']);
  }

  tempPatientList() {
    this.isOpen = true;
  }

  moveToPatientList() {
    this.router.navigate(['/listleads']);
  }
  //getSecurityFilterQuery(userId): void {
  //  if (userId) {
  //    this.leadService.getUserLeadIds(userId).subscribe(data => {
  //      if (data) {
  //        this.staticFilter = 'LeadId in (' + data.join(', ') + ')';
  //      }
  //    }, err => { });
  //  }
  //}
}
