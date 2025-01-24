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
import { Router } from '@angular/router';
import { NotyHelper } from '../helper/NotyHelper';
import { ContactinformationService } from '../contactinformation/contactinformation.service';
import { Datashared } from '../helper/datashared';
import { ModalService } from '../loader.service';
import { AddleadsService } from '../addleads/addleads.service';
import { AdduserService } from '../adduser/adduser.service';
import { Pipelinegrouptypeid } from '../helper/pipelinegrouptypeid';
import { AddpartnerService } from './addpartner.service';
import { Deal } from '../model/deal';
import { Dealstatus } from '../helper/dealstatus';
import { PipelineService } from '../pipeline/pipeline.service';
import { AddgroupService } from '../addgroup/addgroup.service';
import { UserGroups } from '../addgroup/addgroup';
import { UserDetail } from '../login/login';
import { PrimarycontactComponent } from '../primarycontact/primarycontact.component';
import { Officeemail } from '../model/officeemail';

@Component({
  selector: 'app-addpartner',
  templateUrl: './addpartner.component.html',
  styleUrls: ['./addpartner.component.css']
})
export class AddpartnerComponent implements OnInit {
  emailInfos: Array<Officeemail> = [];
  permissionBaseValue: any;

  @ViewChild(PrimarycontactComponent, { static: false }) public primaryContact: PrimarycontactComponent;

  @ViewChildren(CustomsectionComponent) public CustomFieldSection: QueryList<CustomsectionComponent>;

  //@ViewChild(CustomsectionComponent, { static: false }) public CustomFieldSection: CustomsectionComponent;
  public listOfOpportunities: Array<Deal> = [];
  public addCustomToggle: boolean;
  public entityTypeId: number;
  customFields: Array<CustomProperty> = [];
  customFieldValues: Array<CustomPropertyValues> = [];

  partnerLeftCustomFieldValues: Array<CustomPropertyValues> = [];
  partnerRightCustomFieldValues: Array<CustomPropertyValues> = [];
  partnerOriginLeftCustomFieldValues: Array<CustomPropertyValues> = [];
  partnerOriginRightCustomFieldValues: Array<CustomPropertyValues> = [];


  entityType: number = LeadGenType.Partner;
  public entityId: number;
  contactInformations: Array<Contactinformation> = [];
  notesInfos: Array<NotesInformation> = [];
  listReferralFee: Array<ReferralFee>;
  listPaymentModel: Array<PaymentMode>;
  listVendorEvents: Array<Eventshow> = [];
  listOfLeads: Array<Lead> = [];
  public partners: Partner = new Partner();
  listPipeLineGroup: Array<PipelineGroup>;
  selectedPipeIndex = 0;
  public listofPipeline: Array<Pipeline>;
  public selectedAffiliateCategories: Array<CategoryValues> = [];
  public selectedSkillsCategories: Array<CategoryValues> = [];
  activeContainer: string = "tab8";
  socialMediaTypes: Array<SocialMediaType>;
  listEventShow: Array<Eventshow> = [];
  contactModal: boolean = false;
  listPartner: Array<Partner> = [];
  listOfNotPayRefferalVendor: Array<Partner> = [];
  listAllLeads: Array<Lead> = [];
  listNetworking: Array<Networking> = [];
  listNetworkContact: Array<Contactinformation> = [];
  listProvider: Array<Providertype> = [];
  leadOriginsEntityType: number = LeadGenType.LeadOrigins;
  newContactToggle: boolean = false;
  contactInfo: Contactinformation = new Contactinformation();
  public userCost: UserCost = new UserCost();
  listVendor: Array<Vendor> = [];
  pipeline: Array<Pipeline> = [];
  public lstGroups: Array<UserGroups>;
  public entityNumber: string;
  userDetail: UserDetail;
  constructor(public categoryService: CategorylistService, public listDealService: ListdealsService, private notesService: NotesinfoService, public eventService: AddeventshowService, public addVendorService: AddvendorService, public addPartnerService: AddpartnerService, public router: Router, public notification: NotyHelper, private contactService: ContactinformationService, public dataShared: Datashared, private modalService: ModalService, private leadService: AddleadsService, private addLeadService: AddleadsService, private service: ContactinformationService, private notyHelper: NotyHelper, public addUserService: AdduserService, public pipelineService: PipelineService, public addGroupService: AddgroupService) { }

  ngOnInit() {
    this.userDetail = JSON.parse(localStorage.getItem("userDetail"));
    this.getAllOpportunity();
    this.getSocialMediaType();
    //this.getPartner();
    this.getVendor();
    this.getEventShow();
    this.getReferralFee();
    this.getPaymentModel();
    this.getAllNetworking();
    this.getAllLeads();
    this.getProvider();
    let partnerData = new Partner();
    this.getPipeLineGroup();
    this.getPipeline();
    this.getUserGroups();
    partnerData = this.dataShared.getValue();
    if (partnerData) {
      this.partners = partnerData;
      this.getPartnerById(this.partners.PartnerId);
      this.entityId = this.partners.PartnerId;
      this.entityNumber = this.partners.PartnerNumber;
      this.getContactInformation(LeadGenType.Partner, this.partners.PartnerId);
      this.getPipeLineByPipeLineGroupId(this.partners.PipelineGroupId);
      this.LoadNotes(this.partners.PartnerId, LeadGenType.Partner);
      this.getPartnerEvents(this.partners.PartnerId);
      this.getLeadsByPartnerId(this.partners.PartnerId);
      this.getUserCost(this.partners.PartnerId);
      if (this.partners.NetworkingId)
        this.populateNetworkContact(this.partners.NetworkingId);
    }
    else {
      this.getLastIndentId();
      this.partners.AssignedTo = this.userDetail.User.UserId;
    }
    var pipelineData = this.dataShared.getPipelineValue();
    if (pipelineData) {
      this.partners.PipelineGroupId = pipelineData.pipelineGroupId;
      this.partners.PipelineId = pipelineData.pipeline.PipelineId;
      this.getPipeLineByPipeLineGroupId(this.partners.PipelineGroupId);
    }

  }


  getPartnerById(id) {
    this.addPartnerService.getPartnerById(id).subscribe(data => {
      this.partners = data;
    }, err => { }, () => { });
  }

  getLastIndentId() {
    this.service.getNewEntityId('Partner', 'P').subscribe(data => {
      if (data) {
        this.partners.PartnerNumber = data.EntityNumber;
      }
    }, err => { }, () => { });
  }

  getPipeline() {
    this.pipelineService.getPipeLine().subscribe(data => {
      this.pipeline = data;
    });
  }


  getStatusById(id) {
    if (id) {
      return Dealstatus[id];
    }
  }

  getLeadName(id) {
    if (id) {
      return this.listAllLeads.find(x => x.LeadId == id).LeadName;
    }
  }

  getFunnelStage(id) {
    if (id) {
      return this.pipeline.find(x => x.PipelineId == id).Name;
    }
  }

  getAllOpportunity() {
    this.listDealService.getAllOpportunity().subscribe(data => {
      this.listOfOpportunities = data.filter(x => x.AssignedTo == this.partners.PartnerId && x.AssignedType == 'Partner');
    });
  }

  viewOpportunity(deal) {
    this.dataShared.setValue(deal);
    this.navigate('adddealsmodal', true);
  }

  getVendor() {
    this.eventService.getVendor().subscribe(data => {
      if (data != null) {
        this.listVendor = data;
      }
    });
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
      categoryValue.EntityId = this.partners.PartnerId;
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
      categoryValue.EntityId = this.partners.PartnerId;
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
      this.listPipeLineGroup = data.filter(x => x.PipelineGroupType == Pipelinegrouptypeid.Partner);
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
    this.entityTypeId = LeadGenType.Partner;
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
          this.selectedPipeIndex = this.listofPipeline.findIndex(x => x.PipelineId == this.partners.PipelineId);
          if (this.selectedPipeIndex == -1) {
            this.selectedPipeIndex = 0;
            this.partners.PipelineId = this.listofPipeline[this.selectedPipeIndex].PipelineId;
          }
        });
      }
    }


  }
  sortBy(prop: string) {
    return this.listofPipeline ? this.listofPipeline.sort((a, b) => a[prop] > b[prop] ? 1 : a[prop] === b[prop] ? 0 : -1) : [];
  }

  getLeadsByPartnerId(partnerId) {
    if (partnerId) {
      this.leadService.getLeadsByPartnerId(partnerId).subscribe(data => {
        if (data)
          this.listOfLeads = data;
      }, err => { }, () => { });
    }
  }
  viewLead(lead) {
    this.dataShared.setValue(lead);
    this.navigate('addleadsmodal', true);
  }
  getPartnerEvents(partnerId) {
    if (partnerId) {
      this.eventService.getPartnerEvents(partnerId).subscribe(data => {
        if (data)
          this.listVendorEvents = data;
      }, err => { }, () => { });
    }
  }
  addNewPartner() {
    this.navigate('addpartnermodal', true);
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

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.dataShared.setPermissionBaseValue(this.permissionBaseValue);
    this.dataShared.setValue(this.partners);
    this.dataShared.setPipelineValue({ pipelineGroupId: this.partners.PipelineGroupId, pipeline: { PipelineId: this.partners.PipelineId } });
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  savePartner(partners) {
    if (!this.partners.PipelineGroupId || this.partners.PipelineGroupId <= 0 || !this.partners.ProviderTypeId || this.partners.ProviderTypeId <= 0) {
      this.notyHelper.ShowNoty("Please fill required field");
    }
    else {
      this.addPartnerService.savePartner(partners).subscribe(data => {
        if (this.contactInformations.length > 0) {
          for (let i = 0; i < this.contactInformations.length; i++) {
            this.contactInformations[i].EntityId = data.PartnerId;
            this.contactInformations[i].Type = this.entityType;
          }
          this.contactService.SaveContactInfos(this.contactInformations).subscribe(data => { }, err => { }, () => { });
        }
        if (data) {
          this.partners = data;
          this.entityId = this.partners.PartnerId;
          var combained = [];
          combained = this.selectedAffiliateCategories.concat(this.selectedSkillsCategories);
          if (combained.length > 0) {
            this.categoryService.saveCategoriesValue(combained).subscribe(data => { }, err => { }, () => { });
          }
          else {
            this.categoryService.deleteCategoryValues(this.entityType, this.partners.PartnerId).subscribe(data => { }, err => { }, () => { });
          }
          if (this.userCost) {
            this.userCost.PartnerId = this.partners.PartnerId;
            this.addUserService.saveUserCost(this.userCost).subscribe(costData => {
              this.userCost = costData;
            }, err => { }, () => { });
          }
          this.CustomFieldSection.forEach(x => { x.SaveCustomFieldValues(this.partners.PartnerId) });

          this.primaryContact.savePrimaryContact(this.entityId);

          this.notification.ShowNoty("Save Successfully");

          this.reloadCurrentRoute();
        }
        else {
          this.notification.ShowNoty("Error Occured");
        }
      });
    }
  }

  cancel() {
    this.router.navigate(['/listpartner']);
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
    this.partners.NetworkContactId = null;
  }
  //getPartner() {
  //  this.addPartnerService.getPartner().subscribe(data => {
  //    if (data != null) {
  //      this.listPartner = data;
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


  changeNetWorkContact(partnerId) {
    this.partners.NetworkContactId = null;
    this.contactService.getContactInformation(LeadGenType.Partner, partnerId, true).subscribe(data => {
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
      this.partners.NetworkContactId = Id;
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
      contactInfo.Type = LeadGenType.Partner;
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

  populateNetworkContact(partnerId) {
    this.contactService.getContactInformation(LeadGenType.Partner, partnerId, true).subscribe(data => {
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


}
