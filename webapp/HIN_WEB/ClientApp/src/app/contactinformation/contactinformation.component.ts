import { Component, OnInit, Input, ViewChild, Output, EventEmitter, QueryList, ViewChildren } from '@angular/core';
import { ContactinformationService } from './contactinformation.service';
import { Contactinformation, SelectedContact } from './contactinformation';
import { CustomsectionComponent } from '../customsection/customsection.component';
import { CustomProperty, CustomPropertyValues } from '../custom-fields/custom-fields';
import { LeadGenType } from '../helper/LeadGenType';
import { Gender } from '../model/gender';
import { AdduserService } from '../adduser/adduser.service';
import { Contacttitle } from '../model/contacttitle';
import { NotyHelper } from '../helper/NotyHelper';
import { CategoryValues } from '../model/Category';
import { CategorylistService } from '../categorylist/categorylist.service';
import { Assignedtogrid } from '../assignedtogrid/assignedtogrid';
import { Router, RouteReuseStrategy } from '@angular/router';
import { Contactinformationemailmapping } from '../model/contactinformationemailmapping';
import { empty } from 'rxjs';

@Component({
  selector: 'app-contactinformation',
  templateUrl: './contactinformation.component.html',
  styleUrls: ['./contactinformation.component.css']
})
export class ContactinformationComponent implements OnInit {
  showContactAddress: boolean = false;
  showContactOrigin: boolean = false;
  assignedToGrid: Assignedtogrid = new Assignedtogrid();
  lstContactEmail: Array<Contactinformationemailmapping> = [];
  public listLeads: any = [];
  public listVendors: any = [];
  public listPartners: any = [];
  public selectedAffiliateCategories: Array<CategoryValues> = [];
  public selectedSkillsCategories: Array<CategoryValues> = [];
  activeContainer: string = "tab1";
  @ViewChildren(CustomsectionComponent) public CustomFieldSection: QueryList<CustomsectionComponent>;
  //@ViewChild(CustomsectionComponent, { static: false }) public CustomFieldSection: CustomsectionComponent;
  public lstContactTitle: Array<Contacttitle> = [];
  public addCustomToggle: boolean;
  public entityTypeId: number;
  contactEntityType: number = LeadGenType.LeadContact;
  customFields: Array<CustomProperty> = [];
  leftContactCFValues: Array<CustomPropertyValues> = [];
  rightContactCFValues: Array<CustomPropertyValues> = [];
  @Input() dataSource: Array<Contactinformation> = [];
  @Input() entityType: any;
  @Input() entityId: number;
  @Input() additionalInfo: boolean;
  @Input() basePermission: string;
  @Output() chooseSelectedContact = new EventEmitter();
  @Input() leadId: number;
  contactId: number;
  listGender: Array<Gender> = [];
  toggle: boolean = false;
  selectedContact: Contactinformation;
  ContactDetails: Array<Contactinformation> = [];
  contactInfo: Contactinformation = new Contactinformation();
  constructor(private service: ContactinformationService, public addUserService: AdduserService, public router:Router,public notification: NotyHelper, public categoryService: CategorylistService) { }

  ngOnInit() {
    this.getGender();
    this.getListOfContactTitle();
    this.getAssignedToGridData();
    this.lstContactEmail.push(new Contactinformationemailmapping());
    //this.getContactInformation(this.entityType, this.entityId);
    //this.categoryService.loadCategoryValues(this.contactEntityType, this.contactInfo.Id).subscribe(values => {
    //  if (values) {
    //    this.selectedAffiliateCategories = values;
    //    this.selectedSkillsCategories = values;
    //  }
    //}, err => { }, () => { });


  }


  getContactInfoEmail(id) {
    this.service.getContactInfoEmail(id).subscribe(email => {
      this.lstContactEmail = email;
      if (this.lstContactEmail.length == 0) {
        this.lstContactEmail.push(new Contactinformationemailmapping());
      }
    }, err => { }, () => { });
  }

  selectedContactData(evt) {
    if (evt) {
      var selectedContact = new SelectedContact();
      selectedContact.Id = evt.Id;
      selectedContact.EntityId = this.entityId;
      selectedContact.EntityType = this.entityType;
      if (selectedContact.Id) {
        this.service.saveSelectedContact(selectedContact).subscribe(data => {
          if (data) {
            this.chooseSelectedContact.emit(data);
            this.getContactInformation(this.entityType, this.entityId);
          }
        }, err => { }, () => { });
      }
      
    }
  }

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
  getEntityByOrigin(orginId) {
    this.service.getEntityByOrigin(orginId).subscribe(data => {
      if (data) {
        switch (parseInt(orginId)) {
          case 1:
            this.listVendors = [];
            this.listPartners = [];
            this.listLeads = data;
            break;
          case 2:
            this.listPartners = [];
            this.listLeads = [];
            this.listVendors = data;
            break;
          case 3:
            this.listVendors = [];
            this.listLeads = [];
            this.listPartners = data;
            break;
        }
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
  getAssignedToGridData() {
    this.assignedToGrid.ApiUrl = "api/ContactInfo/GetAllContactInfos";
    this.assignedToGrid.AssignedToId = null;
    this.assignedToGrid.AssignedToType = null;
    this.assignedToGrid.Title = "Contacts";
    this.assignedToGrid.GridHeaders = [
      { displayName: 'ContactName', propertyName: 'ContactName' },
      { displayName: 'Relationship', propertyName: 'ContactTitle' },
      { displayName: 'Email', propertyName: 'Email' }
    ];
    this.assignedToGrid.ButtonName = "Choose Contact";
    this.assignedToGrid.isStaticButton = true;
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


  getGender() {
    this.addUserService.getgender().subscribe(data => {
      this.listGender = data;
    })
  }

  getLeadGenEntityName(id) {
    if (LeadGenType[id] == 'Deal') {
      return "Consultant";
    }
    else {
      return LeadGenType[id];
    }
  }

  getListOfContactTitle() {
    this.service.getAllContactTitle().subscribe(data => {
      this.lstContactTitle = data;
    }, err => { }, () => { });
  }

  getContactTitleById(id) {
    if (id != 0 || id != null) {
      if (this.lstContactTitle.length > 0) {
        var contactTitle = this.lstContactTitle.find(x => x.Id == id).Name;
        return contactTitle;
      }
    }
  }

  getgenderName(id) {
    if (id != 0 || id != null) {
      if (this.listGender.length > 0) {
        var genderName = this.listGender.find(x => x.GenderId == id).GenderName;
        return genderName;
      }
    }
  }
  getContactInformation(entityType, entityId) {
    this.service.getContactInformation(entityType, entityId, this.additionalInfo).subscribe(data => {
      if (data != null)
        this.dataSource = data;
      //if (this.leadId) {
      //  this.service.getContactInformation(LeadGenType.Lead, this.leadId, false).subscribe(_leadContact => {
      //    if (_leadContact) {
      //      _leadContact.forEach(_x => {
      //        this.dataSource.push(_x);
      //      });
      //    }
      //  });
      //}
    }, err => { }, () => { });
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
    this.entityTypeId = LeadGenType.LeadContact;
    this.addCustomToggle = true;
  }

  closeToggle() {
    this.selectedContact = null;
    this.toggle = false;
    this.lstContactEmail = [];
    this.lstContactEmail.push(new Contactinformationemailmapping());
    this.showContactOrigin = false;
    this.showContactAddress = false;
  }

  editContactInfo(contactInfo) {
    this.contactId = contactInfo.Id;
    this.getContactInfoEmail(this.contactId);
    this.entityTypeId = LeadGenType.LeadContact;
    this.contactInfo = contactInfo;
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
  clearSelectedContact() {
    this.selectedContact = null;
    this.contactInfo = new Contactinformation;
  }
  addNewContact() {
    this.contactId = 0;
    this.entityTypeId = LeadGenType.LeadContact;
    this.selectedContact = null;
    this.contactInfo = new Contactinformation;
    this.getLastIndentId('CI');
    this.toggle = true;
    if (this.additionalInfo)
      this.contactInfo.IsMember = true;
  }
  contactSearch(evt) {
    if (evt.target.value.length > 2) {
      this.service.getContactsByName(evt.target.value).subscribe(data => {
        if (data)
          this.ContactDetails = data;
        else
          this.ContactDetails = [];
      }, err => {
        this.ContactDetails = [];
      }, () => { });
    }
    else {
      this.ContactDetails = [];
    }
  }


  deleteEmail(listItem) {
    this.lstContactEmail = this.lstContactEmail.filter(item => item !== listItem);
  }

  addNewEmail() {
    var contactInfoEmail = new Contactinformationemailmapping();
    this.lstContactEmail.push(contactInfoEmail);
  }


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

        this.lstContactEmail.map(m => m.ContactInformationId = data.Id);
          this.service.SaveContactInfoEmail(this.lstContactEmail).subscribe(data => {
          }, err => { }, () => { });

        this.dataSource.push(data);
        this.notification.ShowNoty("Contact information saved successfully!");
        this.selectedAffiliateCategories = [];
        this.selectedSkillsCategories = [];
        this.toggle = false;
        this.showContactOrigin = false;
        this.showContactAddress = false;
      }
      this.getContactInformation(this.entityType, this.entityId);
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
        //this.CustomFieldSection.SaveCustomFieldValues(this.contactId);
        this.CustomFieldSection.forEach(x => {
          x.SaveCustomFieldValues(this.contactId)
        });
        
        this.lstContactEmail.map(m => m.ContactInformationId = data.Id);
          this.service.SaveContactInfoEmail(this.lstContactEmail).subscribe(data => {
          }, err => { }, () => { });

        this.getContactInformation(this.entityType, this.entityId);
        this.notification.ShowNoty("Contact information updated successfully!");
        this.toggle = false;
        this.showContactOrigin = false;
        this.showContactAddress = false;
      }
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


}
