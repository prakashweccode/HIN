import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { UserGroups } from '../addgroup/addgroup';
import { AddgroupService } from '../addgroup/addgroup.service';
import { AddleadsService } from '../addleads/addleads.service';
import { AddquoteService } from '../addquote/addquote.service';
import { Assignedtogrid } from '../assignedtogrid/assignedtogrid';
import { Contactinformation } from '../contactinformation/contactinformation';
import { ContactinformationService } from '../contactinformation/contactinformation.service';
import { CustomFieldListItems, CustomProperty, CustomPropertyValues, DbPropertyTypes } from '../custom-fields/custom-fields';
import { CustomFieldsService } from '../custom-fields/custom-fields.service';
import { CustomsectionComponent } from '../customsection/customsection.component';
import { Datashared } from '../helper/datashared';
import { ServiceStatus } from '../helper/dealstatus';
import { LeadGenType } from '../helper/LeadGenType';
import { NotyHelper } from '../helper/NotyHelper';
import { Pipelinegrouptypeid } from '../helper/pipelinegrouptypeid';
import { ListdealsService } from '../listdeals/listdeals.service';
import { ModalService } from '../loader.service';
import { Deal } from '../model/deal';
import { Events } from '../model/event';
import { Lead } from '../model/lead';
import { Pipeline, PipelineGroup } from '../model/pipeline';
import { Referral } from '../model/referral';
import { Services } from '../model/services';
import { NotesInformation } from '../notesinfo/notesinfo';
import { NotesinfoService } from '../notesinfo/notesinfo.service';
import { Users } from '../users/users';
import { UsersService } from '../users/users.service';
import { AddeventService } from './addevent.service';

@Component({
  selector: 'app-addevent',
  templateUrl: './addevent.component.html',
  styleUrls: ['./addevent.component.css']
})
export class AddeventComponent implements OnInit {
  @ViewChildren(CustomsectionComponent) public CustomFieldSection: QueryList<CustomsectionComponent>;
  assignedToGrid: Assignedtogrid = new Assignedtogrid();
  events: Events = new Events();
  UserDetails: Array<Users> = [];
  users: Array<Users> = [];
  public entityNumber: string;
  firstLetter: string = "E";
  public lstGroups: Array<UserGroups> = [];
  lstOpportunities: Array<Deal> = [];
  lstLeads: Array<Lead> = [];
  public entityId: number;
  userId: number;
  public listofPipeline: Array<Pipeline>;
  selectedPipeIndex = 0;
  listPipeLineGroup: Array<PipelineGroup>;
  isSaveDisabled: boolean = false;
  entityTypeId: number;
  entityType: number = LeadGenType.Event;
  addCustomToggle: boolean = false;
  public dbPropertyTypes: Array<DbPropertyTypes> = [];
  customFields: Array<CustomProperty> = [];
  public showListItem: boolean = false;
  public lstCustomFieldListItems: Array<CustomFieldListItems> = [];
  eventType: number = LeadGenType.Event;
  leftEventCustomFieldValues: Array<CustomPropertyValues> = [];
  rightEventCustomFieldValues: Array<CustomPropertyValues> = [];
  activeContainer: string = 'tab1';
  contactInformations: Array<Contactinformation> = [];
  notesInfos: Array<NotesInformation> = [];
  lstAppointment: Array<Services> = [];
  lstReferral: Array<Referral> = [];
  public colorCode: any;
  allUsers: Array<Users> = [];
  //public service: Services = new Services();

  constructor(public notification: NotyHelper, public addeventService: AddeventService, public router: Router, private userService: UsersService, private contactService: ContactinformationService, public addGroupService: AddgroupService, public listDealService: ListdealsService, private leadService: AddleadsService, public dataShared: Datashared, private modalService: ModalService, private customFieldService: CustomFieldsService, private notesService: NotesinfoService, public addQuoteService: AddquoteService) { }

  ngOnInit() {
    this.getUsers();
    this.getAssignedToGridData();
    this.getLastIndentId("E");
    this.getUserGroups();
    this.getAllOpportunities();
    this.getAllLeads();
    this.getAllUsers();
    this.getPipeLineGroup();
    this.colorChange(this.colorCode);
    let eventsData = new Events();
    eventsData = this.dataShared.getValue();
    if (eventsData) {
      this.events = eventsData;
      this.getEventById(this.events.Id);
      this.entityId = this.events.Id;
      this.entityNumber = this.events.EventNumber;
      this.getContactInformation(LeadGenType.Event, this.events.Id);
      this.LoadNotes(this.events.Id, LeadGenType.Event);
      this.getAllEventAppointment(this.events.Id);
      this.getAllEventReferral(this.events.Id);
    }
    else {
      this.events.Owner = this.userId;
      this.getLastIndentId(this.firstLetter);
    }
    var pipelineData = this.dataShared.getPipelineValue();
    if (pipelineData) {
      this.events.PipelineGroupId = pipelineData.pipelineGroupId;
      this.events.PipelineId = pipelineData.pipeline.PipelineId;
      this.getPipeLineByPipeLineGroupId(this.events.PipelineGroupId);
    }
    this.events.PaperworkCompletion = 2;
  }

  getPipeLineByPipeLineGroupId(id) {
    if (id == -1) {
      this.addNewFunnel();
    } else {
      if (id != null) {
        this.listDealService.getPipeLineByPipeLineGroupId(id).subscribe(data => {
          this.listofPipeline = data;
          this.listofPipeline = this.sortBy('DisplayOrder');
          this.selectedPipeIndex = this.listofPipeline.findIndex(x => x.PipelineId == this.events.PipelineId);
          if (this.selectedPipeIndex == -1) {
            this.selectedPipeIndex = 0;
            this.events.PipelineId = this.listofPipeline[this.selectedPipeIndex].PipelineId;
          }
        });
      }
    }

  }
  getPipeLineGroup() {
    this.listDealService.getPipeLineGroup().subscribe(data => {
      this.listPipeLineGroup = data.filter(x => x.PipelineGroupType == Pipelinegrouptypeid.Event);
    });
  }

  sortBy(prop: string) {
    return this.listofPipeline ? this.listofPipeline.sort((a, b) => a[prop] > b[prop] ? 1 : a[prop] === b[prop] ? 0 : -1) : [];
  }
  noAllowDrop(ev) {
    ev.stopPropagation();
  }
  addNewFunnel() {
    this.navigate('pipelinemodal', true);
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

  saveEvent(events) {
    if (!this.events.EventName || !this.events.SecurityGroupId || !events.PipelineGroupId) {
      this.notification.ShowNoty("Please fill required field");
    }
    //if (this.reasonNotes && !this.lead.Reason) {
    //  this.notyHelper.ShowNoty("Please enter the reason");
    //}
    else {
      this.addeventService.saveEvent(events).subscribe(data => {
        if (data) {
          this.events = data;
          if (this.contactInformations.length > 0) {
            for (let i = 0; i < this.contactInformations.length; i++) {
              this.contactInformations[i].EntityId = data.DealId;
              this.contactInformations[i].Type = this.entityType;
            }
            this.contactService.SaveContactInfos(this.contactInformations).subscribe(data => { }, err => { }, () => { });
            //this.CustomFieldSection.SaveCustomFieldValues(data.DealId);
          }
          this.CustomFieldSection.forEach(x => { x.SaveCustomFieldValues(this.events.Id) });
          this.getContactInformation(LeadGenType.Event, this.events.Id);
          this.notification.ShowNoty("Save Successfully");
          this.isSaveDisabled = false;
        }
        else {
          this.notification.ShowNoty("Error Occured");
        }
      });
    }
  }

  cancel() {
    this.router.navigate(['/listevent']);
  }

  addEvent() {
    this.router.navigate(['/addevent']);
  }

  getUsers() {
    this.userService.getUsers().subscribe(data => {
      this.users = data;
    });
  }
  getAssignedToGridData() {
    this.assignedToGrid.ApiUrl = "/api/Users/GetUsers";
    this.assignedToGrid.AssignedToId = this.events.Owner;
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
  getEventById(id) {
    this.addeventService.getEventById(id).subscribe(data => {
      if (data) {
        this.events = data;
        this.getAssignedToGridData();
        if (this.events.Id) {
          this.entityNumber = this.events.EventNumber;
        }
        if (this.events.PipelineGroupId > 0) {
          this.getPipeLineByPipeLineGroupId(this.events.PipelineGroupId);
        }
      }
    });
  }
  getLastIndentId(firstLetter) {
    this.contactService.getNewEntityId('Event', firstLetter).subscribe(data => {
      if (data) {
        this.events.EventNumber = data.EntityNumber;
      }
    }, err => { }, () => { });
  }
  selectAssignedValue(evt) {
    this.events.Owner = evt.UserId;
  }
  getUserGroups() {
    this.addGroupService.GetUserGroups().subscribe(data => {
      if (data) {
        this.lstGroups = data;
        if (!this.events.SecurityGroupId || this.events.SecurityGroupId < 1) {
          if (this.lstGroups.length > 0) {
            var adminGroup = this.lstGroups.find(x => x.Name == "admin");
            if (adminGroup) {
              this.events.SecurityGroupId = adminGroup.UserGroupId;
            }
          }
        }
      }
    }, err => {

    });
  }
  getAllOpportunities() {
    this.listDealService.getAllOpportunity().subscribe(data => {
      if (data) {
        this.lstOpportunities = data;
      }
    }, err => { }, () => { });
  }
  getAllLeads() {
    this.leadService.getAllLeads().subscribe(data => {
      if (data) {
        this.lstLeads = data;
      }
    }, err => { }, () => { });
  }
  selectedOpportunityStatus(evt) {
    if (evt) {
      this.events.StatusId = evt;
    }
  }
  chageEventType(evt) {
    if (evt) {
      this.events.EventType = evt;
    }
  }

  chageEventPaperwork(evt) {
    if (evt) {
      this.events.PaperworkCompletion = evt;
    }
  }
  colorChange(colorCode) {
    if (this.events.PaperworkCompletion == 1) {
      this.events.Color = "#37f901";
    }
    else {
      this.events.Color = "#ebfb09";
    }
    //this.events.Color = colorCode;
  }

  changeEstimateDateFormat(date) {
    if (date) {
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
  addEventCustomField() {
    this.entityType = LeadGenType.Event;
    this.addCustomToggle = true;
  }
  closeError() {
    this.addCustomToggle = false;
  }

  getCustomFieldType() {
    this.customFieldService.getCustomFieldType().subscribe(data => {
      if (data != null) {
        this.dbPropertyTypes = data;
      }
    }, err => { }, () => { });
  }

  dataExist(evt) {
    if (evt) {
      this.notification.ShowNoty("Column already exist!");
    }
  }

  saveSuccess(evt) {
    if (evt) {
      this.addCustomToggle = false;
    }
  }

  getContactInformation(entityType, entityId) {
    this.contactService.getContactInformation(entityType, entityId, false).subscribe(data => {
      if (data != null)
        this.contactInformations = data;
    }, err => { }, () => { });
  }
  LoadNotes(entityId, entityTypeId) {
    this.notesService.LoadNotes(entityId, entityTypeId).subscribe(data => {
      if (data) {
        this.notesInfos = data;
      }
    }, err => { }, () => { });
  }
  getPatientName(id) {
    if (id && this.lstLeads.length > 0) {
      var patient = this.lstLeads.find(x => x.LeadId == id);
      if (patient) {
        return patient.LeadName;
      }
    }
  }
  getPatientNumber(id) {
    if (id && this.lstLeads.length > 0) {
      var patient = this.lstLeads.find(x => x.LeadId == id);
      if (patient) {
        return patient.LeadNumber;
      }
    }
  }
  editPatientModal() {
    this.dataShared.setValue(this.lstLeads.find(x => x.LeadId == this.events.PatientBatchNumber));
    this.navigate('addleadsmodal', true);
  }
  editPatientNumberModal() {
    this.dataShared.setValue(this.lstLeads.find(x => x.LeadId == this.events.PatientBatchNumber));
    this.navigate('addleadsmodal', true);
  }

  addNewAppointment(events) {
    this.dataShared.setEventValue(events);
    this.navigate('addservicemodal', true);
  }
  getAllEventAppointment(eventId) {
    if (eventId) {
      this.addeventService.getAllEventAppointment(eventId).subscribe(data => {
        if (data) {
          this.lstAppointment = data;
        }
      }, err => { }, () => { });
    }
  }
  getServiceStatusById(id) {
    return ServiceStatus[id];
  }

  addNewReferral() {
    this.dataShared.setEventId(this.events.Id);
    this.navigate('addreferralmodal', true);
  }
  getAllEventReferral(eventId) {
    if (eventId) {
      this.addeventService.getAllEventReferral(eventId).subscribe(data => {
        if (data) {
          this.lstReferral = data;
        }
      }, err => { }, () => { });
    }
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
  getAssignedNameById(userId) {
    if (userId) {
      var user = this.allUsers.find(x => x.UserId == userId);
      if (user) {
        return user.FirstName;
      }
      else {
        return "";
      }
    }
    else {
      return "";
    }
  }

  getAllUsers() {
    this.userService.getUsers().subscribe(data => {
      this.allUsers = data;
    });
  }

}
