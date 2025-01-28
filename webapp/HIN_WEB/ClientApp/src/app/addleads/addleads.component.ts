import { Component, OnInit, ViewChild, QueryList, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { Users } from '../users/users';
import { UsersService } from '../users/users.service';
import { Lead, LeadOriginType, SocialMediaType, LeadGroupMapping } from '../model/lead';
import { Organization } from '../model/organization';
import { UserDetail } from '../login/login';
import { Label } from '../model/label';
import { AddleadsService } from './addleads.service';
import { NotyHelper } from '../helper/NotyHelper';
import { ListorganizationService } from '../listorganization/listorganization.service';
import { AddcurrencyService } from '../addcurrency/addcurrency.service';
import { Contactinformation } from '../contactinformation/contactinformation';
import { ContactinformationService } from '../contactinformation/contactinformation.service';
import { CustomProperty, CustomPropertyValues, DbPropertyTypes, CustomFieldListItems } from '../custom-fields/custom-fields';
import { Datashared } from '../helper/datashared';
import { CustomFieldsService } from '../custom-fields/custom-fields.service';
import { LeadGenType } from '../helper/LeadGenType';
import { CustomsectionComponent } from '../customsection/customsection.component';
import { Deal, DealStatus } from '../model/deal';
import { NotesInformation } from '../notesinfo/notesinfo';
import { NotesinfoService } from '../notesinfo/notesinfo.service';
import { AddeventshowService } from '../addeventshow/addeventshow.service';
import { Eventshow } from '../model/eventshow';
import { Vendor } from '../model/vendor';
import { Pipeline, PipelineGroup } from '../model/pipeline';
import { PipelineService } from '../pipeline/pipeline.service';
import { Networking } from '../model/networking';
import { CategoryValues } from '../model/Category';
import { CategorylistService } from '../categorylist/categorylist.service';
import { Partner } from '../model/partner';
import { Referral } from '../model/referral';
import { ListdealsService } from '../listdeals/listdeals.service';
import { Pipelinegrouptypeid } from '../helper/pipelinegrouptypeid';
import { UserGroups, UserGroupMapping } from '../addgroup/addgroup';
import { AddgroupService } from '../addgroup/addgroup.service';
import { AdddealsService } from '../adddeals/adddeals.service';
import { Dealstatus, ServiceStatus } from '../helper/dealstatus';
import { AddpartcatalogService } from '../addpartcatalog/addpartcatalog.service';
import { PartCatalog } from '../model/addpartcatalog';
import { ModalService } from '../loader.service';
import { AddquoteService } from '../addquote/addquote.service';
import { Quote } from '../model/quote';
import { Assignedtogrid } from '../assignedtogrid/assignedtogrid';
import { AdduserService } from '../adduser/adduser.service';
import * as moment from 'moment';
import { PrimarycontactComponent } from '../primarycontact/primarycontact.component';
import { Services } from '../model/services';
import { OnedrivegraphService } from '../onedriveservice/onedrivegraph.service';
import { Gender } from '../model/gender';
import { Templatelist } from '../model/templatelist';
import { TemplateService } from '../template/template.service';
import { DomSanitizer } from '@angular/platform-browser';
import { VoiceToTextService } from '../voice-to-text/voice-to-text.service';
import jsPDF from 'jspdf';
import SignaturePad from 'signature_pad';
import { Template, TemplateStatus } from '../model/template';
import { Temppatient } from '../model/temppatient';
import { Onedriveconfig } from '../helper/onedriveconfig';
import { stringify } from 'uuid';
import { GraphService } from '../officeauth/graph.service';
import { formatDate } from '@angular/common';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { parseInput } from 'rrule/dist/esm/src/rrulestr';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debuglog } from 'util';


@Component({
  selector: 'app-addleads',
  templateUrl: './addleads.component.html',
  styleUrls: ['./addleads.component.css']
})
export class AddleadsComponent implements OnInit {
  assignedToGrid: Assignedtogrid = new Assignedtogrid();
  //isShowDetails: boolean = false;
  reasonNotes: boolean = false;
  @ViewChild(PrimarycontactComponent, { static: false }) public primaryContact: PrimarycontactComponent;
  @ViewChildren(CustomsectionComponent) public CustomFieldSection: QueryList<CustomsectionComponent>;
  //@ViewChild(CustomsectionComponent, { static: false }) public CustomFieldSection: CustomsectionComponent;
  constructor(private speechService: VoiceToTextService, private sanitizer: DomSanitizer, public addGroupService: AddgroupService, private service: ContactinformationService, public categoryService: CategorylistService, private notesService: NotesinfoService, private customFieldService: CustomFieldsService, private contactService: ContactinformationService, public router: Router, private userService: UsersService, private organizationService: ListorganizationService, private addLeadService: AddleadsService, private notyHelper: NotyHelper, private addCurrencyService: AddcurrencyService, public dataShared: Datashared, public addEventShowService: AddeventshowService, public pipelineService: PipelineService, public dealService: AdddealsService, public listDealService: ListdealsService, public addPartCatalogService: AddpartcatalogService, private modalService: ModalService, public addQuoteService: AddquoteService, public addUserService: AdduserService, private graphService: OnedrivegraphService, public templateService: TemplateService, private graph: GraphService) { }
  contactInfo: Contactinformation = new Contactinformation();
  newContactToggle: boolean = false;
  contactModal: boolean = false;
  isSaveDisabled: boolean = false;
  UserDetails: Array<Users> = [];
  users: Array<Users> = [];
  notesInfos: Array<NotesInformation> = [];
  customFields: Array<CustomProperty> = [];

  customFieldValues: Array<CustomPropertyValues> = [];
  leftLeadCustomFieldValues: Array<CustomPropertyValues> = [];
  rightLeadCustomFieldValues: Array<CustomPropertyValues> = [];
  companyProfileLeftCustomFieldValues: Array<CustomPropertyValues> = [];
  companyProfileRightCustomFieldValues: Array<CustomPropertyValues> = [];
  leadOriginLeftCustomFieldValues: Array<CustomPropertyValues> = [];
  leadOriginRightCustomFieldValues: Array<CustomPropertyValues> = [];

  leadOpportunities: Array<Deal> = [];
  pastLeadOpportunities: Array<Deal> = [];
  presentLeadOpportunities: Array<Deal> = [];
  ownerDetails: Array<Users> = [];
  listEventShow: Array<Eventshow> = [];
  public lstGroups: Array<UserGroups>;
  listNetworking: Array<Networking> = [];
  listVendor: Array<Vendor> = [];
  listPartner: Array<Partner> = [];
  listReferral: Array<Referral> = [];
  listQuote: Array<Quote> = [];
  liveServices: Array<Services> = [];
  PastServices: Array<Services> = [];
  listAllServices: Array<Services> = [];
  listOfNotPayRefferalVendor: Array<Vendor> = [];
  listAllLeads: Array<Lead> = [];
  contactInformations: Array<Contactinformation> = [];
  entityTypeId: number;
  public entityNumber: string;
  entityType: number = LeadGenType.Lead;
  leadOriginsEntityType: number = LeadGenType.LeadOrigins;
  leadCompanyProfileEntityType: number = LeadGenType.LeadCompanyProfile;
  entityId: number;
  organizations: Array<Organization> = [];
  lead: Lead = new Lead();
  labels: Array<Label> = [{ Id: 1, Name: "Hot" }, { Id: 2, Name: "Cold" }, { Id: 3, Name: "Warm" }];
  loggedUser: UserDetail;
  userId: number;
  selectedUser: Users;
  selectedOrg: Organization;
  pipeline: Array<Pipeline>;
  ownerToggle: boolean;
  labelToggle: boolean;
  leadOriginTypes: Array<LeadOriginType>;
  socialMediaTypes: Array<SocialMediaType>;
  addCustomToggle: boolean = false;
  activeContainer: string = 'tab1';
  dealTabs: string = 'presentDeals';
  serviceTabs: string = 'presentServices';
  showPrimaryContact: boolean = true;
  public dbPropertyTypes: Array<DbPropertyTypes> = [];
  public customField: CustomProperty = new CustomProperty;
  public showListItem: boolean = false;
  public lstCustomFieldListItems: Array<CustomFieldListItems> = [];
  public selectedCategories: Array<CategoryValues> = [];
  ownerName: string;
  memberType: number = LeadGenType.Member;
  listNetworkContact: Array<Contactinformation> = [];
  dragElement: any;
  dropElement: any;
  permissionBaseValue: any;
  public lstLeadGroupMapping: Array<LeadGroupMapping> = [];
  listPipeLineGroup: Array<PipelineGroup> = [];
  selectedPipeIndex = 0;
  firstLetter: string = "P";
  public listofPipeline: Array<Pipeline>;
  lstDeal: Array<Deal> = [];
  deal: Deal = new Deal();
  allUsers: Array<Users> = [];
  listGender: Array<Gender> = [];
  public lstTemplate: Array<Templatelist> = [];
  public templateId: number;
  strSelectedTemplate: string = '';
  selectedTemplatePage: any = '';
  selectedTemplateHtml: any = '';
  selectedTemplateName: string = '';
  public isTemplate: boolean = false;
  currentCtrl: HTMLInputElement;
  signaturePad: any;
  image: any;
  loggedUserData: Users = new Users();
  selectedAppointment: any;
  previewHtml: any = '';
  isPreview: boolean = false;
  show = false;
  template: Template = new Template();
  appointmentId: number = 0;
  lstLead: Array<Lead> = [];
  lstTempPatient: Array<Temppatient> = [];
  UserName: any;
  public userInformation: UserDetail;
  isAdmin: any;
  public isOpen: boolean = false;
  patientAppointmentId: number;
  lstAppointment: Array<Services> = [];
  public selectedGroupId: any = [];
  public domain: string;
  public showAge: any;
  dropdownSettings: IDropdownSettings = {};
  selectedItems: any = {};
  public showEmergencyContact: boolean = true;

  ngOnInit() {
    let urlDomain = 'medicalassociates';
    this.domain = urlDomain;
    this.getTemplateFormsList();
    if (this.lead && this.lead.LeadStatus == null) {
      this.lead.LeadStatus = 3;
    }
    this.dropdownSettings = {
      idField: 'UserGroupId',
      textField: 'Name',    
     
    };
    
    this.loggedUser = JSON.parse(localStorage.getItem("userDetail"));
    //this.lead.Owner = this.loggedUser.User.UserId;
    this.userId = this.loggedUser.User.UserId;
    this.ownerName = this.loggedUser.User.FirstName;
    this.getUsers();
    this.getPipeLineGroup();
    this.getLeadOriginType();
    this.getSocialMediaType();
    this.getUserGroups();
    this.getPipeline();
    this.getVendor();
    this.getPartner();
    this.getReferral();
    this.getEventShow();
    this.getAllLeads();
    this.getAllNetworking();
    this.getAllUsers();
    this.getGender();
    this.permissionBaseValue = this.dataShared.getPermissionBaseValue();
    let leadData = new Lead();
    leadData = this.dataShared.getValue();
    if (leadData) {
      this.lead = leadData;
      //if (this.lead.LeadFunnelStatus == 3 || this.lead.LeadFunnelStatus == 4) {
      //  this.reasonNotes = true;
      //}
      this.getLeadById(this.lead.LeadId);
      this.lead.Owner = this.lead.Owner;
      this.entityId = this.lead.LeadId;
      this.entityNumber = this.lead.LeadNumber;
      //this.populateCustomFields(this.lead.LeadId);
      this.getPipeLineByPipeLineGroupId(this.lead.PipelineGroupId);
      this.getContactInformation(LeadGenType.Lead, this.lead.LeadId);
      this.LoadNotes(this.lead.LeadId, LeadGenType.Lead);
      this.getLeadOpportunities(this.lead.LeadId);
      this.getLeadGroupMapping(this.lead.LeadId);
      this.getLeadProposal(this.lead.LeadId);
      this.getAllLeadServices(this.lead.LeadId);
      if (this.lead.NetworkingId)
        this.populateNetworkContact(this.lead.NetworkingId);
    }
    else {
      this.entityId = 0;
      //this.lead.LeadFunnelStatus = Dealstatus.InProgress;
      this.lead.Owner = this.userId;
      this.lead.CreatedBy = this.loggedUser.User.Email;
      this.getLastIndentId(this.firstLetter);

    }

    if (this.lead.IsCommercial == null) {
      this.lead.IsCommercial = true;

    }
    this.getCustomFieldType();
    this.lstCustomFieldListItems.push(new CustomFieldListItems());

    var pipelineData = this.dataShared.getPipelineValue();
    if (pipelineData) {
      this.lead.PipelineGroupId = pipelineData.pipelineGroupId;
      this.lead.PipelineId = pipelineData.pipeline.PipelineId;
      if (this.lead.PipelineGroupId > 0) {
        this.getPipeLineByPipeLineGroupId(this.lead.PipelineGroupId);
      }
    }
    this.getAssignedToGridData();

  }

  getLeadById(id) {
    this.addLeadService.getLeadById(id).subscribe(data => {
      this.lead = data;
      let lstSecurityGroup = data.SecurityGroupId.split(',');
      this.selectedItems = [];
      lstSecurityGroup.forEach(x => {
        var group = { UserGroupId: 1, Name: '' };
        group.UserGroupId = parseInt(x);
        group.Name = this.lstGroups.find(y => y.UserGroupId == group.UserGroupId).Name
        this.selectedItems.push(group);
      });
      
    }, err => { }, () => { });
  }

 
                                                                                                                                                                                                                                          
  calculateCreatedByDays(date) {
    if (date) {
      var start = moment(date);
      var end = moment(new Date());
      return end.diff(start, "days");
    }
    else {
      return 0;
    }
  }
  getAssignedToGridData() {
    this.assignedToGrid.ApiUrl = "/api/Users/GetUsers";
    this.assignedToGrid.AssignedToId = this.lead.Owner;
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

  selectOwner(evt) {
    if (evt) {
      this.lead.Owner = evt.UserId;
    }
    else {
      this.lead.Owner = null;
    }
  }


  AffliateData(data) {
    this.selectedCategories = data;
  }
  chageLeadStatus(evt) {
    if (evt) {
      this.lead.LeadStatus = evt;
      //if (!(this.lead.LeadId && this.lead.LeadId != 0)) {
      //  switch (this.lead.LeadStatus) {
      //    case 1:
      //      this.firstLetter = "P";
      //      break;
      //    case 2:
      //      this.firstLetter = "TEMP-P";
      //      break;
      //    default:
      //      this.firstLetter = "TEMP-P"
      //      break;
      //  }
      //  this.getLastIndentId(this.firstLetter);
      //}
    }
  }

  selectedLeadStatus(evt) {
    if (evt) {
      this.lead.LeadFunnelStatus = evt;
      if (evt == 3 || evt == 4) {
        this.reasonNotes = true;
      }
      else {
        this.lead.Reason = "";
        this.reasonNotes = false;
      }
    }
  }

  getStatusNameById(id) {
    return Dealstatus[id];
  }
  getServiceStatusById(id) {
    return ServiceStatus[id];
  }

  getLastIndentId(firstLetter) {
    this.service.getNewEntityId('Lead', firstLetter).subscribe(data => {
      if (data) {
        this.lead.LeadNumber = data.EntityNumber;
        this.checkTempPatient();
      }
    }, err => { }, () => { });
  }
  MapCategoryValues(selectedValues) {
    if (selectedValues) {
      let categoryValue = new CategoryValues();
      categoryValue.EntityId = this.lead.LeadId;
      categoryValue.EntityTypeId = LeadGenType.Lead;
      if (typeof (selectedValues) === "number") {
        categoryValue.CategoryId = selectedValues;
        this.selectedCategories.push(categoryValue);
      }
      else {
        categoryValue.CategoryId = parseInt(selectedValues.target.value);
        if (selectedValues.target.checked) {
          this.selectedCategories.push(categoryValue);
        }
        else {
          this.selectedCategories = this.selectedCategories.filter(x => x.CategoryId !== categoryValue.CategoryId);
        }
      }
    }
  }

  getUserGroups() {
    this.addGroupService.GetUserGroups().subscribe(data => {
      if (data)
        this.lstGroups = data;
      //if (!this.lead.SecurityGroupId || this.lead.SecurityGroupId < 1) {
      //  if (this.lstGroups.length > 0) {
      //    var adminGroup = this.lstGroups.find(x => x.Name == "admin");
      //    if (adminGroup) {
      //      this.lead.SecurityGroupId = adminGroup.UserGroupId;
      //    }
      //  }
      //}
    }, err => { });
  }

  CheckSelectedValue(id) {
    let data = this.lstLeadGroupMapping.find(x => x.GroupId == id);
    if (data)
      return true;
    else
      return false;
  }
  securityGroupChange(securityGroupdId) {
    if (securityGroupdId) {
      this.lstLeadGroupMapping = [];
      let leadGroupMapping = new LeadGroupMapping();
      leadGroupMapping.GroupId = securityGroupdId;
      this.lstLeadGroupMapping.push(leadGroupMapping);
    }
  }
  selectUserGroups(evt) {
    if (evt.target.checked) {
      let leadGroupMapping = new LeadGroupMapping();
      leadGroupMapping.GroupId = evt.target.value;
      this.lstLeadGroupMapping.push(leadGroupMapping);
    }
    else {
      this.lstLeadGroupMapping = this.lstLeadGroupMapping.filter(x => x.GroupId !== evt.target.value);
    }
  }
  getLeadGroupMapping(leadId) {
    this.addGroupService.getLeadGroupMapping(leadId).subscribe(data => {
      if (data)
        this.lstLeadGroupMapping = data;
    }, err => { });
  }
  getPipeLineGroup() {
    this.listDealService.getPipeLineGroup().subscribe(data => {
      if (data) {
        this.listPipeLineGroup = data.filter(x => x.PipelineGroupType == Pipelinegrouptypeid.Lead);
        if (this.listPipeLineGroup && this.listPipeLineGroup.length > 0 && !this.lead.LeadId) {
          this.lead.PipelineGroupId = this.listPipeLineGroup[0].PipelineGroupId;
          this.getPipeLineByPipeLineGroupId(this.lead.PipelineGroupId);
        }
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
          if (this.selectedPipeIndex == -1) {
            this.selectedPipeIndex = 0;
            this.lead.PipelineId = this.listofPipeline[this.selectedPipeIndex].PipelineId;
          }
          else {
            this.selectedPipeIndex = this.listofPipeline.findIndex(x => x.PipelineId == this.lead.PipelineId);
            if (this.selectedPipeIndex == -1) {
              this.selectedPipeIndex = 0;
              this.lead.PipelineId = this.listofPipeline[this.selectedPipeIndex].PipelineId;
            }
          }

        });
      }
    }
  }

  selectedContactData(evt) {
    if (evt) {
      this.reloadCurrentRoute();
    }
  }

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.dataShared.setPermissionBaseValue(this.permissionBaseValue);
    this.dataShared.setValue(this.lead);
    this.dataShared.setPipelineValue({ pipelineGroupId: this.lead.PipelineGroupId, pipeline: { PipelineId: this.lead.PipelineId } });
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
  resetAndReloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.dataShared.setPermissionBaseValue(this.permissionBaseValue);
    this.dataShared.setValue(null);
    this.dataShared.setPipelineValue({ pipelineGroupId: this.lead.PipelineGroupId, pipeline: { PipelineId: this.lead.PipelineId } });
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
  sortBy(prop: string) {
    return this.listofPipeline ? this.listofPipeline.sort((a, b) => a[prop] > b[prop] ? 1 : a[prop] === b[prop] ? 0 : -1) : [];
  }


  backtoFunnel() {
    this.router.navigate(['/funnel']);
  }
  addNewLead() {
    this.resetAndReloadCurrentRoute();
  }

  closeContactModal() {
    this.contactModal = false;
  }

  clearData() {
    this.lead.NetworkContactId = null;
  }

  populateNetworkContact(networkingId) {
    this.contactService.getContactInformation(LeadGenType.Networking, networkingId, true).subscribe(data => {
      if (data)
        this.listNetworkContact = data;
    }, err => { }, () => { });
  }

  changeNetWorkContact(networkingId) {
    this.lead.NetworkContactId = null;
    this.contactService.getContactInformation(LeadGenType.Networking, networkingId, true).subscribe(data => {
      if (data)
        this.listNetworkContact = data;
    }, err => { }, () => { });
  }

  addNetworkContact() {
    var entityId = this.dataShared.getValue();
    if (entityId) {
      this.dataShared.setValue(entityId);
      this.contactModal = false;
      this.newContactToggle = true;
    }
  }

  viewContactModal(id) {
    this.dataShared.setValue(id);
    this.contactModal = true;
  }

  saveContactInfo(contactInfo) {
    var entityId = this.dataShared.getValue();
    if (entityId) {
      contactInfo.EntityId = entityId;
      contactInfo.Type = LeadGenType.Networking;
      contactInfo.IsAdditionalInfo = true;
      this.service.addContactInfo(contactInfo).subscribe(data => {
        if (data != null) {
          this.contactInfo = new Contactinformation();
          this.newContactToggle = false;
        }
        this.populateNetworkContact(this.entityType);
      }, err => { }, () => { });
    }
    else {
      this.notyHelper.ShowNoty("Invalid Data!");
    }
  }

  closeToggle() {
    this.contactInfo = new Contactinformation();
    this.newContactToggle = false;
  }

  selectContact(Id) {
    if (Id) {
      this.lead.NetworkContactId = Id;
      this.contactModal = false;
    }
  }

  getNetWorkContactName(id) {
    if (id != 0 || id != null) {
      if (this.listNetworkContact.length > 0) {
        var contactName = this.listNetworkContact.find(x => x.Id == id).ContactName;
        return contactName;
      }
    }
  }
  addNewService(lead) {
    if (lead.LeadId) {
      this.dataShared.setLeadValue(lead);
      this.navigate('addservicemodal', true);
    }
    else
      this.navigate('addservicemodal', true);
  }
  addNewOpportunity(lead) {
    if (lead.LeadId) {
      this.dataShared.setLeadValue(lead);
      this.navigate('adddealsmodal', true);
    }
    else
      this.navigate('adddealsmodal', true);
  }
  getLeadOpportunities(leadId) {
    this.contactService.getLeadOpportunities(leadId).subscribe(data => {
      if (data != null) {
        this.leadOpportunities = data;
        this.pastLeadOpportunities = this.leadOpportunities.filter(x => x.StatusId != null && x.StatusId != Dealstatus.InProgress);
        this.presentLeadOpportunities = this.leadOpportunities.filter(x => x.StatusId == null || x.StatusId == Dealstatus.InProgress);
      }
    }, err => { }, () => { });
  }

  getPipelineNameById(id) {
    let pipeline = this.pipeline.find(x => x.PipelineId == id);
    return pipeline ? pipeline.Name : '';
  }

  getPipeline() {
    this.pipelineService.getPipeLine().subscribe(data => {
      if (data != null)
        this.pipeline = data;
    }, err => { }, () => { });
  }

  getLeadOriginType() {
    this.addLeadService.getLeadOriginType().subscribe(data => {
      if (data != null)
        this.leadOriginTypes = data;
    }, err => { }, () => { });
  }

  changeFormatDate(date) {
    if (date)
      return date.split(':')[0] + ':' + date.split(':')[1];
  }

  getSocialMediaType() {
    this.addLeadService.getSocialMediaType().subscribe(data => {
      if (data != null)
        this.socialMediaTypes = data;
    }, err => { }, () => { });
  }

  getSocialMediaTypeNameById(id) {
    var socialMediaName = this.socialMediaTypes.find(x => x.Id == id).Name;
    return socialMediaName;
  }

  LoadNotes(entityId, entityTypeId) {
    this.notesService.LoadNotes(entityId, entityTypeId).subscribe(data => {
      if (data) {
        this.notesInfos = data;
      }
    }, err => { }, () => { });
  }

  noAllowDrop(ev) {
    ev.stopPropagation();
  }
  swap() {
    var el1 = this.dragElement;
    var el2 = this.dropElement;
    var parentEment1 = el1.parentElement;
    var parentEment2 = el2.parentElement;


    // put the second element before the first
    while (parentEment1.firstChild) {
      parentEment1.removeChild(parentEment1.lastChild);
    }
    parentEment1.appendChild(el2);
    // now put the first element where the second used to be
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

  getContactInformation(entityType, entityId) {
    this.contactService.getContactInformation(entityType, entityId, false).subscribe(data => {
      if (data != null)
        this.contactInformations = data;
    }, err => { }, () => { });
  }
  redirectToDeal(deal) {
    this.dataShared.setValue(deal);
    this.router.navigate(['/adddeals']);
  }
  redirectToService(service) {
    this.dataShared.setValue(service);
    this.router.navigate(['/editservice']);
  }
  cancel() {
    this.router.navigate(['/listleads']);
  }
  leadChanged(evt) {
    this.lead.CurrencyId = evt;
  }

  getEventShow() {
    this.addEventShowService.getEventShow().subscribe(data => {
      this.listEventShow = data;
    });
  }
  getAllNetworking() {
    this.addLeadService.getAllNetworkings().subscribe(data => {
      if (data)
        this.listNetworking = data;
    });
  }
  getUsers() {
    this.userService.getUsers().subscribe(data => {
      this.users = data.filter(x => x.IsSales);
    });
  }

  getVendor() {
    this.addEventShowService.getVendor().subscribe(data => {
      if (data != null) {
        this.listVendor = data;
        this.listOfNotPayRefferalVendor = data.filter(x => x.IsNotPayReferral == true);
      }
    });
  }
  getPartner() {
    this.addEventShowService.getPartner().subscribe(data => {
      if (data != null) {
        this.listPartner = data;
        //this.listOfNotPayRefferalVendor = data.filter(x => x.IsNotPayReferral == true);
      }
    });
  }
  getReferral() {
    this.addEventShowService.getReferral().subscribe(data => {
      if (data != null) {
        this.listReferral = data;
        //this.listOfNotPayRefferalVendor = data.filter(x => x.IsNotPayReferral == true);
      }
    });
  }
  userSearch(evt) {
    if (evt.target.value.length > 2) {
      this.userService.getUser(evt.target.value).subscribe(data => {
        this.UserDetails = data;
      }, err => {
        this.UserDetails = [];
      }, () => { });
    }
    else {
      this.UserDetails = [];
    }
  }
  orgSearch(evt) {
    this.organizationService.getOrg(evt.target.value).subscribe(data => {
      this.organizations = data;
    }, err => {
      this.organizations = [];
    }, () => { });
  }

  ownerSearch(evt) {
    this.userService.getUser(evt.target.value).subscribe(data => {
      this.ownerDetails = data;
    }, err => {
      this.ownerDetails = [];
    }, () => { });
  }
  getAllLeads() {
    this.addLeadService.getAllLeads().subscribe(data => {
      this.listAllLeads = data;
    });
  }

  async getMicrosoftAccount(user: any): Promise<any> {
    await this.graphService.executeQuery('POST', Onedriveconfig.graphV1UrlExcludeMe + 'users', user).subscribe(result => {
      if (result) {
        console.log(result);
      }

    }, err => {  }, () => { });
  }



  saveLead() {
    const inputFields = document.getElementsByName('mandatory');
    for (let i = 0; i < inputFields.length; i++) {
      const inputField = inputFields[i] as HTMLInputElement;

      if (!inputField.value) {
    
        inputField.style.border = '1px solid red';
        
      } else {
        inputField.style.border = '1px solid #ccc';
      }
    }
    this.lead.SecurityGroupId = this.selectedItems.map(item => item.UserGroupId).join(',');
    if (!this.lead.OriginsDate) {
      this.lead.OriginsDate = this.changeEstimateDateFormat(new Date().toISOString());
    }
    if (this.isSaveDisabled = false) {
      this.notyHelper.ShowNoty("Please Fill in Required Field");
    }
    if (!this.lead.LeadName || !this.lead.SecurityGroupId || !this.lead.PatientLastName || !this.lead.Age || !this.lead.BatchNumber || !this.lead.Address || !this.lead.EmailAddress || !this.lead.City || !this.lead.State || !this.lead.Country || !this.lead.ZipCode || !this.lead.CellNumber) {
      this.notyHelper.ShowNoty("Please fill required field");
    }
    else {
      this.isSaveDisabled = true;
      this.addLeadService.saveLead(this.lead).subscribe(data => {
        if (this.contactInformations.length > 0) {
          for (let i = 0; i < this.contactInformations.length; i++) {
            this.contactInformations[i].EntityId = data.LeadId;
            this.contactInformations[i].Type = this.entityType;
          }

          /*var Name = this.lead.LeadName + this.lead.PatientLastName;*/
          //const UserName = {
          //  displayName: Name,
          //  identities: [
          //    {
          //      signInType: this.lead.UserName,
          //      issuer: 'https://login.microsoftonline.com/d5012b81-b915-4802-a60b-8c494578cbd4/v2.0',
          //      issuerAssignedId: this.lead.UserName
          //    }
          //  ],
          //  passwordProfile: {
          //    password: 'Test@123',
          //    forceChangePasswordNextSignIn: true
          //  },
          //  passwordPolicies: 'DisablePasswordExpiration'

          //};
          this.contactService.SaveContactInfos(this.contactInformations).subscribe(data => { }, err => { }, () => { });
        }
        this.entityId = data.LeadId;
        if (this.selectedCategories.length > 0) {
          this.categoryService.saveCategoriesValue(this.selectedCategories).subscribe(data => { }, err => { }, () => { });
        }
        else {
          this.categoryService.deleteCategoryValues(this.entityType, this.entityId).subscribe(data => { }, err => { }, () => { });
        }
        //this.CustomFieldSection.forEach(x => x.SaveCustomFieldValues(data.LeadId));
        this.CustomFieldSection.forEach(x => {
          x.SaveCustomFieldValues(data.LeadId)
        });
        if (this.lstLeadGroupMapping.length > 0) {
          this.lstLeadGroupMapping.map(item => {
            item.LeadId = data.LeadId;
          });
          this.addGroupService.saveLeadGroupMapping(this.lstLeadGroupMapping).subscribe(data => { }, err => { }, () => { });
        }
        else {
          this.addGroupService.deleteLeadGroupMapping(this.lead.LeadId).subscribe(data => { }, err => { }, () => { });
        }
        this.primaryContact.savePrimaryContact(this.entityId);
        //this.CustomFieldSection.SaveCustomFieldValues(data.LeadId);
        this.lead = data;
        //if (data) {
        //  let content = {
        //    "name": this.lead.BatchNumber,
        //    "folder": {},
        //    "@microsoft.graph.conflictBehavior": "rename"
        //  }
        //  this.CreatePatientEMRFolder(content);
        //}
        this.notyHelper.ShowNoty("Data saved successfully !!!");
        //
        //let baseUrl = window.location.origin;
        //let urlDomain = baseUrl.replace('https://', '');
        //var Name = this.lead.LeadName + this.lead.PatientLastName;
        //const UserName = { accountEnabled: true, city: this.lead.City, country: this.lead.Country, department: 'Medical', displayName: Name, givenName: Name, jobTitle: 'Patient', mailNickname: Name, passwordPolicies: 'DisablePasswordExpiration', passwordProfile: { password: 'Test@123', forceChangePasswordNextSignIn: true }, officeLocation: this.lead.Address, postalCode: this.lead.ZipCode, preferredLanguage: 'en-US', state: this.lead.State, streetAddress: this.lead.Address, surname: Name, mobilePhone: this.lead.CellNumber, usageLocation: 'US', userPrincipalName: this.lead.UserName + '@' + urlDomain };
        //this.graph.PostUser(UserName).then(x => {
        //  var mail = {
        //    message: {
        //      subject: 'HIN-Account Details',
        //      body: {
        //        contentType: 'Html',
        //        content: `<div style=\"width:100%;\">\r\n<p style=\"font-family:Arial;font-weight:bold;font-size:18px;color:gray\">HIN Account</p>\r\n<h1 style=\"color:cornflowerblue;font-family:Arial;font-weight:normal\"> Account Details </h1>\r\n<p style=\"font-family:Arial\">Please use the following account details to access your HIN account</p>\r\n<p style=\"font-family:Arial\">UserName : ${UserName.userPrincipalName}</p>\r\n<p style=\"font-family:Arial\">Password : Test@123</p>\r\n<div style=\"font-family:Arial\">Thanks,</div>\r\n<div style=\"font-family:Arial\">HIN Team</div>\r\n</div>`
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

        //}, err => { });





        this.isSaveDisabled = false;
        this.reloadCurrentRoute();
        //this.router.navigate(['/listleads']);
      }, err => { }, () => { });
    }
    if (this.reasonNotes && !this.lead.Reason) {
      this.notyHelper.ShowNoty("Please enter the reason");
    }
    
  }

  

  CreatePatientEMRFolder(content: any) {
    let status = this.graphService.checkIfPatientFolderExist(content);
  }

  getLabelName(id) {
    return this.labels.find(x => x.Id == id) ? this.labels.find(x => x.Id == id).Name : 'NA';
  }
  removeLabel(label) {
    this.lead.LeadLabels = this.lead.LeadLabels.filter(x => x.Id != label.Id);
  }
  pushLabel(label) {
    if (!this.assignCheck(label)) {
      this.lead.LeadLabels.push(label);
    }
    else {
      this.removeLabel(label);
    }
  }
  assignCheck(label) {
    return this.lead.LeadLabels.find(x => x.Id == label.Id) != undefined;
  }
  getCustomFieldType() {
    this.customFieldService.getCustomFieldType().subscribe(data => {
      if (data != null) {
        this.dbPropertyTypes = data;
      }
    }, err => { }, () => { });
  }

  saveSuccess(evt) {
    if (evt) {
      this.addCustomToggle = false;
    }
  }
  dataExist(evt) {
    if (evt) {
      this.notyHelper.ShowNoty("Column already exist!");
    }
  }
  addLeadCustomField() {
    this.entityTypeId = LeadGenType.Lead;
    this.addCustomToggle = true;
  }

  addLeadCompanyProfileCustomField() {
    this.entityTypeId = LeadGenType.LeadCompanyProfile;
    this.addCustomToggle = true;
  }

  addLeadOriginsCustomField() {
    this.entityTypeId = LeadGenType.LeadOrigins;
    this.addCustomToggle = true;
  }

  addCustomFields() {
    this.addCustomToggle = true;
    this.customField.EntityTypeId = LeadGenType.Lead;
  }
  closeError() {
    this.addCustomToggle = false;
    this.showListItem = false;
    this.customField = new CustomProperty();
    this.lstCustomFieldListItems = [];
    this.lstCustomFieldListItems.push(new CustomFieldListItems());
  }


  addNewListItem() {
    let customFieldListItem = new CustomFieldListItems();
    this.lstCustomFieldListItems.push(customFieldListItem);
  }
  deleteListItem(data) {
    this.lstCustomFieldListItems = this.lstCustomFieldListItems.filter(item => item !== data);
  }
  typeChange(typeId) {
    if (typeId == 6 || typeId == 7) {
      this.showListItem = true;
    }
  }
  saveCustomField(customFields) {
    this.customFieldService.saveCustomFields(customFields).subscribe(data => {
      if (data != null) {
        this.addCustomToggle = false;
        if (this.lstCustomFieldListItems.length > 0 && this.lstCustomFieldListItems[0].Description) {
          this.lstCustomFieldListItems.map(m => m.CustomPropertyId = data.Id);
          this.customFieldService.saveListItems(this.lstCustomFieldListItems).subscribe(data => {
          }, err => { }, () => { });
        }
      }
    }, err => { }, () => { });
  }
  cancelAddCustom() {
    this.addCustomToggle = false;
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

  getLeadProposal(leadId) {
    if (leadId) {
      this.addQuoteService.getLeadProposal(leadId).subscribe(data => {
        if (data)
          this.listQuote = data;
      }, err => { }, () => { });
    }
  }
  checkTempPatient() {
    if (!(this.liveServices && this.liveServices.length > 0)) {
      if (this.lead.LeadNumber.indexOf("TEMP-") == -1) {
        this.lead.LeadNumber =  this.lead.LeadNumber;
        this.firstLetter = "TEMP-"

      }
    }
    //if (isEdit && this.lead.LeadNumber.indexOf("TEMP-") == -1) { this.lead.LeadNumber = "TEMP-" + this.lead.LeadNumber; }
  }
  getAllLeadServices(leadId) {
    if (leadId) {
      this.addQuoteService.getAllLeadServices(leadId).subscribe(data => {
        if (data) {
          this.listAllServices = data;
          this.liveServices = this.listAllServices.filter(_x => _x.StatusId == ServiceStatus.Inprogress);
          this.PastServices = this.listAllServices.filter(_x => _x.StatusId != ServiceStatus.Inprogress);
          this.checkTempPatient();

        }
      }, err => { }, () => { });
    }
  }

  addNewQuote() {
    this.navigate('addquotemodal', true);
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
  viewQuote(event) {
    this.dataShared.setValue(event);
    this.navigate('addquotemodal', true);
  }
  addNewFunnel() {
    this.navigate('pipelinemodal', true);
  }

  changeEstimateDateFormat(date) {
    if (date) {
      return date.split('T')[0];
    }
    else {
      let currentdate = new Date();
      //this.lead.EstimationDate = currentdate;
      return currentdate.getFullYear() + '-' + (currentdate.getMonth() < 10 ? ('0' + (currentdate.getMonth() + 1)) : currentdate.getMonth() + 1) + '-' + (currentdate.getDate() < 10 ? ('0' + (currentdate.getDate())) : (currentdate.getDate()));
    }
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
  getGender() {
    this.addUserService.getgender().subscribe(data => {
      this.listGender = data;
    })
  }

  getTemplateFormsList() {
    this.addLeadService.getTemplateList().subscribe(data => {
      if (data) {
        this.lstTemplate = data;
      }
    });
  }

  editTemplate(data) {
    this.templateId = data.Id;
    /*this.loadTemplatePage(this.templateId);*/
    this.isOpen = true;
    this.getAppointment(this.lead.LeadId);
    this.appointmentId = 0;
  }

  bindPreviewHTML(html) {
    if (html) {
      let safeHTML = this.sanitizer.bypassSecurityTrustHtml(html);
      return safeHTML;
    }
  }

  loadTemplatePage(templateId) {
    if (this.templateId) {
      this.templateService.getTemplatePageById(this.templateId).subscribe(_data => {
        if (_data) {
          this.strSelectedTemplate = _data.templatePage;
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
      this.signaturePad.fromDataURL("data:image/png;base64," + this.loggedUserData.Signature);
      setTimeout(() => {
        this.selectSignature();
      }, 500);
    }
  }

  bindDefaultValues() {
    if (this.strSelectedTemplate && this.lead) {
      this.setTextControlValue("patientName", this.lead.LeadName);
      this.setTextControlValue("patientDob", this.getDateStringFormat('YMD', this.lead.Dob, "-"));
      this.setTextControlValue("patientAge", this.lead.Age);
      this.setTextControlValue("patientOccupation", this.lead.Occupation);
      this.setTextControlValue("name1", this.lead.LeadName);
      this.setTextControlValue("name2", this.lead.LeadName);
      this.setTextControlValue("firstName", this.lead.FirstName);
      this.setTextControlValue("lastName", this.lead.LastName);
      var appointmentDate = formatDate(this.selectedAppointment.AppointmentDate, 'yyyy-MM-dd', 'en-US');
      this.setTextControlValue("ie_appointmentDate", appointmentDate);

    }
    return;
  }
  setTextControlValue(strId, val) {
    var txtCtrl = document.getElementById(strId) as HTMLInputElement;
    if (txtCtrl)
      txtCtrl.value = val;
  }

  getDateStringFormat(startType: string, date: any, splitter: string) {
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

  appointmentChange(id: number) {
    if (id && id > 0) {
      this.templateService.getSelectedAppointmentDetail(id).subscribe(_data => {
        if (_data) {
          this.selectedAppointment = _data;
          
         
          /*this.bindDefaultValues();*/
        }
      }, _err => { console.log(_err); }, () => { });
    }
  }

  sendToOneDrive() {

    if (!this.lead) {
      this.notyHelper.ShowNoty("Please select an appointment.");
    }
    else {
      var patientName = this.selectedAppointment.FirstName + '_' + this.selectedAppointment.LastName + '_' + this.selectedAppointment.LeadNumber;
      var appointmentDate = formatDate(this.selectedAppointment.AppointmentDate, 'yyyy-MM-dd', 'en-US');
      var practiceName = this.selectedAppointment.PracticeName;
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
      this.template.AppointmentId = this.appointmentId;
      this.template.TemplateId = this.templateId;
      this.templateService.saveTemplate(this.template).subscribe(data => {
        if (data) {
          this.notyHelper.ShowNoty("Data saved successfully !!!");
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

  checkIsAdmin() {
    if (this.userInformation.isAdmin == true) {

    }

  }

  closeTemplate() {
    this.isOpen = false;
  }

  

  getAppointment(leadId) {
    if (leadId) {
      this.addQuoteService.getAllLeadServices(leadId).subscribe(data => {
        if (data) {
          this.lstAppointment = data;
          

        }
      }, err => { }, () => { });
    }
  }

  ageCalculator(event: any) {
    if (this.lead.Dob) {
      const convertAge = new Date(this.lead.Dob);
      const timeDiff = Math.abs(Date.now() - convertAge.getTime());
      this.showAge = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365);
      this.lead.Age = this.showAge;
    }
   
  }
  onItemSelect(evt: any) {
  }
  // Function to save selections
 
}


  
      


