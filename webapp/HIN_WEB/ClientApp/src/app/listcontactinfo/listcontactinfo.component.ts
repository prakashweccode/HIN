import { Component, OnInit, Input, ViewChild, QueryList, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { Datashared } from '../helper/datashared';
import { AdduserService } from '../adduser/adduser.service';
import { Gender } from '../model/gender';
import { ListcontactinfoService } from './listcontactinfo.service';
import { LeadGenType } from '../helper/LeadGenType';
import { Contactinformation } from '../contactinformation/contactinformation';
import { ContactinformationService } from '../contactinformation/contactinformation.service';
import { CustomsectionComponent } from '../customsection/customsection.component';
import { NotyHelper } from '../helper/NotyHelper';
import { CustomProperty, CustomPropertyValues } from '../custom-fields/custom-fields';
import { Category, CategoryValues } from '../model/Category';
import { Batchemailsender } from '../model/batchemailsender';
import { GraphService } from '../officeauth/graph.service';
import { Body, Emailaddress, Message, Officeemail, Torecipient } from '../model/officeemail';
import { CategorylistService } from '../categorylist/categorylist.service';
import { Contactinformationemailmapping } from '../model/contactinformationemailmapping';

@Component({
  selector: 'app-listcontactinfo',
  templateUrl: './listcontactinfo.component.html',
  styleUrls: ['./listcontactinfo.component.css']
})
export class ListcontactinfoComponent implements OnInit {
  showContactAddress: boolean = false;
  showContactOrigin: boolean = false;
  lstContactEmail: Array<Contactinformationemailmapping> = [];
  public affiliateData: any;
  public listLeads: any = [];
  public listVendors: any = [];
  public listPartners: any = [];
  public listReferrals: any = [];
  public listConsultants: any = [];
  public selectedAffiliateCategories: Array<CategoryValues> = [];
  public selectedSkillsCategories: Array<CategoryValues> = [];
  contactEntityType: number = LeadGenType.LeadContact;
  public emailToggle: boolean = false;
  public sendEmailButtonShow: boolean = false;
  @ViewChildren(CustomsectionComponent) public CustomFieldSection: QueryList<CustomsectionComponent>;
  customFields: Array<CustomProperty> = [];
  customFieldValues: Array<CustomPropertyValues> = [];

  contactInfoLeftCustomFieldValues: Array<CustomPropertyValues> = [];
  contactInfoRightCustomFieldValues: Array<CustomPropertyValues> = [];

  public gridHeaders: Array<any>;
  public dataSource: Array<any>;
  public filterColumns: Array<any>;
  public selectedContacts: Array<Contactinformation> = [];
  public apiUrl: string;
  public pageSize: number;
  public actions: Array<any>;
  public pageLengthOptions: Array<number>;
  listGender: Array<Gender> = [];
  public genderList: any;
  public categoryList: any;
  public categoryValueList: any;
  public leadGenTypes: any;
  public entityTypeId: number;
  contactId: number;
  toggle: boolean = false;
  contactInfo: Contactinformation = new Contactinformation();
  selectedContact: Contactinformation;
  entityType: number = LeadGenType.LeadContact;
  entityId: number;
  additionalInfo: boolean;
  public listCategories: Array<Category> = [];
  public batchEmailSender: Batchemailsender = new Batchemailsender();
  public officeemails: Officeemail = new Officeemail();
  constructor(public graphService: GraphService, public router: Router, public dataShared: Datashared, public notification: NotyHelper, public listContactInfo: ListcontactinfoService, public service: ContactinformationService, public addUserService: AdduserService, public categoryService: CategorylistService) {
    this.officeemails.message = new Message();
    this.officeemails.saveToSentItems = "false";
    this.officeemails.message.body = new Body();
    this.officeemails.message.body.contentType = "HTML";
    this.officeemails.message.body.content = "";
    this.officeemails.message.subject = "";
    this.officeemails.message.ccRecipients = [];
    this.officeemails.message.toRecipients = [];
  }

  ngOnInit() {
    this.getGender();
    this.listContactInfo.getDropdowns().subscribe(data => {
      if (data) {
        this.genderList = data.Item1.map(item => ({
          id: item.GenderId,
          Name: item.GenderName
        }));
        this.leadGenTypes = data.Item2.map(item => ({
          id: item.Id,
          Name: item.EntityType == "Deal" ? 'Consultant' : item.EntityType == "LeadContact" ? 'Contact' : item.EntityType
        }));
        this.categoryList = data.Item3.map(item => ({
          id: item.Id,
          Name: item.Name
        }));
        this.categoryValueList = data.Item4.map(item => ({
          id: item.Id,
          Name: item.Name
        }));
      }
      this.gridHeaders = [
        { displayName: 'ContactInfo #', propertyName: 'ContactInfoNumber', dataType: 'string', secondPropertyName: '', filter: '', isLink: true, serializeArray: null, isCheckBox: true },
        { displayName: 'Contact', propertyName: 'ContactName', dataType: 'string', secondPropertyName: '', filter: '', isLink: true, serializeArray: null, gridPermissionCheck: '10.2.1.1'},
        { displayName: 'Contact Title', propertyName: 'ContactTitle', dataType: 'string', secondPropertyName: '', filter: '', isLink: false, serializeArray: null, gridPermissionCheck: '10.2.1.3' },
        { displayName: 'Entity Type', propertyName: 'Type', dataType: 'number', secondPropertyName: '', filter: '', isLink: false, serializeArray: this.leadGenTypes },
        { displayName: 'Email', propertyName: 'Email', dataType: 'string', secondPropertyName: '', filter: '', isLink: false, serializeArray: null, gridPermissionCheck: '10.2.1.4' },
        { displayName: 'Affiliates', propertyName: 'Affiliates', dataType: 'string', secondPropertyName: '', filter: '', isLink: false, serializeArray: null },
        { displayName: 'Affilates Name', propertyName: 'Affiliates', dataType: 'string', secondPropertyName: '', filter: '', isLink: false, serializeArray: null },
        { displayName: 'Skills', propertyName: 'Skills', dataType: 'string', secondPropertyName: '', filter: '', isLink: false, serializeArray: null },
        { displayName: 'City', propertyName: 'City', dataType: 'string', secondPropertyName: '', filter: '', isLink: false, serializeArray: null },
        { displayName: 'State', propertyName: 'State', dataType: 'string', secondPropertyName: '', filter: '', isLink: false, serializeArray: null },
        { displayName: 'Country', propertyName: 'Country', dataType: 'string', secondPropertyName: '', filter: '', isLink: false, serializeArray: null },
        { displayName: 'Groups', propertyName: 'Groups', dataType: 'string', secondPropertyName: '', filter: '', isLink: false, serializeArray: null }
      ];
    }, err => { }, () => { });

    this.dataSource = new Array<any>();
    this.filterColumns = [
      { column: "ContactName", value: "", type: "contains" },
      { column: "Gender", value: "", type: "contains" },
      { column: "ContactTitle", value: "", type: "contains" },
      { column: "Email", value: "", type: "contains" },
      { column: "CellNumber", value: "", type: "contains" },
      { column: "OfficeNumber", value: "", type: "contains" }
    ];
    this.actions = [
    ];
    this.pageLengthOptions = [25, 100, 250];
  }

  statusEmitter(value) {

  }
  //editContact(evt) {
  //  this.dataShared.setValue(evt.dataRow);
  //  this.router.navigate(['/contactinformation']);
  //}

  selectedArray(evt) {
    if (evt && evt.length > 0) {
      this.selectedContacts = evt;
      this.batchEmailSender.Contacts = this.selectedContacts;
      this.sendEmailButtonShow = true;
    }
    else {
      this.sendEmailButtonShow = false;
    }
  }

  getEntityByOrigin(orginId) {
    this.service.getEntityByOrigin(orginId).subscribe(data => {
      if (data) {
        switch (parseInt(orginId)) {
          case 1:
            this.clearAffiliates();
            this.listLeads = data;
            break;
          case 4:
            this.clearAffiliates();
            this.listVendors = data;
            break;
          case 19:
            this.clearAffiliates();
            this.listPartners = data;
            break;
          case 20:
            this.clearAffiliates();
            this.listReferrals = data;
            break;
          case 99:
            this.clearAffiliates();
            this.listConsultants = data;
            break;
        }
      }
    }, err => { }, () => { });
  }
  clearAffiliates() {
    this.listVendors = [];
    this.listLeads = [];
    this.listPartners = [];
    this.listReferrals = [];
    this.listConsultants = [];
  }
  sendEmail() {
    this.emailToggle = true;
  }

  closeEmailToggle() {
    this.emailToggle = false;
  }

  emailToggleModalClose(evt) {
    if (evt && evt == "false") {
      this.emailToggle = false;
    }
  }
  async sendGraphEmail(message): Promise<void> {
    await this.graphService.sendMail(message).then(x => {
      this.notification.ShowNoty("Email sent successfully.");
      this.closeEmailToggle();
    });
  }
  sendBatchEmail(evt) {
    if (evt) {
      this.batchEmailSender.ContentHtml = evt.ContentHtml;
      this.batchEmailSender.Subject = evt.Subject;
      this.batchEmailSender.TemplateId = evt.TemplateId;
      this.batchEmailSender.Contacts.forEach(_contact => {
        if (_contact && _contact.Email) {
          let email = new Emailaddress();
          email.address = _contact.Email;
          this.officeemails.message.toRecipients.push({ emailAddress: email });
        }
      });
      if (this.officeemails.message.toRecipients.length > 0) {
        this.officeemails.message.body.content = this.batchEmailSender.ContentHtml;
        this.officeemails.message.body.contentType = "HTML";
        this.officeemails.message.subject = this.batchEmailSender.Subject;
        this.sendGraphEmail(this.officeemails);
      }
      //this.listContactInfo.sendBatchEmail(this.batchEmailSender).subscribe(data => {
      //  if (data == null) {
      //    this.notification.ShowNoty("Email sent Successfully");
      //    this.emailToggle = false;
      //  }
      //}, err => { }, () => { });
    }
  }

  getGender() {
    this.addUserService.getgender().subscribe(data => {
      this.listGender = data;
    })
  }

  getgenderName(id) {
    if (id != 0 || id != null) {
      if (this.listGender.length > 0) {
        var genderName = this.listGender.find(x => x.GenderId == id).GenderName;
        return genderName;
      }
    }
  }

  editContactInfo(contactInfo) {
    this.contactInfo = contactInfo.dataRow;
    this.getAffiliateName(this.contactInfo.Type, this.contactInfo.EntityId);
    this.toggle = true;
    if (this.contactInfo.OrginId) {
      this.getEntityByOrigin(this.contactInfo.OrginId);
    }
    if (contactInfo.IsAdditionalInfo) {
      if (contactInfo.IsMember) {
        this.contactInfo.IsMember = true;
      }
      if (contactInfo.IsGuest) {
        this.contactInfo.IsMember = false;
      }
    }
  }
  getEntityType(type) {
    if (type) {
      let entityName = this.leadGenTypes.find(x => x.id == type).Name;
      return entityName;
    }
    else
      return;
  }
  getAffiliateName(type, entityId) {
    this.service.getAffiliateName(type, entityId).subscribe(data => {
      if (data) {
        this.affiliateData = data;
      }
      else
        this.affiliateData = null;
    }, err => { }, () => { });
  }
  closeToggle() {
    this.selectedContact = null;
    this.toggle = false;
    this.showContactOrigin = false;
    this.showContactAddress = false;
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

  //getContactInformation(entityType, entityId) {
  //  this.service.getContactInformation(entityType, entityId, this.additionalInfo).subscribe(data => {
  //    if (data != null)
  //      this.dataSource = data;
  //  }, err => { }, () => { });
  //}


  saveContactInfo(contactInfo) {
    contactInfo.Type = this.entityType;
    contactInfo.EntityId = this.entityId;
    if (this.additionalInfo) {
      contactInfo.IsAdditionalInfo = true;
      contactInfo.IsMember == true ? contactInfo.IsGuest = false : contactInfo.IsGuest = true;
    }
    this.service.addContactInfo(contactInfo).subscribe(data => {
      if (data) {
        this.selectedContact = null;
        this.contactId = data.Id;
        var combained = [];
        combained = this.selectedAffiliateCategories.concat(this.selectedSkillsCategories);
        if (combained.length > 0) {
          combained.forEach(x => x.EntityId = this.contactId);
          this.categoryService.saveCategoriesValue(combained).subscribe(data => { }, err => { }, () => { });
        }
        //this.CustomFieldSection.SaveCustomFieldValues(this.contactId);
        this.CustomFieldSection.forEach(x => {
          x.SaveCustomFieldValues(this.contactId)
        });
        this.dataSource.push(data);
        this.notification.ShowNoty("Contact information saved successfully!");
        this.selectedAffiliateCategories = [];
        this.selectedSkillsCategories = [];
        this.toggle = false;
        this.showContactOrigin = false;
        this.showContactAddress = false;
      }
    }, err => { }, () => { });
  }

  updateContactInfo(contactInfo) {
    if (this.additionalInfo) {
      contactInfo.IsAdditionalInfo = true;
      contactInfo.IsMember == true ? contactInfo.IsGuest = false : contactInfo.IsGuest = true;
    }
    this.service.UpdateContact(contactInfo).subscribe(data => {
      if (data) {
        this.contactId = data.Id;
        var combained = [];
        combained = this.selectedAffiliateCategories.concat(this.selectedSkillsCategories);
        if (combained.length > 0) {
          this.categoryService.saveCategoriesValue(combained).subscribe(data => { }, err => { }, () => { });
        }
        else {
          this.categoryService.deleteCategoryValues(this.contactEntityType, this.contactId).subscribe(data => { }, err => { }, () => { });
        }
      /* this.CustomFieldSection.SaveCustomFieldValues(this.contactId);*/
        this.CustomFieldSection.forEach(x => {
          x.SaveCustomFieldValues(this.contactId)
        });
        //this.getContactInformation(this.entityType, this.entityId);
        this.notification.ShowNoty("Contact information updated successfully!");
        this.toggle = false;
        this.showContactOrigin = false;
        this.showContactAddress = false;
      }
    }, err => { }, () => { });
  }
  getLastIndentId(firstLetter) {
    this.service.getNewEntityId('ContactInformation', firstLetter).subscribe(data => {
      if (data) {
        this.contactInfo.ContactInfoNumber = data.EntityNumber;
      }
    }, err => { }, () => { });
  }

  addNewContact() {
    this.contactInfo = new Contactinformation();
    this.getLastIndentId('CI');
    this.toggle = true;
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
      categoryValue.EntityId = this.contactInfo.Id;
      categoryValue.EntityTypeId = this.contactEntityType;
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
      categoryValue.EntityId = this.contactInfo.Id;
      categoryValue.EntityTypeId = this.contactEntityType;
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




}
