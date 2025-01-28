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
import { GraphService } from '../officeauth/graph.service';
import { Onedriveconfig } from '../helper/onedriveconfig';
import { Templatelist } from '../model/templatelist';
import { AppointmentForms } from '../model/AppointmentForms';
import { AppointmentFormsMapping } from '../model/AppointmentFormsMapping';
import { BasicformService } from '../basicform/basicform.service';
import { TemplateService } from '../template/template.service';
import { DomSanitizer } from '@angular/platform-browser';
import { VoiceToTextService } from '../voice-to-text/voice-to-text.service';
import SignaturePad from 'signature_pad';
import { Template, TemplateStatus } from '../model/template';
import jsPDF from 'jspdf';
import * as moment from 'moment';

@Component({
  selector: 'app-addservice',
  templateUrl: './addservice.component.html',
  styleUrls: ['./addservice.component.css']
})
export class AddserviceComponent implements OnInit {
  @ViewChildren(CustomsectionComponent) public CustomFieldSection: QueryList<CustomsectionComponent>;
  constructor(public leadService: AddleadsService, public addUserService: AdduserService, public jobService: JobService, public addGroupService: AddgroupService, private notesService: NotesinfoService, private customFieldService: CustomFieldsService, private contactService: ContactinformationService, private router: Router, private dataShared: Datashared, private userService: UsersService, private notyHelper: NotyHelper, public modalService: ModalService, public listDealService: ListdealsService, private graphService: OnedrivegraphService, public addeventService: AddeventService, public msalService: GraphService, private graph: GraphService, public basicFormService: BasicformService, public templateService: TemplateService, private sanitizer: DomSanitizer, private speechService: VoiceToTextService) { }
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
  activeContainer: string = 'patientforms';
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
  public deal: Deal;
  public lead: Lead;
  public lstAppointmentForms: Array<AppointmentForms> = [];
  public appointmentforms: AppointmentForms = new AppointmentForms();
  public appointmentFormsMapping: AppointmentFormsMapping = new AppointmentFormsMapping();
  public isForm: boolean = false;
  public isLeadForm: boolean = false;
  public isOpen: boolean = false;
  public lstTemplate: Array<Templatelist> = [];
  public templateId: number;
  strSelectedTemplate: string = '';
  selectedTemplatePage: any = '';
  selectedTemplateHtml: any = '';
  selectedTemplateName: string = '';
  public isTemplate: boolean = false;
  currentCtrl: HTMLInputElement;
  signaturePad: any;
  selectedAppointment: any;
  loggedUserData: Users = new Users();
  image: any;
  previewHtml: any = '';
  isPreview: boolean = false;
  template: Template = new Template();
  show = false;
  appointmentId: number = 0;
  public digiSign: string = "";

  ngOnInit() {
    this.getTemplateFormsList();
    this.service.DealId = 0;
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
    this.getAllAppointmentForms();
    let service = new Services();
    service = this.dataShared.getValue();
    if (service) {
      this.getServiceById(service.Id);
      this.getLeadDetailsById(service.LeadId);
      this.getDealDetailsById(service.DealId);
      this.disableLead = true;
      this.activeContainer = 'patientforms';

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
      this.setCurrentDateTime(1);
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
    this.service.SecurityGroupId = opportunity.SecurityGroupId;
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
        if (!this.service.SecurityGroupId || this.service.SecurityGroupId < 1) {
          if (this.lstGroups.length > 0) {
            var adminGroup = this.lstGroups.find(x => x.Name == "admin");
            if (adminGroup) {
              this.service.SecurityGroupId = adminGroup.UserGroupId;
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
            this.firstLetter = "AP";
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
      var firstName = this.lstLeads.find(x => x.LeadId == id).LeadName;
      var lastName = this.lstLeads.find(x => x.LeadId == id).PatientLastName;
      var leadName = firstName +" "+ lastName;
      if (leadName == null) {
        leadName = this.lstLeads.find(x => x.LeadId == id).LeadName;
      }
      return leadName;
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
  calendarFormatDate(date) {
    if (date) {
      if (Object.prototype.toString.call(date) === "[object Date]")
        return date.getFullYear() + '-' + (date.getMonth() < 10 ? ('0' + (date.getMonth() + 1)) : date.getMonth() + 1) + '-' + (date.getDate() < 10 ? ('0' + (date.getDate())) : (date.getDate())) + 'T' + (date.getHours() < 10 ? ('0' + date.getHours()) : date.getHours()) + ':' + (date.getMinutes() < 10 ? ('0' + date.getMinutes()) : date.getMinutes());
      else {
        let clonedDate = new Date(date);
        return clonedDate.getFullYear() + '-' + (clonedDate.getMonth() < 10 ? ('0' + (clonedDate.getMonth() + 1)) : clonedDate.getMonth() + 1) + '-' + (clonedDate.getDate() < 10 ? ('0' + (clonedDate.getDate())) : (clonedDate.getDate())) + 'T' + (clonedDate.getHours() < 10 ? ('0' + clonedDate.getHours()) : clonedDate.getHours()) + ':' + (clonedDate.getMinutes() < 10 ? ('0' + clonedDate.getMinutes()) : clonedDate.getMinutes());
      }
      //return returnDate;
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
  FormatDateTime(date) {
    if (date) {
      if (Object.prototype.toString.call(date) === "[object Date]")
        return date.getFullYear() + '-' + (date.getMonth() < 10 ? ('0' + (date.getMonth() + 1)) : date.getMonth() + 1) + '-' + (date.getDate() < 10 ? ('0' + (date.getDate())) : (date.getDate())) + 'T' + (date.getHours() < 10 ? ('0' + date.getHours()) : date.getHours()) + ':' + (date.getMinutes() < 10 ? ('0' + date.getMinutes()) : date.getMinutes());
      else {
        let clonedDate = new Date(date);
        return clonedDate.getFullYear() + '-' + (clonedDate.getMonth() < 10 ? ('0' + (clonedDate.getMonth() + 1)) : clonedDate.getMonth() + 1) + '-' + (clonedDate.getDate() < 10 ? ('0' + (clonedDate.getDate())) : (clonedDate.getDate())) + 'T' + (clonedDate.getHours() < 10 ? ('0' + clonedDate.getHours()) : clonedDate.getHours()) + ':' + (clonedDate.getMinutes() < 10 ? ('0' + clonedDate.getMinutes()) : clonedDate.getMinutes());
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
  //setCurrentDateTime() {
  //  if (this.service.Id > 0) { }
  //  else { this.service.StartDate = new Date(); }
  //}
  setCurrentDateTime(type) {
    if (type == 2) {
      if (!this.service.StartDate) {
        this.service.StartDate = new Date();
      }
    }
    else {
      if (!this.service.StartDate) {
        this.setScheduleDates();
      }
    }
  }
  setScheduleDates() {
    let startDate = new Date();
    let startDateClone = startDate;
    let endDate = new Date();
    let endDateCloned = endDate;
    endDateCloned.setMinutes(endDate.getMinutes() + 60);
    this.service.StartDate = startDateClone;
    this.service.EndDate = endDateCloned;
    
    
  }

  convertDateWithoutTimeZone(date: Date) {
    var momentObj = moment(date, 'YYYY-MM-DDLT');
    var startTime = momentObj.format('YYYY-MM-DDTHH:mm:ss');
    return new Date(startTime + 'Z');
    //return job;


    //let startDate = new Date().toISOString();
    //var momentObj = moment(startDate, "YYYY-MM-DDLT");
    //var startTime = momentObj.format('YYYY-MM-DDTHH:mm:ss');
    //this.service.StartDate = new Date(startTime + 'Z');
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
    if (!this.service.LeadId || !this.service.SecurityGroupId || !this.service.PipelineGroupId || !this.service.StartDate) {
      this.notyHelper.ShowNoty("Please fill all required fields");
    }
    //if (this.reasonNotes && !this.lead.CancelReason) {
    //  this.notyHelper.ShowNoty("Please enter the reason");
    //}
    else {
      this.isSaveDisabled = true;
      if (!this.service.Id) {
        this.getDealAndLeadById(this.service.DealId, this.service.LeadId);
      }
      this.service.StartDate = this.convertDateWithoutTimeZone(this.service.StartDate);
      this.service.EndDate = this.convertDateWithoutTimeZone(this.service.EndDate);
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
          this.getServiceById(this.service.Id);
          //var patient = this.lstLeads.find(x => x.LeadId == this.service.LeadId);
          //var practice = this.lstOpportunities.find(x => x.DealId == this.service.DealId);
          //if (patient && practice) {
          //  let content = {
          //    "name": 'Documents',
          //    "folder": {},
          //    "@microsoft.graph.conflictBehavior": "rename"
          //  }
          //  var selectedDate = this.service.StartDate;
          //  var appDate = formatDate(selectedDate, 'yyyy-MM-dd', 'en-US');
          //  /*this.CreateAppointmentFolder(content, practice.DealName, appDate, patient.LeadName + "_" + patient.BatchNumber, this.loggedUser.User.FirstName+ " " +this.loggedUser.User.LastName);*/
          //  //this.CustomFieldSection.SaveCustomFieldValues(data.DealId);
          //}
          this.notyHelper.ShowNoty("Data saved successfully !!!");
          this.appointmentFormsMapping.AppointmentFormsId;
          this.appointmentFormsMapping.AppointmentId = this.service.Id;
          this.jobService.saveAppointmentFormsMapping(this.appointmentFormsMapping).subscribe(data => { }, err => { }, () => { });
          this.appointmentforms.Id = 1;
          this.appointmentforms.Name = "PatientForms"
          this.jobService.saveAppointmentFormsSelected(this.appointmentforms).subscribe(data => { }, err => { }, () => { });
          let baseUrl = window.location.origin;
          //let urlDomain = baseUrl.replace('https://', '');
          let urlDomain = "medicalassociates.healthinformation.network";
          var Name = this.lead.LeadName + this.lead.PatientLastName;
          var generatePassword = this.createRandomGenerate();
          const UserName = { accountEnabled: true, city: this.lead.City, country: this.lead.Country, department: 'Medical', displayName: Name, givenName: Name, jobTitle: 'Patient', mailNickname: Name, passwordPolicies: 'DisablePasswordExpiration', passwordProfile: { password: generatePassword, forceChangePasswordNextSignIn: true }, officeLocation: this.lead.Address, postalCode: this.lead.ZipCode, preferredLanguage: 'en-US', state: this.lead.State, streetAddress: this.lead.Address, surname: Name, mobilePhone: this.lead.CellNumber, usageLocation: 'US', userPrincipalName: this.lead.UserName + '@' + urlDomain };
          this.graph.PostUser(UserName).then(x => {
            var mail = {
              message: {
                subject: 'HIN-Account Details',
                body: {
                  contentType: 'Html',
                  content: `<div style=\"width:100%;\">\r\n<p style=\"font-family:Arial;font-weight:bold;font-size:18px;color:gray\">HIN Account</p>\r\n<h1 style=\"color:cornflowerblue;font-family:Arial;font-weight:normal\"> Account Details </h1>\r\n<p style=\"font-family:Arial\">Please use the following account details to access your HIN account</p>\r\n<p style=\"font-family:Arial\">UserName : ${UserName.userPrincipalName}</p>\r\n<p style=\"font-family:Arial\">Password : ${generatePassword}</p>\r\n<p style=\"font-family:Arial\">URL : ${baseUrl}</p>\r\n<div style=\"font-family:Arial\">Thanks,</div>\r\n<div style=\"font-family:Arial\">HIN Team</div>\r\n</div>`
                },
                toRecipients: [
                  {
                    emailAddress: {
                      address: this.lead.EmailAddress
                    }
                  }
                ],
                ccRecipients: [
                  {
                    emailAddress: {
                      address: this.lead.EmailAddress
                    }
                  }
                ]
              },
              saveToSentItems: 'true'
            };
            this.graph.sendMail(mail);

          }, err => {
            //if (err.message == 'Another object with the same value for property userPrincipalName already exists.') {
            //  var mail = {
            //    message: {
            //      subject: 'HIN-Account Details',
            //      body: {
            //        contentType: 'Html',
            //        content: `<div style=\"width:100%;\">\r\n<p style=\"font-family:Arial;font-weight:bold;font-size:18px;color:gray\">HIN Account</p>\r\n<h1 style=\"color:cornflowerblue;font-family:Arial;font-weight:normal\"> Account Details </h1>\r\n<p style=\"font-family:Arial\">Please use the following account details to access your HIN account</p>\r\n<p style=\"font-family:Arial\">UserName : ${UserName.userPrincipalName}</p>\r\n<p style=\"font-family:Arial\">Password : Test@123</p>\r\n<p style=\"font-family:Arial\">URL : ${baseUrl}</p>\r\n<div style=\"font-family:Arial\">Thanks,</div>\r\n<div style=\"font-family:Arial\">HIN Team</div>\r\n</div>`
            //      },
            //      toRecipients: [
            //        {
            //          emailAddress: {
            //            address: this.lead.EmailAddress
            //          }
            //        }
            //      ],
            //      ccRecipients: [
            //        {
            //          emailAddress: {
            //            address: this.lead.EmailAddress
            //          }
            //        }
            //      ]
            //    },
            //    saveToSentItems: 'true'
            //  };
            //  this.graph.sendMail(mail);
            //}
            //else {
            //  err => { };
            //}
          });

         

          this.isSaveDisabled = false;
          //this.router.navigate(['/listdeals']);
        }
      }, err => {

      }, () => { });
    }
  }

  createRandomGenerate() {
    var password = Array(10).fill("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz~!@-#$").map(function (x) { return x[Math.floor(Math.random() * x.length)] }).join('');
    return password;
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

  //getDealById(id) {
  //  this.jobService.getDealDetails(id).subscribe(data => {
  //    if (data) {
  //      this.deal = data;
  //    }
  //  });
  //}

  //getLeadById(id) {
  //  this.jobService.getLeadDetails(id).subscribe(data => {
  //    if (data) {
  //      this.lead = data;
  //    }
  //  });
  //}

  getDealAndLeadById(dealId, leadId) {
    this.jobService.getDealAndLead(dealId, leadId).subscribe(data => {
      if (data) {
        this.deal = data.Item1;
        this.lead = data.Item2;
        let urlDomain = "medicalassociates";
        let patientName = this.lead.LeadName + '_' + this.lead.PatientLastName + '_' + this.lead.LeadNumber;
        var appointmentDate = formatDate(this.service.StartDate, 'yyyy-MM-dd', 'en-US');
        let content = {
          "name": patientName,
          "folder": {},
          "@microsoft.graph.conflictBehavior": "rename"
        }
        this.msalService.CreateFolder(Onedriveconfig.graphV1Url + 'drive/root:/' + urlDomain + '/' + this.deal.DealName + '/' + appointmentDate
          + ':/children', content);
       
      }
    }, err => { }, () => { });

  }

  

  getAllAppointmentForms() {
    this.jobService.getAppointmentForms().subscribe(data => {
      if (data) {
        this.lstAppointmentForms = data;
      }
    });
  }

  editForms(data, evt) {
    this.appointmentFormsMapping.AppointmentFormsId = data.Id;
    this.appointmentFormsMapping.AppointmentId = this.service.Id;
  }

  OpenForms(service) {
    this.basicFormService.getPatientDetail(service.Id).subscribe(data => {
      if (data) {
        this.isForm = true;
      }
      //else {
      //  this.isLeadForm = true;
      //}
      
    });
  }

  

  selectForms(evt) {
    this.appointmentforms.IsSelected = evt.target.checked;
    this.service.IsPatientFormSelected = evt.target.checked;
  }

  getTemplateFormsList() {
    this.leadService.getTemplateList().subscribe(data => {
      if (data) {
        this.lstTemplate = data;
      }
    });
  }

  editTemplate(data) {
    this.templateId = data.Id;
    this.loadTemplatePage(this.templateId);
    
  }

  loadTemplatePage(templateId) {
    if (this.templateId) {
      this.templateService.getTemplatePageById(this.templateId).subscribe(_data => {
        if (_data) {
          this.strSelectedTemplate = _data.templatePage;
          console.log(this.strSelectedTemplate);
          this.selectedTemplatePage = this.sanitizer.bypassSecurityTrustHtml(_data.templatePage ? _data.templatePage : '');
          this.selectedTemplateHtml = _data.templateHtml ? _data.templateHtml : '';
          this.selectedTemplateName = _data.templateName ? _data.templateName : '';
          this.isTemplate = true;
          setTimeout(() => {
            this.bindStartButtonEvent();
            this.bindStopButtonEvent();
            this.bindSignatureAdd();
            this.bindSignatureClear();
            this.bindLoadSignature();
            this.bindDefaultValues();
            this.bindTextFocusoutEvent();
            this.isOpen = false;
          }, 500);
        }
        else {
          this.selectedTemplatePage = '';
          this.selectedTemplateHtml = '';
        }
      }, _error => { console.log(_error); }, () => { });
    }
  }

  bindPreviewHTML(html) {
    if (html) {
      let safeHTML = this.sanitizer.bypassSecurityTrustHtml(html);
      return safeHTML;
    }
  }

  bindStartButtonEvent() {
    var buttons = document.getElementsByClassName('app-speech-input-btn');
    if (buttons && buttons.length > 0) {
      for (var i = 0; i < buttons.length; i++) {
        var button = buttons[i] as HTMLButtonElement;
        button.addEventListener('click', this.voiceToText.bind(this));
      }
    }
  }

  voiceToText(evt: any) {
    if (evt) {
      this.speechService.init(document);
      var targetElementId = evt.target.name;
      if (targetElementId) {
        var txtCtrl = document.getElementById(targetElementId) as HTMLInputElement;
        txtCtrl.focus();
        txtCtrl.style.borderColor = "red";
        this.currentCtrl = txtCtrl;
        let currentCtrlIndex = parseInt(this.currentCtrl.getAttribute('tabindex'));
        var stopButton = document.getElementsByName(targetElementId + "_stop")[0];
        if (stopButton) {
          stopButton.style.display = 'block';
          evt.target.style.display = 'none';
        }
        this.speechService.counter = currentCtrlIndex;
        this.speechService.startAllDictation();
        this.speechService.speechInput().subscribe(data => {
          //this.currentCtrl.value = data;
        }, err => { }, () => { });
      }
      else {
        this.currentCtrl = null;
      }
    }
  }

  bindStopButtonEvent() {
    var buttons = document.getElementsByClassName('app-speech-stop-btn');
    if (buttons && buttons.length > 0) {
      for (var i = 0; i < buttons.length; i++) {
        var button = buttons[i] as HTMLButtonElement;
        button.addEventListener('click', this.stopVoiceToText.bind(this));
      }
    }
  }

  stopVoiceToText(evt: any) {
    var targetElementId = evt.target.name;
    var startElementId = targetElementId.replace('_stop', '');
    var txtCtrl = document.getElementById(startElementId) as HTMLInputElement;
    this.currentCtrl = txtCtrl;
    let currentCtrlIndex = parseInt(this.currentCtrl.getAttribute('tabindex'));
    if (targetElementId && startElementId) {
      var startButton = document.getElementsByName(startElementId)[0];
      if (startButton) {
        startButton.style.display = 'block';
        evt.target.style.display = 'none';
      }
      this.speechService.counter = currentCtrlIndex;
      this.speechService.stopAllDictation();
      this.ResetInputBorderColor();
    }
  }

  ResetInputBorderColor() {
    document.querySelectorAll('[tabindex]').forEach((ctrl: HTMLInputElement) => {
      if (ctrl)
        ctrl.style.borderColor = "#999";
    });
  }
  bindSignatureAdd() {
    var canvas = document.getElementById('signatureCtrl');
    if (canvas) {
      var cns = canvas as HTMLCanvasElement;
      this.loadSignaturePad(cns);
      cns.addEventListener('click', this.selectSignature.bind(this));

    }
  }
  loadSignaturePad(ele: any): void {
    this.signaturePad = new SignaturePad(document.getElementById('signatureCtrl') as HTMLCanvasElement, {
      backgroundColor: 'rgba(255, 255, 255, 0)',
      penColor: 'rgb(0, 0, 0)'
    });
  }

  selectSignature() {
    this.image = "";
    const dataURL = this.signaturePad.toDataURL();
    //const parts = dataURL.split(';base64,');
    this.image = dataURL;
  }
  bindSignatureClear() {
    var button = document.getElementById('signatureClear');
    if (button) {
      var btn = button as HTMLButtonElement;
      btn.addEventListener('click', this.clear.bind(this));
    }
  }
  clear() {
    this.signaturePad.clear();
    this.setTextControlValue("emailSignature","");
  }
  bindLoadSignature() {
    var button = document.getElementById('loadSignature');
    if (button) {
      var btn = button as HTMLButtonElement;
      btn.addEventListener('click', this.loadSignature.bind(this));
    }
  }

  loadSignature() {
    if (this.loggedUser && this.loggedUser.User && this.loggedUser.User.Signature) {
      this.signaturePad = new SignaturePad(document.getElementById('signatureCtrl') as HTMLCanvasElement, {
        backgroundColor: 'rgba(255, 255, 255, 0)',
        penColor: 'rgb(0, 0, 0)'
      });
      this.signaturePad.fromDataURL("data:image/png;base64," + this.loggedUser.User.Signature);
      this.setTextControlValue("emailSignature", this.loggedUser.User.EmailSignature);
      setTimeout(() => {
        this.selectSignature();
      }, 500);
    }
  }

  bindDefaultValues() {
    if (this.strSelectedTemplate && this.lead) {
      this.setTextControlValue("patientName", this.lead.LeadName);
      this.setTextControlValue("patientDob", this.GetDateStringFormat('YMD', this.lead.Dob, "-"));
      this.setTextControlValue("patientAge", this.lead.Age);
      this.setTextControlValue("patientOccupation", this.lead.Occupation);
      this.setTextControlValue("name1", this.lead.LeadName);
      this.setTextControlValue("name2", this.lead.LeadName);
      this.setTextControlValue("lastName", this.lead.PatientLastName);
      var appointmentDate = formatDate(this.service.StartDate, 'yyyy-MM-dd', 'en-US');
      this.setTextControlValue("ie_appointmentDate", appointmentDate);
      if (this.lead.GenderId == 1) {
        this.setTextControlValue("gender", 'Male');
      }
      else {
        this.setTextControlValue("gender", 'Female');
      }
      

    }
    return;
  }
  GetDateStringFormat(startType: string, date: any, splitter: string) {
    let oDate = new Date(date);
    if (oDate) {
      switch (startType) {
        case 'MDY':
          return ("0" + (oDate.getMonth() + 1)).slice(-2) + splitter + ("0" + oDate.getDate()).slice(-2) + splitter + oDate.getFullYear();
        case 'DMY':
          return ("0" + oDate.getDate()).slice(-2) + splitter + ("0" + (oDate.getMonth() + 1)).slice(-2) + splitter + oDate.getFullYear();
        case 'YMD':
          return oDate.getFullYear() + splitter + ("0" + (oDate.getMonth() + 1)).slice(-2) + splitter + ("0" + oDate.getDate()).slice(-2);
        default:
          return ("0" + oDate.getDate()).slice(-2) + splitter + ("0" + (oDate.getMonth() + 1)).slice(-2) + splitter + oDate.getFullYear();
      }
    }
  }
  setTextControlValue(strId, val) {
    var txtCtrl = document.getElementById(strId) as HTMLInputElement;
    if (txtCtrl)
      txtCtrl.value = val;
  }

  bindTextFocusoutEvent() {
    var textCtrls = document.querySelectorAll('[control-type="text"]');
    if (textCtrls && textCtrls.length > 0) {
      for (var i = 0; i < textCtrls.length; i++) {
        var ctrl = textCtrls[i] as HTMLInputElement;
        ctrl.addEventListener('focusout', this.assignCtrlTextValue.bind(this));
      }
    }
  }

  assignCtrlTextValue(evt: any) {
    var txtValue = evt.target.value;
    var txtElem = evt.target as HTMLInputElement;
    if (txtElem && txtElem.type === 'textarea') {
      txtElem.innerText = txtValue;
    }
    else {
      txtElem.value = txtValue;
    }
  }
  closeTemplateHtmlOpen() {
    this.isTemplate = false;
  }

  previewTemplate(templateId) {
    if (templateId) {
      this.previewHtml = this.selectedTemplateHtml;
      this.getFormControlValues();
      this.isPreview = true;
    }
  }

  getFormControlValues() {
    let formControls = document.querySelectorAll('[binding="true"]');
    formControls.forEach(ctrl => {
      let controlType = ctrl.getAttribute('control-type');
      switch (controlType) {
        case 'text':
          let textControl = ctrl as HTMLInputElement;
          let idText = textControl.id;
          let textValue = textControl.value;
          this.previewHtml = this.previewHtml.replace('{#' + idText + '}', textValue);
          break;
        case 'radio':
          let rdoControl = ctrl as HTMLInputElement;
          if (rdoControl.checked) {
            let rdoName = rdoControl.name;
            let rdoValue = rdoControl.value;
            this.previewHtml = this.previewHtml.replace('{#' + rdoName + '}', rdoValue);
          }
          break;
        case 'checkbox':
          let chkControl = ctrl as HTMLInputElement;
          let chkControlName = chkControl.name;
          if (chkControl.checked == true) {
            this.previewHtml = this.previewHtml.replace('selected="{#' + chkControlName + '}"', 'checked="true"');
          }
          else {
            this.previewHtml = this.previewHtml.replace('selected="{#' + chkControlName + '}"', '');
          }
        default:
          break;
      }
      this.previewHtml = this.previewHtml.replace('{#signature}', this.image);
    });
  }
  closePreview() {
    this.isPreview = false;
  }

  saveAsDraft(templateId, appointmentId, draftTemplate: HTMLDivElement) {

    if (templateId && appointmentId) {
      this.getFormControlValues();
      this.template.AppointmentId = appointmentId;
      this.template.TemplateId = templateId;
      this.template.Status = TemplateStatus.Draft;
      this.template.DraftHtml = this.getDraftHtml(draftTemplate.innerHTML);
      setTimeout(() => {
        this.templateService.SaveDraftTemplate(this.template).subscribe(_data => {
          if (_data) {
            this.notyHelper.ShowNoty("Data Saved Successfully.");
          }
        }, err => { console.log(err); }, () => { });
      }, 2000);
    }
  }

  getDraftHtml(html) {
    let formControls = document.querySelectorAll('[binding="true"]');
    formControls.forEach(ctrl => {
      let controlType = ctrl.getAttribute('control-type');
      switch (controlType) {
        case 'text':
          let textControl = ctrl as HTMLInputElement;
          let idText = textControl.id;
          let textValue = textControl.value;
          html = html.replace('{#' + idText + '}', textValue);
          break;
        case 'radio':
          let rdoControl = ctrl as HTMLInputElement;
          if (rdoControl.checked) {
            let rdoName = rdoControl.name;
            let rdoValue = rdoControl.value;
            html = html.replace('{#' + rdoName + '}', rdoValue);
          }
          break;
        case 'checkbox':
          let chkControl = ctrl as HTMLInputElement;
          let chkControlName = chkControl.name;
          if (chkControl.checked == true) {
            html = html.replace('selected="{#' + chkControlName + '}"', 'checked="true"');
          }
          else {
            html = html.replace('selected="{#' + chkControlName + '}"', '');
          }
        default:
          break;
      }
    });
    html = html.replace('{#signature}', this.image);
    return html;
  }

  sendToOneDrive() {

    if (!this.lead) {
      this.notyHelper.ShowNoty("Please select an appointment.");
    }
    else {
      var patientName = this.lead.LeadName + '_' + this.lead.PatientLastName + '_' + this.lead.LeadNumber;
      var appointmentDate = formatDate(this.service.StartDate, 'yyyy-MM-dd', 'en-US');
      var practiceName = this.deal.DealName;
      if (this.previewHtml) {
        this.show = true;
        var result: ArrayBuffer;
        var elementHTML = this.previewHtml;
        var doc = new jsPDF();
        var graphServive = this.graphService;
        var fileName = this.lead.LeadName + "_" + this.lead.LeadNumber + "-" + this.selectedTemplateName;
        /* var appointmentDate = this.getDateStringFormat("YMD", this.lead.CreatedOn, "-");*/
        /*var practiceName = this.lead.CompanyName;*/
        var practiceAddress = this.trimAddress(this.lead.Address);
        var patientNameEmr = this.lead.LeadName + "_" + this.lead.LeadNumber;
        //var patientEmr = this.selectedAppointment.PatientEmr;
        //var templateName = this.selectedTemplateName;
        doc.html(elementHTML, {
          callback: function (doc) {
            // Save the PDF
            result = doc.output("arraybuffer");
            //doc.output("pdfobjectnewwindow");
            //let fileResult = new File([result], "InitialTemplate_1.pdf", { type: "application/pdf" });
            let urlDomain = "medicalassociates";
            let content = {
              "name": fileName + ".pdf",
              "size": result.byteLength,
              "file": result
            }
            /*this.graph.SaveFile(Onedriveconfig.graphV1Url + 'drive/root:/' + urlDomain + '/' + practiceName + '/' + appointmentDate + '/' + patientName + '/Documents' + ':/content', content.name);*/
            graphServive.SaveTemplateForAppointment(content, practiceName, appointmentDate, urlDomain, patientName);
          },
          margin: [5, 5, 5, 5],
          autoPaging: 'text',
          x: 0,
          y: 0,
          width: 150, //target width in the PDF document
          windowWidth: 700 //window width in CSS pixels
        });
        this.show = false;
      }
      this.template.Status = 1;
      this.template.AppointmentId = this.service.Id;
      this.template.TemplateId = this.templateId;
      this.templateService.saveTemplate(this.template).subscribe(data => {
        if (data) {
          this.notyHelper.ShowNoty("Data saved successfully !!!");
          this.notyHelper.ShowNoty("File Sent to Ondrive.");
        }
      }, err => { console.log(err); }, () => { });
      this.notyHelper.ShowNoty("File Sent to Ondrive.");
    }
  }

  trimAddress(str) {
    return this.trim(str, 10);
  }
  trim(str, length) {
    return str.substring(0, length);
  }

  getLeadDetailsById(id) {
    this.jobService.getLeadDetails(id).subscribe(data => {
      if (data) {
        this.lead = data;
      }
    });
  }

  getDealDetailsById(id) {
    this.jobService.getDealDetails(id).subscribe(data => {
      if (data) {
        this.deal = data;
      }
    })
  }

  savePatientForm(appointmentforms) {
    this.jobService.saveAppointmentFormsSelected(appointmentforms).subscribe(data => {
      if (data) {
        this.appointmentforms = data;
      }
    });
  }

  sendEmail() {
    let baseUrl = window.location.origin;
    var appointmentDate = formatDate(this.service.StartDate, 'MM-dd-yyyy', 'en-US');
    var mail = {
      message: {
        subject: 'HIN-Account Details',
        body: {
          contentType: 'Html',
          content: `<div style=\"width:100%;\">\r\n<p style=\"font-family:Arial;font-weight:bold;font-size:18px;color:gray\">HIN Account</p>\r\n<h1 style=\"color:cornflowerblue;font-family:Arial;font-weight:normal\"> Appointment Confirmation </h1>\r\n<p style=\"font-family:Arial;font-size:18px;color:gray\">Your appointment was confirmed.see below for the full details.</p>\r\n<p style=\"font-family:Arial\">Appointment Number : ${this.service.ServiceNumber}</p>\r\n<p style=\"font-family:Arial\">Appointment Date :   ${appointmentDate}</p>\r\n<p style=\"font-family:Arial\">URL : ${baseUrl}</p>\r\n<div style=\"font-family:Arial\">Thanks,</div>\r\n<div style=\"font-family:Arial\">HIN Team</div>\r\n</div>`
        },
        toRecipients: [
          {
            emailAddress: {
              address: this.lead.EmailAddress
            }
          }
        ],
        ccRecipients: [
          {
            emailAddress: {
              address: this.lead.EmailAddress
            }
          }
        ]
      },
      saveToSentItems: 'true'
    };
    this.graph.sendMail(mail).then(x => {
      this.notyHelper.ShowNoty("Email sent successfully")
    }); err => { };
  }
  goToCalendar() {
    this.router.navigate(['/newcalendar']);
  }


}
