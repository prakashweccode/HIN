import { Component, OnInit, Output, ViewChild, QueryList, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { ContactinformationService } from '../contactinformation/contactinformation.service';
import { Contactinformation } from '../contactinformation/contactinformation';
import { AddeventshowService } from './addeventshow.service';
import { NotyHelper } from '../helper/NotyHelper';
import { LeadGenType, LeadOriginType } from '../helper/LeadGenType';
import { Eventshow, EventMode, EventCost } from '../model/eventshow';
import { Datashared } from '../helper/datashared';
import { Vendor } from '../model/vendor';
import { NotesInformation } from '../notesinfo/notesinfo';
import { NotesinfoService } from '../notesinfo/notesinfo.service';
import { ModalService } from '../loader.service';
import { CustomProperty, CustomPropertyValues } from '../custom-fields/custom-fields';
import { CustomsectionComponent } from '../customsection/customsection.component';
import { Partner } from '../model/partner';
import { Referral } from '../model/referral';
import { CategoryValues } from '../model/Category';
import { CategorylistService } from '../categorylist/categorylist.service';
import { AddleadsService } from '../addleads/addleads.service';
import { Lead } from '../model/lead';
import { UserDetail } from '../login/login';

@Component({
  selector: 'app-addeventshow',
  templateUrl: './addeventshow.component.html',
  styleUrls: ['./addeventshow.component.css']
})
export class AddeventshowComponent implements OnInit {
  public selectedAffiliateCategories: Array<CategoryValues> = [];
  @ViewChildren(CustomsectionComponent) public CustomFieldSection: QueryList<CustomsectionComponent>;
  //@ViewChild(CustomsectionComponent, { static: false }) public CostCustomFieldSection: CustomsectionComponent;
  public addCustomToggle: boolean;
  public entityTypeId: number;
  customFields: Array<CustomProperty> = [];
  customFieldValues: Array<CustomPropertyValues> = [];

  eventShowLeftCustomFieldValues: Array<CustomPropertyValues> = [];
  eventShowRightCustomFieldValues: Array<CustomPropertyValues> = [];
  eventCostLeftCustomFieldValues: Array<CustomPropertyValues> = [];
  eventCostRightCustomFieldValues: Array<CustomPropertyValues> = [];

  //costCustomFieldValues: Array<CustomPropertyValues> = [];
  //costCustomFields: Array<CustomProperty> = [];
  notesInfos: Array<NotesInformation> = [];
  activeContainer: string = 'tab2';
  eventCost: EventCost = new EventCost();
  SelectedEventMode: number;
  listEventMode: Array<EventMode>;
  listVendor: Array<Vendor>
  entityType: number = LeadGenType.Eventshow;
  costEntityType: number = LeadGenType.EventCost;
  entityId: number;
  contactInformations: Array<Contactinformation> = [];
  participantsInfo: Array<Contactinformation> = [];
  participantEntityType: number = LeadGenType.EventParticipant;
  listPartners: Array<Partner> = [];
  public eventShows: Eventshow = new Eventshow();
  partner: Partner = new Partner();
  listReferrals: Array<Referral> = [];
  listOfLeads: Array<Lead> = [];
  listOfVendors: Array<Vendor> = [];
  referral: Referral = new Referral();
  entityTodoName: number;
  entityTodoValue: number;
  entityNumber: string;
  userDetail: UserDetail;
  constructor(private leadService: AddleadsService, private notesService: NotesinfoService, public router: Router, private contactService: ContactinformationService, public addEventShowService: AddeventshowService, public notification: NotyHelper, public dataShared: Datashared, private modalService: ModalService, public categoryService: CategorylistService) { }

  ngOnInit() {
    this.userDetail = JSON.parse(localStorage.getItem("userDetail"));
    this.getEventMode();
    this.getVendor();
    let eventData = new Eventshow();
    eventData = this.dataShared.getValue();
    if (eventData) {
      this.eventShows = eventData;
      this.getEventShowById(this.eventShows.Id);
      this.entityId = this.eventShows.Id;
      this.entityNumber = this.eventShows.EventNumber;
      this.entityTodoName = this.eventShows.EntityTypeId;
      this.entityTodoValue = this.eventShows.EntityId;
      this.getContactInformation(LeadGenType.Eventshow, this.eventShows.Id);
      this.getParticipantInformation(this.participantEntityType, this.eventShows.Id);
      this.LoadNotes(this.eventShows.Id, LeadGenType.Eventshow);
      this.getEventCost(this.eventShows.Id);
      this.getEventPartnerEntity(this.eventShows.Id);
      this.getReferralEventEntity(this.eventShows.Id);
      this.getLeadsByEntityOrigin(this.eventShows.Id, LeadOriginType.TradeShowname);
      this.getVendorsByEntityOrigin(this.eventShows.Id, LeadOriginType.TradeShowname);
    }
    else {
      this.getLastIndentId();
    }

  }
  getLastIndentId() {
    this.contactService.getNewEntityId('EventShow', 'E').subscribe(data => {
      if (data) {
        this.eventShows.EventNumber = data.EntityNumber;
      }
    }, err => { }, () => { });
  }
  getEventShowById(id) {
    this.addEventShowService.getEventShowById(id).subscribe(data => {
      this.eventShows = data;
    }, err => { }, () => { });
  }

  getLeadsByEntityOrigin(entityId, originId) {
    if (entityId) {
      this.leadService.getLeadsByEntityOrigin(entityId, originId).subscribe(data => {
        if (data)
          this.listOfLeads = data;
      }, err => { }, () => { });
    }
  }
  getVendorsByEntityOrigin(entityId, originId) {
    if (entityId) {
      this.addEventShowService.getVendorsByEntityOrigin(entityId, originId).subscribe(data => {
        if (data)
          this.listOfVendors = data;
      }, err => { }, () => { });
    }
  }
  addNewLead() {
    this.navigate('addleadsmodal', true);
  }
  viewLead(lead) {
    this.dataShared.setValue(lead);
    this.navigate('addleadsmodal', true);
  }
  addNewVendor() {
    this.navigate('addvendormodal', true);
  }
  viewVendor(vendor) {
    this.dataShared.setValue(vendor);
    this.navigate('addvendormodal', true);
  }
  AffliateData(data) {
    this.selectedAffiliateCategories = data;
  }

  MapAffiliateCategoryValues(selectedValues) {
    if (selectedValues) {
      let categoryValue = new CategoryValues();
      categoryValue.EntityId = this.eventShows.Id;
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


  closeError() {
    this.addCustomToggle = false;
  }

  saveSuccess(evt) {
    if (evt) {
      this.addCustomToggle = false;
    }
  }
  dataExist(evt) {
    if (evt) {
      this.notification.ShowNoty("Column already exist!");
    }
  }
  createNewField() {
    this.entityTypeId = LeadGenType.Eventshow;
    this.addCustomToggle = true;
  }

  addNewCostField() {
    this.entityTypeId = LeadGenType.EventCost;
    this.addCustomToggle = true;
  }

  SelectedEventModeChange(SelectedId) {
    this.SelectedEventMode = SelectedId;
    this.eventShows.EventModeId = SelectedId;
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

  getEventCost(id) {
    this.addEventShowService.getEventCost(id).subscribe(data => { this.eventCost = data; }, err => { }, () => { });
  }

  backToVendor() {
    this.router.navigate(['/listvendor']);
  }

  addNewEvent() {
    this.eventShows = new Eventshow();
    this.router.navigate(['/addeventshow']);
  }

  LoadNotes(entityId, entityTypeId) {
    this.notesService.LoadNotes(entityId, entityTypeId).subscribe(data => {
      if (data) {
        this.notesInfos = data;
      }
    }, err => { }, () => { });
  }

  saveEventShow(eventShows) {
    this.addEventShowService.saveEventShow(eventShows).subscribe(data => {
      if (data != null) {
        this.eventShows = data;
        this.eventCost.EventId = this.eventShows.Id;
        this.entityId = this.eventShows.Id;
        if (this.contactInformations.length > 0) {
          for (let i = 0; i < this.contactInformations.length; i++) {
            this.contactInformations[i].EntityId = this.entityId;
            this.contactInformations[i].Type = this.entityType;
          }
          this.contactService.SaveContactInfos(this.contactInformations).subscribe(data => { }, err => { }, () => { });
        }
        if (this.participantsInfo.length > 0) {
          for (let i = 0; i < this.participantsInfo.length; i++) {
            this.participantsInfo[i].EntityId = this.entityId;
            this.participantsInfo[i].Type = this.participantEntityType;
          }
          this.contactService.SaveContactInfos(this.participantsInfo).subscribe(data => { }, err => { }, () => { });
        }
        if (this.selectedAffiliateCategories.length > 0) {
          this.categoryService.saveCategoriesValue(this.selectedAffiliateCategories).subscribe(data => { }, err => { }, () => { });
        }
        else {
          this.categoryService.deleteCategoryValues(this.entityType, this.eventShows.Id).subscribe(data => { }, err => { }, () => { });
        }
        this.addEventShowService.saveEventCost(this.eventCost).subscribe(eventCostdata => {
          this.eventCost = eventCostdata;
        }, err => { }, () => { });
        //this.CustomFieldSection.forEach(x => x.SaveCustomFieldValues(this.entityId));
        this.CustomFieldSection.forEach(x => {
          x.SaveCustomFieldValues(this.entityId)
        });
        this.notification.ShowNoty("Save Successfully");
        //this.router.navigate(['/listeventshow']);
      }
      else {
        this.notification.ShowNoty("Error Occured");
      }
    });
  }
  cancel() {
    this.router.navigate(['/listeventshow']);
  }
  getContactInformation(entityType, entityId) {
    this.contactService.getContactInformation(entityType, entityId, false).subscribe(data => {
      if (data != null)
        this.contactInformations = data;
    }, err => { }, () => { });
  }
  getParticipantInformation(entityType, entityId) {
    this.contactService.getContactInformation(entityType, entityId, false).subscribe(data => {
      if (data != null)
        this.participantsInfo = data;
    }, err => { }, () => { });
  }
  getEventMode() {
    this.addEventShowService.getEventMode().subscribe(data => {
      this.listEventMode = data;
    });
  }
  getVendor() {
    this.addEventShowService.getVendor().subscribe(data => {
      this.listVendor = data;
    });
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

  addNewPartner(partner) {
    if (partner.PartnerId) {
      this.dataShared.setLeadValue(partner);
      this.router.navigate(['/addpartner']);
    }
    else
      this.router.navigate(['/addpartner']);
  }

  addNewReferral(referral) {
    if (referral.EventId) {
      this.dataShared.setLeadValue(referral);
      this.router.navigate(['/addreferral']);
    }
    else
      this.router.navigate(['/addreferral']);
  }

  redirectToPaartner(partner) {
    this.dataShared.setValue(partner);
    this.router.navigate(['/addpartner'])
  }
  redirectToreferral(referral) {
    this.dataShared.setValue(referral);
    this.router.navigate(['/addreferral'])
  }
  getEventPartnerEntity(eventId) {
    this.contactService.getEventPartnerEntity(eventId).subscribe(data => {
      if (data != null)
        this.listPartners = data;
    }, err => { }, () => { });
  }
  getReferralEventEntity(eventId) {
    this.contactService.getReferralEventEntity(eventId).subscribe(data => {
      if (data != null)
        this.listReferrals = data;
    }, err => { }, () => { });
  }
  sendEntityValue(evt) {
    this.eventShows.EntityTypeId = evt;
  }
  sendEntityType(evt) {
    this.eventShows.EntityId = evt;
  }

}
