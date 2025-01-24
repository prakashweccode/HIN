import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdduserService } from '../adduser/adduser.service';
import { Group, ContactGroupModel, Contactinformation } from '../contactinformation/contactinformation';
import { ContactinformationService } from '../contactinformation/contactinformation.service';
import { NotyHelper } from '../helper/NotyHelper';
import { ListcontactinfoService } from '../listcontactinfo/listcontactinfo.service';
import { Batchemailsender } from '../model/batchemailsender';
import { Body, Emailaddress, Message, Officeemail } from '../model/officeemail';
import { GraphService } from '../officeauth/graph.service';

@Component({
  selector: 'app-contactgroup',
  templateUrl: './contactgroup.component.html',
  styleUrls: ['./contactgroup.component.css']
})
export class ContactgroupComponent implements OnInit {
  public batchEmailSender: Batchemailsender = new Batchemailsender();
  public group: Group = new Group();
  public gridHeaders: Array<any>;
  public dataSource: Array<any>;
  public filterColumns: Array<any>;
  public apiUrl: string;
  public pageSize: number;
  public actions: Array<any>;
  public pageLengthOptions: Array<number>;
  public contactGridHeaders: Array<any>;
  public contactDataSource: Array<any>;
  public contactFilterColumns: Array<any>;
  public contactActions: Array<any>;
  public contactPageLengthOptions: Array<number>;
  public modalToggle: boolean = false;
  public contactToggle: boolean = false;
  public selectedContacts: Array<Contactinformation> = [];
  public selectedGroups: Array<Group> = [];
  public emailToggle: boolean = false;
  public users: any;
  public officeemails: Officeemail = new Officeemail();
  constructor(public graphService: GraphService, public addusers: AdduserService, private contactService: ContactinformationService, private noty: NotyHelper, private router: Router, public listContactInfo: ListcontactinfoService) {
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
    this.addusers.getUsers().subscribe(data => {
      if (data) {
        this.users = data.map(item => ({
          id: item.UserId,
          Name: item.Name
        }));
      }
      this.gridHeaders = [
        { displayName: 'Group Name', propertyName: 'GroupName', dataType: 'string', secondPropertyName: '', filter: '', isLink: true, serializeArray: null, isCheckBox: true },
        { displayName: 'Created On', propertyName: 'CreatedOn', dataType: 'datetime', secondPropertyName: '', filter: '', isLink: false, serializeArray: null },
        { displayName: 'Created By', propertyName: 'CreatedById', dataType: 'number', secondPropertyName: '', filter: '', isLink: false, serializeArray: this.users }
      ];
    }, err => { }, () => { });
    this.dataSource = new Array<any>();
    this.filterColumns = [
      { column: "GroupName", value: "", type: "contains" },
    ];
    this.actions = [
    ];
    this.pageLengthOptions = [25, 100, 250];
    this.contactGridHeaders = [
      { displayName: 'Contact', propertyName: 'ContactName', dataType: 'string', secondPropertyName: '', filter: '', isLink: false, serializeArray: null, isCheckBox :true },
      { displayName: 'Contact Title', propertyName: 'ContactTitle', dataType: 'string', secondPropertyName: '', filter: '', isLink: false, serializeArray: null },
      { displayName: 'Email', propertyName: 'Email', dataType: 'string', secondPropertyName: '', filter: '', isLink: false, serializeArray: null },
      { displayName: 'Affiliates', propertyName: 'Affiliates', dataType: 'string', secondPropertyName: '', filter: '', isLink: false, serializeArray: null },
      { displayName: 'Skills', propertyName: 'Skills', dataType: 'string', secondPropertyName: '', filter: '', isLink: false, serializeArray: null }
    ];
    this.contactDataSource = new Array<any>();
    this.contactFilterColumns = [
      { column: "GroupName", value: "", type: "contains" },
    ];
    this.contactActions = [
    ];
    this.contactPageLengthOptions = [100, 200, 500];
  }
  statusEmitter(value) {
    
  }
  addNewContactGroup() {
    this.group = new Group();
    this.modalToggle = true;
  }
  closeModal() {
    this.contactToggle = false;
    this.selectedContacts = [];
    this.modalToggle = false;
  }
  saveGroup() {
    let contactGroupModel = new ContactGroupModel();
    contactGroupModel.Group = this.group;
    contactGroupModel.ContactInformations = this.selectedContacts;
    this.contactService.saveOrUpdateGroup(contactGroupModel).subscribe(data => {
      this.closeModal();
      this.noty.ShowNoty("Saved successfully.");
      this.reloadCurrentRoute();
    }, err => { }, () => { });
  }
  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
  editContactGroup(evt) {
    if (evt) {
      this.group = evt.dataRow;
      this.contactService.getContactGroups(evt.dataRow.Id).subscribe(data => {
        if (data) {
          this.selectedContacts = data;
        }
        this.contactToggle = true;
        this.modalToggle = true;
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
  selectContactToggle() {
    this.contactToggle = true;
  }
  selectedArray(evt) {
    if (evt) {
      this.selectedContacts = evt;
    }
  }
  selectedGroupArray(evt) {
    if (evt) {
      this.selectedGroups = evt;
    }
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
      this.noty.ShowNoty("Email sent successfully.");
      this.closeEmailToggle();
    });
  }
  sendBatchEmail(evt) {
    if (evt) {
      this.batchEmailSender.ContentHtml = evt.ContentHtml;
      this.batchEmailSender.Subject = evt.Subject;
      this.batchEmailSender.TemplateId = evt.TemplateId;
      if (this.selectedGroups.length > 0) {
        this.selectedGroups.forEach(_group => {
          if (_group) {
            this.listContactInfo.getContactsForGroup(_group.Id).subscribe(_data => {
              if (_data) {
                _data.forEach(_contact => {
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
              }
            });
          }
        });
      }
    }
  }
}
