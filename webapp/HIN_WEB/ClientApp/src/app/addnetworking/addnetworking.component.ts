import { Component, OnInit, ViewChild, QueryList, ViewChildren } from '@angular/core';
import { AddnetworkingService } from './addnetworking.service';
import { Router } from '@angular/router';
import { Contactinformation } from '../contactinformation/contactinformation';
import { LeadGenType } from '../helper/LeadGenType';
import { ContactinformationService } from '../contactinformation/contactinformation.service';
import { CustomsectionComponent } from '../customsection/customsection.component';
import { NotyHelper } from '../helper/NotyHelper';
import { Networking, NetworkingEventMeet } from '../model/networking';
import { Datashared } from '../helper/datashared';
import { NotesInformation } from '../notesinfo/notesinfo';
import { Lead } from '../model/lead';
import { ModalService } from '../loader.service';
import { Networkingcost } from '../model/networkingcost';
import { CustomProperty, CustomPropertyValues } from '../custom-fields/custom-fields';
import { CategorylistService } from '../categorylist/categorylist.service';
import { CategoryValues } from '../model/Category';
import { Partner } from '../model/partner';
import { Referral } from '../model/referral';
import { NotesinfoService } from '../notesinfo/notesinfo.service';
import { UserDetail } from '../login/login';

@Component({
  selector: 'app-addnetworking',
  templateUrl: './addnetworking.component.html',
  styleUrls: ['./addnetworking.component.css']
})
export class AddnetworkingComponent implements OnInit {
  @ViewChildren(CustomsectionComponent) public CustomFieldSection: QueryList<CustomsectionComponent>;
  //@ViewChild(CustomsectionComponent, { static: false }) public CustomFieldSection: CustomsectionComponent;
  public addCustomToggle: boolean;
  public entityTypeId: number;
  customFields: Array<CustomProperty> = [];
  customFieldValues: Array<CustomPropertyValues> = [];

  networkingLeftCustomFieldValues: Array<CustomPropertyValues> = [];
  networkingRightCustomFieldValues: Array<CustomPropertyValues> = [];
  networkingCostLeftCustomFieldValues: Array<CustomPropertyValues> = [];
  networkingCostRightCustomFieldValues: Array<CustomPropertyValues> = [];

  entityType: number = LeadGenType.Networking;
  networkingCostEntityType: number = LeadGenType.NetworkingCost;
  entityId: number;
  contactInformations: Array<Contactinformation> = [];
  contactList: Array<Contactinformation> = [];
  public networking: Networking = new Networking();
  public networkingCost: Networkingcost = new Networkingcost();
  public networkingEventMeet: NetworkingEventMeet = new NetworkingEventMeet();
  public selectedCategories: Array<CategoryValues> = [];
  activeContainer: string = "tab2";
  notesInfos: Array<NotesInformation> = [];
  listOfLeads: Array<Lead> = [];
  listPartners: Array<Partner> = [];
  listReferrals: Array<Referral> = [];
  partner: Partner = new Partner();
  referral: Referral = new Referral();
  userDetail: UserDetail;
  constructor(public categoryService: CategorylistService, public router: Router, public addNetworkingService: AddnetworkingService, private contactService: ContactinformationService, public notification: NotyHelper, public dataShared: Datashared, private modalService: ModalService, private notesService: NotesinfoService) { }

  ngOnInit() {
    this.userDetail = JSON.parse(localStorage.getItem("userDetail"));
    let data = this.dataShared.getValue();
    if (data) {
      this.networking = data;
      this.getNetworkingById(this.networking.NetworkingId);
      if (this.networking.CostId) {
        this.getNetworkingCost(this.networking.CostId);
      }
      if (this.networking.EventMeetId) {
        this.getNetworkingEventMeet(this.networking.EventMeetId);
      }
      this.entityId = this.networking.NetworkingId;
      this.getContactInformation(LeadGenType.Networking, this.networking.NetworkingId);
      this.getContactList(LeadGenType.Networking, this.networking.NetworkingId)
      this.getNetworkingLeads(this.networking.NetworkingId);
      this.getNetworkEntity(this.networking.NetworkingId);
      this.getReferralNetworkEntity(this.networking.NetworkingId);
      this.LoadNotes(this.networking.NetworkingId, LeadGenType.Networking);
    }
    else {
      this.getLastIndentId();

    }
  }
  getLastIndentId() {
    this.contactService.getNewEntityId('Networking', 'N').subscribe(data => {
      if (data) {
        this.networking.NetworkingNumber = data.EntityNumber;
      }
    }, err => { }, () => { });
  }
  getNetworkingById(id) {
    this.addNetworkingService.getNetworkingById(id).subscribe(data => {
      this.networking = data;
    },err => { }, () => { });
  }
  


  createNewField() {
    this.entityTypeId = LeadGenType.Networking;
    this.addCustomToggle = true;
  }

  AffliateData(data) {
    this.selectedCategories = data;
  }

  MapCategoryValues(selectedValues) {
    if (selectedValues) {
      let categoryValue = new CategoryValues();
      categoryValue.EntityId = this.networking.NetworkingId;
      categoryValue.EntityTypeId = LeadGenType.Networking;
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
  addNetworkingCostCustomField() {
    this.entityTypeId = LeadGenType.NetworkingCost;
    this.addCustomToggle = true;
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
  closeError() {
    this.addCustomToggle = false;
  }
  changeFormatDate(date) {
    if (date)
      return date.split('T')[0];
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
  getNetworkingLeads(networkingId) {
    this.addNetworkingService.getNetworkingLeads(networkingId).subscribe(data => {
      if (data) {
        this.listOfLeads = data;
      }
    }, err => { }, () => { });
  }

  saveNetworking(networking) {
    networking.Cost = this.networkingCost;
    networking.EventMeet = this.networkingEventMeet;
    this.addNetworkingService.saveNetworking(networking).subscribe(data => {
      if (data != null) {
        this.networking = data;
        this.entityId = this.networking.NetworkingId;
        if (this.selectedCategories.length > 0) {
          this.categoryService.saveCategoriesValue(this.selectedCategories).subscribe(data => { }, err => { }, () => { });
        }
        else {
          this.categoryService.deleteCategoryValues(this.entityType, this.entityId).subscribe(data => { }, err => { }, () => { });
        }
        this.CustomFieldSection.forEach(x => x.SaveCustomFieldValues(this.networking.NetworkingId));
        //this.CustomFieldSection.SaveCustomFieldValues(this.networking.NetworkingId);
        this.notification.ShowNoty("Data Saved Successfully.");
      }
    }, err => { }, () => { });

  }
  getNetworkingCost(NetworkingCostId) {
    this.addNetworkingService.getNetworkingCost(NetworkingCostId).subscribe(data => {
      if (data) {
        this.networkingCost = data;
      }
    }, err => { }, () => { });
  }
  getNetworkingEventMeet(EventId) {
    this.addNetworkingService.getNetworkingEvent(EventId).subscribe(data => {
      if (data) {
        this.networkingEventMeet = data;
      }
    }, err => { }, () => { });
  }
  cancel() {
    this.router.navigate(['/listnetworking']);
  }
  addNetworking() {
    this.router.navigate(['/addnetworking']);
  }

  viewLead(lead) {
    this.dataShared.setValue(lead);
    this.navigate('addleadsmodal', true);
  }
  getContactInformation(entityType, entityId) {
    this.contactService.getContactInformation(entityType, entityId, false).subscribe(data => {
      if (data != null)
        this.contactInformations = data;
    }, err => { }, () => { });
  }
  getContactList(entityType, entityId) {
    this.contactService.getContactInformation(entityType, entityId, true).subscribe(data => {
      if (data != null)
        this.contactList = data;
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

  addNewPartner(partner) {
    if (partner.PartnerId) {
      this.dataShared.setLeadValue(partner);
      this.router.navigate(['/addpartner']);
    }
    else
      this.router.navigate(['/addpartner']);
  }
  addNewReferral(referral) {
    if (referral.ReferralId) {
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

  redirectToReferral(referral) {
    this.dataShared.setValue(referral);
    this.router.navigate(['/addreferral'])
  }

  getNetworkEntity(networkingId) {
    this.contactService.getNetworkEntity(networkingId).subscribe(data => {
      if (data != null)
        this.listPartners = data;
    }, err => { }, () => { });
  }

  getReferralNetworkEntity(networkingId) {
    this.contactService.getReferralNetworkEntity(networkingId).subscribe(data => {
      if (data != null)
        this.listReferrals = data;
    }, err => { }, () => { });
  }

  LoadNotes(entityId, entityTypeId) {
    this.notesService.LoadNotes(entityId, entityTypeId).subscribe(data => {
      if (data) {
        this.notesInfos = data;
      }
    }, err => { }, () => { });
  }


}
