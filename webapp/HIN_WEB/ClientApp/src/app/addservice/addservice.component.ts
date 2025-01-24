import { formatDate } from '@angular/common';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { AddeventService } from '../addevent/addevent.service';
import { UserGroups } from '../addgroup/addgroup';
import { AddgroupService } from '../addgroup/addgroup.service';
import { AddleadsService } from '../addleads/addleads.service';
import { DriveRequest } from '../adduser/adduser.component';
import { AdduserService } from '../adduser/adduser.service';
import { Assignedtogrid } from '../assignedtogrid/assignedtogrid';
import { Contactinformation } from '../contactinformation/contactinformation';
import { ContactinformationService } from '../contactinformation/contactinformation.service';
import { CustomProperty, CustomPropertyValues, DbPropertyTypes } from '../custom-fields/custom-fields';
import { CustomFieldsService } from '../custom-fields/custom-fields.service';
import { CustomsectionComponent } from '../customsection/customsection.component';
import { Datashared } from '../helper/datashared';
import { Datetimehelper } from '../helper/datetimehelper';
import { LeadGenType } from '../helper/LeadGenType';
import { NotyHelper } from '../helper/NotyHelper';
import { Pipelinegrouptypeid } from '../helper/pipelinegrouptypeid';
import { SumPipe } from '../helper/sum.pipe';
import { ListdealsService } from '../listdeals/listdeals.service';
import { ModalService } from '../loader.service';
import { UserDetail } from '../login/login';
import { Deal } from '../model/deal';
import { Events } from '../model/event';
import { Lead } from '../model/lead';
import { Pipeline, PipelineGroup } from '../model/pipeline';
import { Services } from '../model/services';
import { NotesInformation } from '../notesinfo/notesinfo';
import { NotesinfoService } from '../notesinfo/notesinfo.service';
import { OnedrivegraphService } from '../onedriveservice/onedrivegraph.service';
import { Users } from '../users/users';
import { UsersService } from '../users/users.service';
import { JobService } from './job.service';

@Component({
  selector: 'app-addservice',
  templateUrl: './addservice.component.html',
  styleUrls: ['./addservice.component.css']
})
export class AddserviceComponent implements OnInit {
  @ViewChildren(CustomsectionComponent) public CustomFieldSection: QueryList<CustomsectionComponent>;
  constructor(public leadService: AddleadsService, public addUserService: AdduserService, public jobService: JobService, public addGroupService: AddgroupService, private notesService: NotesinfoService, private customFieldService: CustomFieldsService, private contactService: ContactinformationService, private router: Router, private dataShared: Datashared, private userService: UsersService, private notyHelper: NotyHelper, public modalService: ModalService, public listDealService: ListdealsService, private graphService: OnedrivegraphService, public addeventService: AddeventService) { }
  UserDetails: Array<Users> = [];
  loggedUser: UserDetail;
  disableLead = false;
  customFields: Array<CustomProperty> = [];
  leftServiceCustomFieldValues: Array<CustomPropertyValues> = [];
  rightServiceCustomFieldValues: Array<CustomPropertyValues> = [];
  servicePercentLeftCustomFieldValues: Array<CustomPropertyValues> = [];
  servicePercentRightCustomFieldValues: Array<CustomPropertyValues> = [];
  serviceReqLeftCustomFieldValues: Array<CustomPropertyValues> = [];
  serviceReqRightCustomFieldValues: Array<CustomPropertyValues> = [];
  serviceCostLeftCustomFieldValues: Array<CustomPropertyValues> = [];
  serviceCostRightCustomFieldValues: Array<CustomPropertyValues> = [];
  public lstGroups: Array<UserGroups> = [];
  public entityNumber: string;
  showStepsCost: boolean = false;
  assignedToGrid: Assignedtogrid = new Assignedtogrid();
  ownerDetails: Array<Users> = [];
  users: Array<Users> = [];
  public dbPropertyTypes: Array<DbPropertyTypes> = [];
  lstLeads: Array<Lead> = [];
  lstEvents: Array<Events> = [];
  lstOpportunities: Array<Deal> = [];
  activeContainer: string = '';
  contactInformations: Array<Contactinformation> = [];
  notesInfos: Array<NotesInformation> = [];
  service: Services = new Services();
  public listofPipeline: Array<Pipeline>;
  listPipeLineGroup: Array<PipelineGroup>;
  selectedPipeIndex = 0;
  isSaveDisabled: boolean = false;
  userId: number;
  entityType: number = LeadGenType.Services;
  servicePercentType: number = LeadGenType.ServicePercentage;
  serviceRequestType: number = LeadGenType.ServiceRequirements;
  serviceCostType: number = LeadGenType.ServiceCost;
  dragElement: any;
  dropElement: any;
  ownerName: string;
  stepDetails: any;
  showAddress: boolean = true;
  addCustomToggle: boolean = false;
  serviceActualCost: number = 0;
  firstLetter: string = "AP";
  patient: Lead = new Lead();
  emrNo: string = '';
  ngOnInit() {
    this.loggedUser = JSON.parse(localStorage.getItem("userDetail"));
    this.userId = this.loggedUser.User.UserId;
    this.service.Owner = this.loggedUser.User.UserId;
    this.ownerName = this.loggedUser.User.FirstName;
    this.getUsers();
    this.getUserGroups();
    this.getPipeLineGroup();
    this.getAllLeads();
    this.getAllEvents();
    this.getAllOpportunities();
    let service = new Services();
    service = this.dataShared.getValue();
    if (service) {
      this.getServiceById(service.Id);
      this.disableLead = true;
      this.activeContainer = 'tabContacts';
      
    }
    else {
      this.service.AssignedTo = this.userId;
      this.getLastIndentId("AP");
      let lead = this.dataShared.getLeadValue();
      if (lead) {
        this.service.LeadId = lead.LeadId;
        this.assignLeadToService(lead.LeadId);
      }
      let opportunity = <Deal>this.dataShared.getOppValue();
      if (opportunity) {
        this.assignOpportunityToService(opportunity);
      }
    }
    var events = this.dataShared.getEventValue();
    if (events) {
      this.service.EventId = events.Id;
      this.service.LeadId = events.PatientBatchNumber;
    }
    //var eventId = this.dataShared.getEventId();
    //if (eventId) {
    //  this.service.EventId = eventId;
    //}
    var pipelineData = this.dataShared.getPipelineValue();
    if (pipelineData) {
      this.service.PipelineGroupId = pipelineData.pipelineGroupId;
      this.service.PipelineId = pipelineData.pipeline.PipelineId;
      this.getPipeLineByPipeLineGroupId(this.service.PipelineGroupId);
    }
    this.getAssignedToGridData();
    this.getCustomFieldType();
    this.getPatientName(this.patient.LeadName);
    this.service.StatusId = 1
    this.colorChange();
  }
  checkPastEvent(fromDate: any) {
    if (fromDate) {
      var d = new Date();
      d.setHours(0, 0, 0, 0);
      if (Date.parse(fromDate) - Date.parse(d.toString()) < 0) {
        return true;
      }
      else {
        return false;
      }
    }
   
   
  }
  colorChange() {
    if (this.service.StatusId == 1 && this.checkPastEvent(this.service.StartDate)) {
      this.service.Color = "#FF0000";
    }
    else if (this.service.StatusId == 1) {
      this.service.Color = "#ebfb09";
    }

    else {
      if (this.service.StatusId == 3) {
        this.service.Color = "#37f901";
      }

      if (this.service.StatusId == 2 || this.service.StatusId == 4) {
        this.service.Color = "#FF0000";
      }


    }
  }

  assignOpportunityToService(opportunity: Deal) {
    this.service.LeadId = opportunity.LeadId;
    this.service.Address = opportunity.Address;
    this.service.City = opportunity.City;
    this.service.State = opportunity.State;
    this.service.Country = opportunity.State;
    this.service.Zipcode = opportunity.ZipCode;
    this.service.Website = opportunity.Website;
    this.service.SecurityGroup = opportunity.SecurityGroupId;
    this.service.AssignedTo = opportunity.AssignedTo;
    this.service.Color = opportunity.Color;
  }

  statusEmitter(evt) {

  }
  getDateStringFormat(startType: string, date: any) {
    let oDate = new Date(date);
    if (oDate) {
      switch (startType) {
        case 'MDY':
          return ("0" + (oDate.getMonth() + 1)).slice(-2) + "-" + ("0" + oDate.getDate()).slice(-2) + "-" + oDate.getFullYear();
        case 'DMY':
          return ("0" + oDate.getDate()).slice(-2) + "-" + ("0" + (oDate.getMonth() + 1)).slice(-2) + "-" + oDate.getFullYear();
        case 'YMD':
          return oDate.getFullYear() + "-" + ("0" + (oDate.getMonth() + 1)).slice(-2) + "-" + ("0" + oDate.getDate()).slice(-2);
        default:
          return ("0" + oDate.getDate()).slice(-2) + "-" + ("0" + (oDate.getMonth() + 1)).slice(-2) + "-" + oDate.getFullYear();
      }
    }
  }
  //async EnableOnedrive() {
  //  
  //  await this.graphService.getRootItems().then(data => {
  //    let onedrive: any = data;
  //    for (let i = 0; i < onedrive.value.length; i++) {
  //      this.SendAccess(onedrive.value[i], "prakash@techcm.com");
  //    }
  //  }, err => { });
  //}

  //SendAccess(id: any, userEmail: any) {
  //  
  //  let driveRequest = new DriveRequest();
  //  driveRequest.message = "";
  //  driveRequest.recipients = [{ email: userEmail }];
  //  driveRequest.requireSignIn = true;
  //  driveRequest.sendInvitation = true;
  //  driveRequest.roles = ["write"];
  //  this.graphService.AddAccess(id, driveRequest);
  //}
  getServiceById(id) {
    this.jobService.getServiceById(id).subscribe(_data => {
      if (_data) {
        this.service = _data;
        this.getBatchNumber(this.service.LeadId);
        this.getAssignedToGridData();
        if (this.service.Id) {
          this.entityNumber = this.service.ServiceNumber;
          this.getContactInformation(LeadGenType.Services, this.service.Id);
          if (this.service.DealId)
            this.getStepDetails(this.service.Id);
        }
        if (this.service.PipelineGroupId > 0) {
          this.getPipeLineByPipeLineGroupId(this.service.PipelineGroupId);
        }
      }
    });
  }
  getStepDetails(serviceId) {
    this.jobService.getStepDetails(serviceId).subscribe(data => {
      if (data) {
        this.stepDetails = data;
        this.serviceActualCost = this.getAllTotalCost(this.stepDetails);
      }
    }, err => { }, () => { });
  }
  getAllTotalCost(stepDetails) {
    let totalOpportunityAmount = 0;
    stepDetails.Item2.forEach(data => {
      totalOpportunityAmount += this.getTotalCost(data.Item3, data.Item2);
    });
    return totalOpportunityAmount;
  }
  getTotalTimeCost(timeCosts) {
    if (timeCosts && timeCosts.length > 0) {
      const sumPipe = new SumPipe();
      let totalTimeCost = sumPipe.timeCalculationMultiple(timeCosts, "Cost", "TotalTime");
      return this.parseNumber(totalTimeCost);
    }
    else {
      return 0;
    }
  }
  getTotalCost(timeCost, materialCost) {
    let totalTimeCost = this.getTotalTimeCost(timeCost);
    let totalMaterialCost = this.getTotalMaterialCost(materialCost);
    return this.parseNumber(totalTimeCost + totalMaterialCost);
  }
  getTotalMaterialCost(materialCosts) {
    if (materialCosts && materialCosts.length > 0) {
      const sumPipe = new SumPipe();
      let totalMaterialCost = sumPipe.transformMultiple(materialCosts, "Quantity", "Price");
      return this.parseNumber(totalMaterialCost);
    }
    else {
      return 0;
    }
  }
  parseNumber(data) {
    if (isNaN(data)) {
      return 0;
    }
    else {
      return Math.round(data);
    }
  }
  getAllLeads() {
    this.leadService.getAllLeads().subscribe(data => {
      if (data) {
        this.lstLeads = data;
        let curPatient = this.lstLeads.find(x => x.LeadId == this.service.LeadId);
        this.emrNo = curPatient ? curPatient.BatchNumber : "";
      }
    }, err => { }, () => { });
  }

  getBatchNumber(id: number) {
    if (id) {
      this.emrNo = this.lstLeads.find(x => x.LeadId == id).BatchNumber;
    }
  }

  getAllEvents() {
    this.addeventService.getAllEvents().subscribe(data => {
      if (data) {
        this.lstEvents = data;
      }
    }, err => { }, () => { });
  }
  getAllOpportunities() {
    this.listDealService.getAllOpportunity().subscribe(data => {
      if (data) {
        this.lstOpportunities = data;
      }
    }, err => { }, () => { });
  }
  getPatientName(selectedValue) {
    if (selectedValue) {
      this.patient = this.lstLeads.find(x => x.LeadId == parseInt(selectedValue));
    }

  }
  getUsers() {
    this.userService.getUsers().subscribe(data => {
      this.users = data;
    });
  }
  getUserGroups() {
    this.addGroupService.GetUserGroups().subscribe(data => {
      if (data) {
        this.lstGroups = data;
        if (!this.service.SecurityGroup || this.service.SecurityGroup < 1) {
          if (this.lstGroups.length > 0) {
            var adminGroup = this.lstGroups.find(x => x.Name == "admin");
            if (adminGroup) {
              this.service.SecurityGroup = adminGroup.UserGroupId;
            }
          }
        }
      }
    }, err => {

    });
  }

  chageLeadStatus(evt) {
    if (evt) {
      var Id = parseInt(evt);
      this.service.Type = Id;
      if (!(this.service.Id && this.service.Id != 0)) {
        switch (this.service.Type) {
          case 1:
            this.firstLetter = "AP";
            break;
          case 2:
            this.firstLetter = "JR";
            break;
          default:
            this.firstLetter = "AP"
            break;
        }
        this.getLastIndentId(this.firstLetter);
      }
    }
  }



  getLastIndentId(firstLetter) {
    this.contactService.getNewEntityId('Services', firstLetter).subscribe(data => {
      if (data) {
        this.service.ServiceNumber = data.EntityNumber;
      }
    }, err => { }, () => { });
  }


  addNewService() {
    this.router.navigate(['/addservice']);
  }
  backToList() {
    this.router.navigate(['/listservices']);
  }
  reloadCurrentRoute() {
    let currentUrl = this.router.url.split('(')[0];
    this.dataShared.setValue(this.service);
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  assignLeadToService(leadId) {
    if (leadId)
      this.service.LeadId = leadId;
    if (this.lstOpportunities.length > 0) {
      let opportunity = this.lstOpportunities.find(x => x.LeadId == leadId);
      if (opportunity) {
        this.service.DealId = opportunity.DealId;
      }
    }
    else {
      this.listDealService.getAllOpportunity().subscribe(data => {
        if (data) {
          this.lstOpportunities = data;
          let opportunity = this.lstOpportunities.find(x => x.LeadId == leadId);
          if (opportunity) {
            this.service.DealId = opportunity.DealId;
          }
        }
      }, err => { }, () => { });
    }


  }
  selectedOpportunityStatus(evt) {
    if (evt) {
      this.service.StatusId = evt;
      this.colorChange();
    }
  }

  selectedPrority(evt) {
    if (evt) {
      this.service.ProrityId = evt;

    }
  }
  selectedTicketType(evt) {
    if (evt) {
      this.service.TicketTypeId = evt;

    }
  }

  selectedSubIssueType(evt) {
    if (evt) {
      this.service.SubIssueTypeId = evt;

    }
  }

  selectAssignedValue(evt) {
    if (evt && evt.UserId)
      this.service.AssignedTo = evt.UserId;
  }
  getCompanyName(id) {
    if (id && this.lstLeads.length > 0) {
      //var leadId= this.lstOpportunities.find(x => x.DealId == id).LeadId;
      var companyName = this.lstLeads.find(x => x.LeadId == id).CompanyName;
      if (companyName == null) {
        companyName = this.lstLeads.find(x => x.LeadId == id).LeadName;
      }
      return companyName;
    }
  }
  getOpportunityName(id) {
    if (id && this.lstOpportunities.length > 0) {
      var opportunityName = this.lstOpportunities.find(x => x.DealId == id).DealName;
      if (opportunityName == null) {
        return '';
      }
      return opportunityName;
    }
  }
  LoadNotes(entityId, entityTypeId) {
    this.notesService.LoadNotes(entityId, entityTypeId).subscribe(data => {
      if (data) {
        this.notesInfos = data;
      }
    }, err => { }, () => { });
  }
  changeEstimateDateFormat(date) {
    if (date) {
      this.colorChange();
      if (Object.prototype.toString.call(date) === "[object Date]")
        return date.getFullYear() + '-' + (date.getMonth() < 10 ? ('0' + (date.getMonth() + 1)) : date.getMonth() + 1) + '-' + (date.getDate() < 10 ? ('0' + (date.getDate())) : (date.getDate()));
      else {
        let clonedDate = new Date(date);
        return clonedDate.getFullYear() + '-' + (clonedDate.getMonth() < 10 ? ('0' + (clonedDate.getMonth() + 1)) : clonedDate.getMonth() + 1) + '-' + (clonedDate.getDate() < 10 ? ('0' + (clonedDate.getDate())) : (clonedDate.getDate()));
      }
    }
  }


  changeEndDateFormat(date) {
    if (date) {
      if (Object.prototype.toString.call(date) === "[object Date]")
        return (date.getHours() < 10 ? ('0' + date.getHours()) : date.getHours()) + ':' + (date.getMinutes() < 10 ? ('0' + date.getMinutes()) : date.getMinutes());
      else {
        let clonedDate = new Date(date);
        return (clonedDate.getHours() < 10 ? ('0' + clonedDate.getHours()) : clonedDate.getHours()) + ':' + (clonedDate.getMinutes() < 10 ? ('0' + clonedDate.getMinutes()) : clonedDate.getMinutes());
      }
    }
  }



  getContactInformation(entityType, entityId) {
    this.contactService.getContactInformation(entityType, entityId, false).subscribe(data => {
      if (data != null)
        this.contactInformations = data;
    }, err => { }, () => { });
  }

  getAssignedToGridData() {
    this.assignedToGrid.ApiUrl = "/api/Users/GetUsers";
    this.assignedToGrid.AssignedToId = this.service.AssignedTo;
    this.assignedToGrid.AssignedToType = "";
    this.assignedToGrid.Title = "Assigned To";
    this.assignedToGrid.KeyId = "UserId";
    this.assignedToGrid.KeyValue = "";
    this.assignedToGrid.DisplayName = "Name";
    this.assignedToGrid.GridHeaders = [
      { displayName: 'Name', propertyName: 'Name' },
      { displayName: 'Email', propertyName: 'Email' }
    ];
  }
  setCurrentDateTime() {
    if (this.service.Id > 0) { }
    else { this.service.StartDate = new Date(); }
  }
  copyAddressFromLead(service, evt) {
    if (service.LeadId) {
      let oLead = this.lstLeads.find(x => x.LeadId == service.LeadId);
      service.Address = oLead.Address;
      service.City = oLead.City;
      service.State = oLead.State;
      service.ZipCode = oLead.ZipCode;
      service.Country = oLead.Country;
      this.notyHelper.ShowNoty("Address Copied.");
    }
    else {
      this.notyHelper.ShowNoty("Please select Company.");
    }
  }
  editLead() {
    this.dataShared.setValue(this.lstLeads.find(x => x.LeadId == this.service.DealId));
    this.router.navigate(['/addleads']);
  }
  editLeadModal() {
    this.dataShared.setValue(this.lstLeads.find(x => x.LeadId == this.service.LeadId));
    this.navigate('addleadsmodal', true);
  }
  editDealModal() {
    this.dataShared.setValue(this.lstOpportunities.find(x => x.DealId == this.service.DealId));
    this.navigate('adddealsmodal', true);
  }
  getPipeLineGroup() {
    this.listDealService.getPipeLineGroup().subscribe(data => {
      this.listPipeLineGroup = data.filter(x => x.PipelineGroupType == Pipelinegrouptypeid.Service);
      if (this.service.PipelineGroupId == -1) {
        if (this.listPipeLineGroup.length > 0) {
          this.service.PipelineGroupId = this.listPipeLineGroup[this.listPipeLineGroup.length - 1].PipelineGroupId;
        }
        else {
          this.service.PipelineGroupId = 0;
        }
        this.getPipeLineByPipeLineGroupId(this.service.PipelineGroupId);
      }

    });
  }
  getPipeLineByPipeLineGroupId(id) {
    if (id == -1) {
      this.addNewFunnel();
    }
    else {
      if (id) {
        this.listDealService.getPipeLineByPipeLineGroupId(id).subscribe(data => {
          this.listofPipeline = data;
          this.listofPipeline = this.sortBy('DisplayOrder');
          this.selectedPipeIndex = this.listofPipeline.findIndex(x => x.PipelineId == this.service.PipelineId);
          if (this.selectedPipeIndex == -1) {
            this.selectedPipeIndex = 0;
            this.service.PipelineId = this.listofPipeline[this.selectedPipeIndex].PipelineId;
          }
        });
      }
    }
  }
  addServiceCustomField() {
    this.entityType = LeadGenType.Services;
    this.addCustomToggle = true;
  }

  addServicePercentCustomField() {
    this.entityType = LeadGenType.ServicePercentage;
    this.addCustomToggle = true;
  }
  addServiceReqCustomField() {
    this.entityType = LeadGenType.ServiceRequirements;
    this.addCustomToggle = true;
  }
  closeError() {
    this.addCustomToggle = false;
  }
  dataExist(evt) {
    if (evt) {
      this.notyHelper.ShowNoty("Column already exist!");
    }
  }
  saveSuccess(evt) {
    if (evt) {
      this.addCustomToggle = false;
    }
  }
  addServiceCostCustomField() {
    this.entityType = LeadGenType.ServiceCost;
    this.addCustomToggle = true;
  }
  swap() {
    var el1 = this.dragElement;
    var el2 = this.dropElement;
    var parentEment1 = el1.parentElement;
    var parentEment2 = el2.parentElement;
    while (parentEment1.firstChild) {
      parentEment1.removeChild(parentEment1.lastChild);
    }
    parentEment1.appendChild(el2);
    while (parentEment2.firstChild) {
      parentEment2.removeChild(parentEment2.lastChild);
    }
    parentEment2.appendChild(el1);
  }
  drop(ev) {
    console.log("drop");
    console.log(ev);
    ev.preventDefault();
    this.dropElement = ev.target.draggable ? ev.target : ev.target.parentElement;
    this.swap();
    this.rmClass(this.dropElement);
    this.rmClass(this.dragElement);
  }
  dragLeave(ev) {
    ev.preventDefault();
    if (ev.target.draggable) {
      this.rmClass(ev.target);
    }
    else {
      this.rmClass(ev.target.parentElement);
    }

  }
  addClass(elm) {
    var element, name, arr;
    element = elm;
    name = "w3-green w3-center w3-round-large w3-large w3-animate-opacity";
    arr = element.className.split(" ");
    if (arr.indexOf(name) == -1) {
      element.className += " " + name;
    }
  }
  rmClass(elm) {
    elm.className = elm.className.replace(/\bw3-green w3-center w3-round-large w3-large w3-animate-opacity\b/g, "");
  }
  dragOver(ev) {
    ev.preventDefault();
    if (ev.target.draggable) {
      this.addClass(ev.target);
    }
    else {
      this.addClass(ev.target.parentElement);
    }
  }
  drag(ev) {
    console.log("drag");
    console.log(ev);
    this.dragElement = ev.target.draggable ? ev.target : ev.target.parentElement;
  }
  checkValidation(obj) {
    if (obj)
      return obj.invalid && (obj.dirty || obj.touched);
    else
      return false;
  }
  checkReqValidation(obj) {
    if (obj)
      return obj.invalid;
    else
      return false;
  }
  sortBy(prop: string) {
    return this.listofPipeline ? this.listofPipeline.sort((a, b) => a[prop] > b[prop] ? 1 : a[prop] === b[prop] ? 0 : -1) : [];
  }

  addNewFunnel() {
    this.navigate('pipelinemodal', true);
  }
  noAllowDrop(ev) {
    ev.stopPropagation();
  }
  navigate(path, ismodel) {
    if (ismodel) {
      this.modalService.show(null);
      this.router.navigate([{ outlets: { modal: [path] } }]);
    }
    else {
      this.router.navigate(['/' + path]);
    }
  }

  saveService() {
    if (!this.service.LeadId || !this.service.SecurityGroup || !this.service.PipelineGroupId) {
      this.notyHelper.ShowNoty("Please fill all required fields");
    }
    //if (this.reasonNotes && !this.lead.CancelReason) {
    //  this.notyHelper.ShowNoty("Please enter the reason");
    //}
    else {
      this.isSaveDisabled = true;
      this.jobService.saveService(this.service).subscribe(data => {
        if (data) {
          this.service = data;
          if (this.contactInformations.length > 0) {
            for (let i = 0; i < this.contactInformations.length; i++) {
              this.contactInformations[i].EntityId = data.Id;
              this.contactInformations[i].Type = this.entityType;
            }
            this.contactService.SaveContactInfos(this.contactInformations).subscribe(data => { }, err => { }, () => { });
          }
          this.CustomFieldSection.forEach(x => {
            x.SaveCustomFieldValues(data.Id);
          });
          this.getContactInformation(LeadGenType.Services, this.service.Id);
          var patient = this.lstLeads.find(x => x.LeadId == this.service.LeadId);
          var practice = this.lstOpportunities.find(x => x.DealId == this.service.DealId);
          if (patient && practice) {
            let content = {
              "name": 'Documents',
              "folder": {},
              "@microsoft.graph.conflictBehavior": "rename"
            }
            var selectedDate = this.service.StartDate;
            var appDate = formatDate(selectedDate, 'yyyy-MM-dd', 'en-US');
            this.CreateAppointmentFolder(content, practice.DealName, appDate, patient.LeadName + "_" + patient.BatchNumber, this.loggedUser.User.FirstName+ " " +this.loggedUser.User.LastName);
            //this.CustomFieldSection.SaveCustomFieldValues(data.DealId);
          }
          this.notyHelper.ShowNoty("Data saved successfully !!!");
          this.isSaveDisabled = false;
          //this.router.navigate(['/listdeals']);
        }
      }, err => {

      }, () => { });
    }
  }

  CreateAppointmentFolder(content: any, practiceName, appDate, patientName, userName) {
    let status = this.graphService.checkIfAppointmentFolderExist(content, practiceName, appDate, patientName, userName);
    //if (status == 'itemNotFound') {
    //  this.graphService.CreatePatientAppointmentDirectory(content, appointmentNo);
    //}
  }

  getCustomFieldType() {
    this.customFieldService.getCustomFieldType().subscribe(data => {
      if (data != null) {
        this.dbPropertyTypes = data;
      }
    }, err => { }, () => { });
  }
  
}
