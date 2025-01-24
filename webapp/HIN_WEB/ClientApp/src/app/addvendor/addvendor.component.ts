import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { NotyHelper } from '../helper/NotyHelper';
import { Vendor, ReferralFee, PaymentMode } from '../model/vendor';
import { AddvendorService } from './addvendor.service';
import { ContactinformationService } from '../contactinformation/contactinformation.service';
import { Contactinformation } from '../contactinformation/contactinformation';
import { Datashared } from '../helper/datashared';
import { LeadGenType, LeadOriginType } from '../helper/LeadGenType';
import { Eventshow } from '../model/eventshow';
import { AddeventshowService } from '../addeventshow/addeventshow.service';
import { NotesInformation } from '../notesinfo/notesinfo';
import { NotesinfoService } from '../notesinfo/notesinfo.service';
import { ModalService } from '../loader.service';
import { Lead, SocialMediaType } from '../model/lead';
import { AddleadsService } from '../addleads/addleads.service';
import { CustomsectionComponent } from '../customsection/customsection.component';
import { CustomProperty, CustomPropertyValues } from '../custom-fields/custom-fields';
import { PipelineGroup, Pipeline } from '../model/pipeline';
import { ListdealsService } from '../listdeals/listdeals.service';

import { Pipelinegrouptypeid } from '../helper/pipelinegrouptypeid';
import { CategoryValues } from '../model/Category';
import { CategorylistService } from '../categorylist/categorylist.service';
import { Networking } from '../model/networking';
import { Providertype } from '../model/providertype';
import { UserCost } from '../users/users';
import { AdduserService } from '../adduser/adduser.service';
import { Partner } from '../model/partner';
import { AddgroupService } from '../addgroup/addgroup.service';
import { UserGroups } from '../addgroup/addgroup';
import * as moment from 'moment';
import { UserDetail } from '../login/login';
import { PrimarycontactComponent } from '../primarycontact/primarycontact.component';
import { Officeemail } from '../model/officeemail';

@Component({
  selector: 'app-addvendor',
  templateUrl: './addvendor.component.html',
  styleUrls: ['./addvendor.component.css']
})
export class AddvendorComponent implements OnInit {
  emailInfos: Array<Officeemail> = [];

  permissionBaseValue: any;
  @ViewChild(PrimarycontactComponent, { static: false }) public primaryContact: PrimarycontactComponent;

  @ViewChildren(CustomsectionComponent) public CustomFieldSection: QueryList<CustomsectionComponent>;
  //@ViewChild(CustomsectionComponent, { static: false }) public CustomFieldSection: CustomsectionComponent;
  public addCustomToggle: boolean;
  public entityTypeId: number;
  customFields: Array<CustomProperty> = [];
  customFieldValues: Array<CustomPropertyValues> = [];

  vendorLeftCustomFieldValues: Array<CustomPropertyValues> = [];
  vendorRightCustomFieldValues: Array<CustomPropertyValues> = [];
  vendorOriginLeftCustomFieldValues: Array<CustomPropertyValues> = [];
  vendorOriginRightCustomFieldValues: Array<CustomPropertyValues> = [];


  entityType: number = LeadGenType.Vendor;
  public entityId: number;
  public entityNumber: string;
  contactInformations: Array<Contactinformation> = [];
  notesInfos: Array<NotesInformation> = [];
  listReferralFee: Array<ReferralFee>;
  listPaymentModel: Array<PaymentMode>;
  listVendorEvents: Array<Eventshow> = [];
  listOfLeads: Array<Lead> = [];
  public vendors: Vendor = new Vendor();
  listPipeLineGroup: Array<PipelineGroup>;
  selectedPipeIndex = 0;
  public listofPipeline: Array<Pipeline>;
  public selectedAffiliateCategories: Array<CategoryValues> = [];
  public selectedSkillsCategories: Array<CategoryValues> = [];
  activeContainer: string = "tab8";
  socialMediaTypes: Array<SocialMediaType>;
  listEventShow: Array<Eventshow> = [];
  contactModal: boolean = false;
  listVendor: Array<Vendor> = [];
  listOfNotPayRefferalVendor: Array<Vendor> = [];
  listAllLeads: Array<Lead> = [];
  listNetworking: Array<Networking> = [];
  listNetworkContact: Array<Contactinformation> = [];
  listProvider: Array<Providertype> = [];
  leadOriginsEntityType: number = LeadGenType.LeadOrigins;
  newContactToggle: boolean = false;
  contactInfo: Contactinformation = new Contactinformation();
  public userCost: UserCost = new UserCost();
  listPartners: Array<Partner> = [];
  partner: Partner = new Partner();
  public lstGroups: Array<UserGroups>;
  userDetail: UserDetail;
  constructor(public categoryService: CategorylistService, public listDealService: ListdealsService, private notesService: NotesinfoService, public eventService: AddeventshowService, public addVendorService: AddvendorService, public router: Router, public notification: NotyHelper, private contactService: ContactinformationService, public dataShared: Datashared, private modalService: ModalService, private leadService: AddleadsService, private addLeadService: AddleadsService, private service: ContactinformationService, private notyHelper: NotyHelper, public addUserService: AdduserService, public addGroupService: AddgroupService) { }

  ngOnInit() {
    this.userDetail = JSON.parse(localStorage.getItem("userDetail"));
    this.getSocialMediaType();
    this.getVendor();
    this.getEventShow();
    this.getReferralFee();
    this.getPaymentModel();
    this.getAllNetworking();
    this.getAllLeads();
    this.getProvider();
    this.getUserGroups();
    let vendorData = new Vendor();
    this.getPipeLineGroup();
    vendorData = this.dataShared.getValue();
    if (vendorData) {
      this.vendors = vendorData;
      this.getVendorById(this.vendors.VendorId);
      this.entityId = this.vendors.VendorId;
      this.entityNumber = this.vendors.VendorNumber;
      this.getContactInformation(LeadGenType.Vendor, this.vendors.VendorId);
      this.getPipeLineByPipeLineGroupId(this.vendors.PipelineGroupId);
      this.LoadNotes(this.vendors.VendorId, LeadGenType.Vendor);
      this.getVendorEvents(this.vendors.VendorId);
      this.getLeadsByEntityOrigin(this.vendors.VendorId, LeadOriginType.Vendor);
      this.getUserCost(this.vendors.VendorId);
      this.getPartnerEntity(this.vendors.VendorId);
      if (this.vendors.NetworkingId)
        this.populateNetworkContact(this.vendors.NetworkingId);
    }
    else {
      this.getLastIndentId();
      this.vendors.AssignedTo = this.userDetail.User.UserId;
    }
    var pipelineData = this.dataShared.getPipelineValue();
    if (pipelineData) {
      this.vendors.PipelineGroupId = pipelineData.pipelineGroupId;
      this.vendors.PipelineId = pipelineData.pipeline.PipelineId;
      this.getPipeLineByPipeLineGroupId(this.vendors.PipelineGroupId);
    }
  }


  getVendorById(id) {
    this.addVendorService.getVendorById(id).subscribe(data => {
      this.vendors = data;
    }, err => { }, () => { });
  }

  AffliateData(data) {
    this.selectedAffiliateCategories = data;
  }
  SkillData(data) {
    this.selectedSkillsCategories = data;
  }

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.dataShared.setPermissionBaseValue(this.permissionBaseValue);
    this.dataShared.setValue(this.vendors);
    this.dataShared.setPipelineValue({ pipelineGroupId: this.vendors.PipelineGroupId, pipeline: { PipelineId: this.vendors.PipelineId } });
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  MapAffiliateCategoryValues(selectedValues) {
    if (selectedValues) {
      let categoryValue = new CategoryValues();
      categoryValue.EntityId = this.vendors.VendorId;
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
      categoryValue.EntityId = this.vendors.VendorId;
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
  getLastIndentId() {
    this.service.getNewEntityId('Vendor', 'V').subscribe(data => {
      if (data) {
        this.vendors.VendorNumber = data.EntityNumber;
        this.entityNumber = data.EntityNumber;
      }
    }, err => { }, () => { });
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

  closeError() {
    this.addCustomToggle = false;
  }

  getPipeLineGroup() {
    this.listDealService.getPipeLineGroup().subscribe(data => {
      this.listPipeLineGroup = data.filter(x => x.PipelineGroupType == Pipelinegrouptypeid.Vendor);
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
    this.entityTypeId = LeadGenType.Vendor;
    this.addCustomToggle = true;
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
          this.selectedPipeIndex = this.listofPipeline.findIndex(x => x.PipelineId == this.vendors.PipelineId);
          if (this.selectedPipeIndex == -1) {
            this.selectedPipeIndex = 0;
            this.vendors.PipelineId = this.listofPipeline[this.selectedPipeIndex].PipelineId;
          }
        });
      }
    }

  }
  sortBy(prop: string) {
    return this.listofPipeline ? this.listofPipeline.sort((a, b) => a[prop] > b[prop] ? 1 : a[prop] === b[prop] ? 0 : -1) : [];
  }

  getLeadsByEntityOrigin(entityId, originId) {
    if (entityId) {
      this.leadService.getLeadsByEntityOrigin(entityId, originId).subscribe(data => {
        if (data)
          this.listOfLeads = data;
      }, err => { }, () => { });
    }
  }

  viewLead(lead) {
    this.dataShared.setValue(lead);
    this.navigate('addleadsmodal', true);
  }

  getVendorEvents(vendorId) {
    if (vendorId) {
      this.eventService.getVendorEvents(vendorId).subscribe(data => {
        if (data)
          this.listVendorEvents = data;
      }, err => { }, () => { });
    }
  }

  addNewVendor() {
    this.router.navigate(['/addvendor']);
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

  saveVendor(vendors) {
    this.addVendorService.saveVendor(vendors).subscribe(data => {
      if (this.contactInformations.length > 0) {
        for (let i = 0; i < this.contactInformations.length; i++) {
          this.contactInformations[i].EntityId = data.VendorId;
          this.contactInformations[i].Type = this.entityType;
        }
        this.contactService.SaveContactInfos(this.contactInformations).subscribe(data => { }, err => { }, () => { });
      }
      if (data) {
        this.vendors = data;
        this.entityId = this.vendors.VendorId;
        var combained = [];
        combained = this.selectedAffiliateCategories.concat(this.selectedSkillsCategories);
        if (combained.length > 0) {
          this.categoryService.saveCategoriesValue(combained).subscribe(data => { }, err => { }, () => { });
        }
        else {
          this.categoryService.deleteCategoryValues(this.entityType, this.vendors.VendorId).subscribe(data => { }, err => { }, () => { });
        }
        if (this.userCost) {
          this.userCost.VendorId = this.vendors.VendorId;
          this.addUserService.saveUserCost(this.userCost).subscribe(costData => {
            this.userCost = costData;
          }, err => { }, () => { });
        }
        this.CustomFieldSection.forEach(x => { x.SaveCustomFieldValues(this.vendors.VendorId) });

        this.primaryContact.savePrimaryContact(this.entityId);

        this.notification.ShowNoty("Save Successfully");
        //this.router.navigate(['/listvendor']);
        this.reloadCurrentRoute();
      }
      else {
        this.notification.ShowNoty("Error Occured");
      }

      
    });
  }
  cancel() {
    this.router.navigate(['/listvendor']);
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
    this.vendors.NetworkContactId = null;
  }
  getVendor() {
    this.eventService.getVendor().subscribe(data => {
      if (data != null) {
        this.listVendor = data;
        this.listOfNotPayRefferalVendor = data.filter(x => x.IsNotPayReferral == true);
      }
    });
  }
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


  changeNetWorkContact(networkingId) {
    this.vendors.NetworkContactId = null;
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
  closeContactModal() {
    this.contactModal = false;
  }
  selectContact(Id) {
    if (Id) {
      this.vendors.NetworkContactId = Id;
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

  populateNetworkContact(networkingId) {
    this.contactService.getContactInformation(LeadGenType.Networking, networkingId, true).subscribe(data => {
      if (data)
        this.listNetworkContact = data;
    }, err => { }, () => { });
  }


  addNewPartner(partner) {
    if (partner.PartnerId) {
      this.dataShared.setLeadValue(partner);
      this.router.navigate(['/addpartner']);
    }
    else
      this.router.navigate(['/addpartner']);
  }

  redirectToPaartner(partner) {
    this.dataShared.setValue(partner);
    this.router.navigate(['/addpartner'])
  }

  getPartnerEntity(vendorId) {
    this.contactService.getPartnerEntity(vendorId).subscribe(data => {
      if (data != null)
        this.listPartners = data;
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
