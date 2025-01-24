import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { CustomsectionComponent } from '../customsection/customsection.component';
import { CustomProperty, CustomPropertyValues } from '../custom-fields/custom-fields';
import { LeadGenType } from '../helper/LeadGenType';
import { Contactinformation } from '../contactinformation/contactinformation';
import { NotesInformation } from '../notesinfo/notesinfo';
import { ReferralFee, PaymentMode, Vendor } from '../model/vendor';
import { Eventshow } from '../model/eventshow';
import { Lead, SocialMediaType } from '../model/lead';
import { Partner } from '../model/partner';
import { PipelineGroup, Pipeline } from '../model/pipeline';
import { CategoryValues } from '../model/Category';
import { Networking } from '../model/networking';
import { Providertype } from '../model/providertype';
import { UserCost } from '../users/users';
import { CategorylistService } from '../categorylist/categorylist.service';
import { ListdealsService } from '../listdeals/listdeals.service';
import { NotesinfoService } from '../notesinfo/notesinfo.service';
import { AddeventshowService } from '../addeventshow/addeventshow.service';
import { AddvendorService } from '../addvendor/addvendor.service';
import { AddpartnerService } from '../addpartner/addpartner.service';
import { Router } from '@angular/router';
import { NotyHelper } from '../helper/NotyHelper';
import { ContactinformationService } from '../contactinformation/contactinformation.service';
import { Datashared } from '../helper/datashared';
import { ModalService } from '../loader.service';
import { AddleadsService } from '../addleads/addleads.service';
import { AdduserService } from '../adduser/adduser.service';
import { Pipelinegrouptypeid } from '../helper/pipelinegrouptypeid';
import { Referral } from '../model/referral';
import { AddreferralService } from './addreferral.service';
import { AddgroupService } from '../addgroup/addgroup.service';
import { UserGroups } from '../addgroup/addgroup';
import * as moment from 'moment';
import { Assignedtogrid } from '../assignedtogrid/assignedtogrid';
import { UserDetail } from '../login/login';
import { PrimarycontactComponent } from '../primarycontact/primarycontact.component';
import { Officeemail } from '../model/officeemail';

@Component({
  selector: 'app-addreferral',
  templateUrl: './addreferral.component.html',
  styleUrls: ['./addreferral.component.css']
})
export class AddreferralComponent implements OnInit {
  permissionBaseValue: any;
  assignedToGrid: Assignedtogrid = new Assignedtogrid();
  public selectedAffiliateCategories: Array<CategoryValues> = [];
  public selectedSkillsCategories: Array<CategoryValues> = [];
  //@ViewChild(CustomsectionComponent, { static: false }) public CustomFieldSection: CustomsectionComponent;
  @ViewChild(PrimarycontactComponent, { static: false }) public primaryContact: PrimarycontactComponent;
  @ViewChildren(CustomsectionComponent) public CustomFieldSection: QueryList<CustomsectionComponent>;
  public addCustomToggle: boolean;
  public entityTypeId: number;
  customFields: Array<CustomProperty> = [];
  customFieldValues: Array<CustomPropertyValues> = [];

  referralLeftCustomFieldValues: Array<CustomPropertyValues> = [];
  referralRightCustomFieldValues: Array<CustomPropertyValues> = [];
  referralOriginLeftCustomFieldValues: Array<CustomPropertyValues> = [];
  referralOriginRightCustomFieldValues: Array<CustomPropertyValues> = [];

  loggedUser: UserDetail;
  userId: number;

  entityType: number = LeadGenType.Referral;
  public entityId: number;
  public notFilter: ['Partner', 'Referral'];
  contactInformations: Array<Contactinformation> = [];
  notesInfos: Array<NotesInformation> = [];
  listReferralFee: Array<ReferralFee>;
  listPaymentModel: Array<PaymentMode>;
  listVendorEvents: Array<Eventshow> = [];
  listOfLeads: Array<Lead> = [];
  public referrals: Referral = new Referral();
  listPipeLineGroup: Array<PipelineGroup>;
  selectedPipeIndex = 0;
  public listofPipeline: Array<Pipeline>;
  activeContainer: string = "tab3";
  socialMediaTypes: Array<SocialMediaType>;
  listEventShow: Array<Eventshow> = [];
  contactModal: boolean = false;
  listVendor: Array<Vendor> = [];
  listOfNotPayRefferalVendor: Array<Referral> = [];
  listAllLeads: Array<Lead> = [];
  listNetworking: Array<Networking> = [];
  listNetworkContact: Array<Contactinformation> = [];
  listProvider: Array<Providertype> = [];
  leadOriginsEntityType: number = LeadGenType.LeadOrigins;
  newContactToggle: boolean = false;
  contactInfo: Contactinformation = new Contactinformation();
  public userCost: UserCost = new UserCost();
  public lstGroups: Array<UserGroups>;
  public entityNumber: string;
  emailInfos: Array<Officeemail> = [];

  constructor(public categoryService: CategorylistService, public listDealService: ListdealsService, private notesService: NotesinfoService, public eventService: AddeventshowService, public addVendorService: AddvendorService, public addPartnerService: AddpartnerService, public addReferralService: AddreferralService, public router: Router, public notification: NotyHelper, private contactService: ContactinformationService, public dataShared: Datashared, private modalService: ModalService, private leadService: AddleadsService, private addLeadService: AddleadsService, private service: ContactinformationService, private notyHelper: NotyHelper, public addUserService: AdduserService, public addGroupService: AddgroupService) { }

  ngOnInit() {
    this.loggedUser = JSON.parse(localStorage.getItem("userDetail"));
    this.userId = this.loggedUser.User.UserId;
    this.getSocialMediaType();
    //this.getReferral();
    this.getVendor();
    this.getEventShow();
    this.getReferralFee();
    this.getPaymentModel();
    this.getAllNetworking();
    this.getAllLeads();
    this.getProvider();
    this.getUserGroups();
    let referralrData = new Referral();
    this.getPipeLineGroup();
    referralrData = this.dataShared.getValue();
    if (referralrData) {
      this.referrals = referralrData;
      this.referrals.AssignedTo = this.referrals.AssignedTo;
      this.getReferralById(this.referrals.ReferralId);
      this.entityId = this.referrals.ReferralId;
      this.entityNumber = this.referrals.ReferralNumber;
      this.getContactInformation(LeadGenType.Referral, this.referrals.ReferralId);
      this.getPipeLineByPipeLineGroupId(this.referrals.PipelineGroupId);
      this.LoadNotes(this.referrals.ReferralId, LeadGenType.Referral);
      this.getReferralEvents(this.referrals.ReferralId);
      this.getLeadsByReferralId(this.referrals.ReferralId);
      this.getUserCost(this.referrals.ReferralId);
      if (this.referrals.NetworkingId)
        this.populateNetworkContact(this.referrals.NetworkingId);
    }
    else {
      this.referrals.AssignedTo = this.userId;
      this.getLastIndentId();
    }
    var eventId = this.dataShared.getEventId();
    if (eventId) {
      this.referrals.EventId = eventId;
    }
    var pipelineData = this.dataShared.getPipelineValue();
    if (pipelineData) {
      this.referrals.PipelineGroupId = pipelineData.pipelineGroupId;
      this.referrals.PipelineId = pipelineData.pipeline.PipelineId;
      this.getPipeLineByPipeLineGroupId(this.referrals.PipelineGroupId);
    }

    this.getAssignedToGridData();
  }


  getReferralById(id) {
    this.addReferralService.getReferralById(id).subscribe(data => {
      this.referrals = data;
    }, err => { }, () => { });
  }


  getLastIndentId() {
    this.service.getNewEntityId('Referral', 'R').subscribe(data => {
      if (data) {
        this.referrals.ReferralNumber = data.EntityNumber;
        this.entityNumber = data.EntityNumber;
      }
    }, err => { }, () => { });
  }
  AffliateData(data) {
    this.selectedAffiliateCategories = data;
  }
  SkillData(data) {
    this.selectedSkillsCategories = data;
  }
  MapAffiliateCategoryValues(selectedValues) {
    if (selectedValues) {
      let categoryValue = new CategoryValues();
      categoryValue.EntityId = this.referrals.ReferralId;
      categoryValue.EntityTypeId = this.entityType;
      if (typeof (selectedValues) === "number") {
        categoryValue.CategoryId = selectedValues;
        this.selectedAffiliateCategories.push(categoryValue);
      }
      else {
        categoryValue.CategoryId = parseInt(selectedValues.target.value);
        if (selectedValues.target.checked) {
          this.selectedAffiliateCategories.push(categoryValue);
        }
        else {
          this.selectedAffiliateCategories = this.selectedAffiliateCategories.filter(x => x.CategoryId !== categoryValue.CategoryId);
        }
      }
    }
  }

  MapSkillsCategoryValues(selectedValues) {
    if (selectedValues) {
      let categoryValue = new CategoryValues();
      categoryValue.EntityId = this.referrals.ReferralId;
      categoryValue.EntityTypeId = this.entityType;
      if (typeof (selectedValues) === "number") {
        categoryValue.CategoryId = selectedValues;
        this.selectedSkillsCategories.push(categoryValue);
      }
      else {
        categoryValue.CategoryId = parseInt(selectedValues.target.value);
        if (selectedValues.target.checked) {
          this.selectedSkillsCategories.push(categoryValue);
        }
        else {
          this.selectedSkillsCategories = this.selectedSkillsCategories.filter(x => x.CategoryId !== categoryValue.CategoryId);
        }
      }
    }
  }
  getVendor() {
    this.eventService.getVendor().subscribe(data => {
      if (data != null) {
        this.listVendor = data;
      }
    });
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
  changeFormatDate(date) {
    if (date)
      return date.split(':')[0] + ':' + date.split(':')[1];
  }

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.dataShared.setPermissionBaseValue(this.permissionBaseValue);
    this.dataShared.setValue(this.referrals);
    this.dataShared.setPipelineValue({ pipelineGroupId: this.referrals.PipelineGroupId, pipeline: { PipelineId: this.referrals.PipelineId } });
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
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




  closeError() {
    this.addCustomToggle = false;
  }
  getPipeLineGroup() {
    this.listDealService.getPipeLineGroup().subscribe(data => {
      this.listPipeLineGroup = data.filter(x => x.PipelineGroupType == Pipelinegrouptypeid.Referral);
    });
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
  createNewField() {
    this.entityTypeId = LeadGenType.Referral;
    this.addCustomToggle = true;
  }
  getPipeLineByPipeLineGroupId(id) {
    if (id == -1) {
      this.addNewFunnel();
    } else {
      if (id != null) {
        this.listDealService.getPipeLineByPipeLineGroupId(id).subscribe(data => {
          this.listofPipeline = data;
          this.listofPipeline = this.sortBy('DisplayOrder');
          this.selectedPipeIndex = this.listofPipeline.findIndex(x => x.PipelineId == this.referrals.PipelineId);
          if (this.selectedPipeIndex == -1) {
            this.selectedPipeIndex = 0;
            this.referrals.PipelineId = this.listofPipeline[this.selectedPipeIndex].PipelineId;
          }
        });
      }
    }

  }
  sortBy(prop: string) {
    return this.listofPipeline ? this.listofPipeline.sort((a, b) => a[prop] > b[prop] ? 1 : a[prop] === b[prop] ? 0 : -1) : [];
  }


  getLeadsByReferralId(referralId) {
    if (referralId) {
      this.leadService.getLeadsByReferralId(referralId).subscribe(data => {
        if (data)
          this.listOfLeads = data;
      }, err => { }, () => { });
    }
  }
  viewLead(lead) {
    this.dataShared.setValue(lead);
    this.navigate('addleadsmodal', true);
  }
  getReferralEvents(referralId) {
    if (referralId) {
      this.eventService.getReferralEvents(referralId).subscribe(data => {
        if (data)
          this.listVendorEvents = data;
      }, err => { }, () => { });
    }
  }
  addNewReferral() {
    this.navigate('addreferralmodal', true);
  }
  addNewOpportunity() {
    this.navigate('adddealsmodal', true);
  }

  addNewLead() {
    this.navigate('addleadsmodal', true);
  }

  viewEvent(event) {
    this.dataShared.setValue(event);
    this.navigate('addeventshowmodal', true);
  }

  addNewEvent() {
    this.navigate('addeventshowmodal', true);
  }

  LoadNotes(entityId, entityTypeId) {
    this.notesService.LoadNotes(entityId, entityTypeId).subscribe(data => {
      if (data) {
        this.notesInfos = data;
      }
    }, err => { }, () => { });
  }

  getReferralFee() {
    this.addVendorService.getReferralFee().subscribe(data => {
      this.listReferralFee = data;
    });
  }

  getProvider() {
    this.addVendorService.getProvider().subscribe(data => {
      this.listProvider = data;
    });
  }
  getPaymentModel() {
    this.addVendorService.getPaymentModel().subscribe(data => {
      this.listPaymentModel = data;
    });
  }

  getUserCost(userId) {
    this.addUserService.getUserCost(userId).subscribe(data => {
      if (data)
        this.userCost = data;
    }, err => { }, () => { });
  }

  getAssignedToGridData() {
    this.assignedToGrid.ApiUrl = "/api/Users/GetUsers";
    this.assignedToGrid.AssignedToId = this.referrals.AssignedTo;
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
      this.referrals.AssignedTo = evt.UserId;
    }
    else {
      this.referrals.AssignedTo = null;
    }
  }

  saveReferral(referrals) {

    if (!this.referrals.EndOfContract) {
      this.referrals.EndOfContract = this.changeEstimateDateFormat(new Date().toISOString());
    }

    if (!this.referrals.PipelineGroupId || this.referrals.PipelineGroupId <= 0 || !this.referrals.ReferralDropdownId || this.referrals.ReferralDropdownId <= 0) {
      this.notyHelper.ShowNoty("Please fill required field");
    }
    else {
      this.addReferralService.saveReferral(referrals).subscribe(data => {
        if (this.contactInformations.length > 0) {
          for (let i = 0; i < this.contactInformations.length; i++) {
            this.contactInformations[i].EntityId = data.ReferralId;
            this.contactInformations[i].Type = this.entityType;
          }
          this.contactService.SaveContactInfos(this.contactInformations).subscribe(data => { }, err => { }, () => { });
        }
        if (data) {
          this.referrals = data;
          this.entityId = this.referrals.ReferralId;
          var combained = [];
          combained = this.selectedAffiliateCategories.concat(this.selectedSkillsCategories);
          if (combained.length > 0) {
            this.categoryService.saveCategoriesValue(combained).subscribe(data => { }, err => { }, () => { });
          }
          else {
            this.categoryService.deleteCategoryValues(this.entityType, this.referrals.ReferralId).subscribe(data => { }, err => { }, () => { });
          }
          if (this.userCost) {
            this.userCost.ReferralId = this.referrals.ReferralId;
            this.addUserService.saveUserCost(this.userCost).subscribe(costData => {
              this.userCost = costData;
            }, err => { }, () => { });
          }
          this.CustomFieldSection.forEach(x => { x.SaveCustomFieldValues(this.referrals.ReferralId) });

          this.primaryContact.savePrimaryContact(this.entityId);

          this.notification.ShowNoty("Save Successfully");

        }
        else {
          this.notification.ShowNoty("Error Occured");
        }

        
      });
    }
  }

  cancel() {
    this.router.navigate(['/listreferral']);
  }
  getContactInformation(entityType, entityId) {
    this.contactService.getContactInformation(entityType, entityId, false).subscribe(data => {
      if (data != null)
        this.contactInformations = data;
    }, err => { }, () => { });
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

  getSocialMediaType() {
    this.leadService.getSocialMediaType().subscribe(data => {
      if (data != null)
        this.socialMediaTypes = data;
    }, err => { }, () => { });
  }

  getSocialMediaTypeNameById(id) {
    var socialMediaName = this.socialMediaTypes.find(x => x.Id == id).Name;
    return socialMediaName;
  }
  getEventShow() {
    this.eventService.getEventShow().subscribe(data => {
      this.listEventShow = data;
    });
  }
  viewContactModal(id) {
    this.dataShared.setValue(id);
    this.contactModal = true;
  }
  clearData() {
    this.referrals.NetworkContactId = null;
  }
  //getReferral() {
  //  this.addReferralService.getReferral().subscribe(data => {
  //    if (data != null) {
  //      this.listReferral = data;
  //      this.listOfNotPayRefferalVendor = data.filter(x => x.IsNotPayReferral == true);
  //    }
  //  });
  //}

  getAllNetworking() {
    this.addLeadService.getAllNetworkings().subscribe(data => {
      if (data)
        this.listNetworking = data;
    });
  }
  getAllLeads() {
    this.addLeadService.getAllLeads().subscribe(data => {
      this.listAllLeads = data;
    });
  }

  getNetWorkContactName(id) {
    if (id != 0 || id != null) {
      if (this.listNetworkContact.length > 0) {
        var contactName = this.listNetworkContact.find(x => x.Id == id).ContactName;
        return contactName;
      }
    }
  }


  changeNetWorkContact(referralId) {
    this.referrals.NetworkContactId = null;
    this.contactService.getContactInformation(LeadGenType.Referral, referralId, true).subscribe(data => {
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
  closeContactModal() {
    this.contactModal = false;
  }

  selectContact(Id) {
    if (Id) {
      this.referrals.NetworkContactId = Id;
      this.contactModal = false;
    }
  }

  closeToggle() {
    this.contactInfo = new Contactinformation();
    this.newContactToggle = false;
  }

  saveContactInfo(contactInfo) {
    var entityId = this.dataShared.getValue();
    if (entityId) {
      contactInfo.EntityId = entityId;
      contactInfo.Type = LeadGenType.Referral;
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

  populateNetworkContact(referralId) {
    this.contactService.getContactInformation(LeadGenType.Referral, referralId, true).subscribe(data => {
      if (data)
        this.listNetworkContact = data;
    }, err => { }, () => { });
  }

  getUserGroups() {
    this.addGroupService.GetUserGroups().subscribe(data => {
      if (data)
        this.lstGroups = data;
    }, err => {

    });
  }
  addNewFunnel() {
    this.navigate('pipelinemodal', true);
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

}
