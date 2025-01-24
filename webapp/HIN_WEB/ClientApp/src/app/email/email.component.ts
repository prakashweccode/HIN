import { Component, OnInit, Input } from '@angular/core';
import { EmailService } from './email.service';
import { Officeemail, Message, Body, MailFolder, Emailaddress } from '../model/officeemail';
import { NotyHelper } from '../helper/NotyHelper';
import { GraphService } from '../officeauth/graph.service';
import { Contactinformation } from '../contactinformation/contactinformation';
import { ContactinformationService } from '../contactinformation/contactinformation.service';
import { LeadGenType } from '../helper/LeadGenType';
import { Deal } from '../model/deal';
import { EmailHistory, EmailTemplate } from '../model/email-history';
import { Datashared } from '../helper/datashared';
import { EmailtemplateComponent } from '../emailtemplate/emailtemplate.component';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from '../officeauth/auth.service';
import { EmailtemplateService } from '../emailtemplate/emailtemplate.service';
import { Batchemailsender } from '../model/batchemailsender';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent implements OnInit {
  public isGmail: boolean;
  showEmailTemplate: boolean = false;
  toggle: boolean = false;
  historyToggle: boolean = false;
  public officeemails: Officeemail = new Officeemail();
  contactInformations: Array<Contactinformation> = [];
  contactCCInformations: Array<Contactinformation> = [];
  mailFolders: any;
  //selectedContactInfo: any;
  @Input() entityType: any;
  @Input() entityId: number;
  @Input() emailDataSource: any;
  contactToggle: boolean = false;
  isAllChecked: boolean = false;
  recipientType: string;
  emailHistory: EmailHistory = new EmailHistory();
  listEmailHistory: Array<EmailHistory> = [];
  public batchEmailSender: Batchemailsender = new Batchemailsender();
  public gridHeaders: Array<any>;
  public dataSource: Array<any>;
  public filterColumns: Array<any>;
  public apiUrl: string;
  public pageSize: number;
  public actions: Array<any>;
  public pageLengthOptions: Array<number>;

  public lstOfEmailTemplate: Array<EmailTemplate> = [];
  public emailTemplate: EmailTemplate = new EmailTemplate();

  constructor(public emailTemplateService: EmailtemplateService, public emailService: EmailService, public notification: NotyHelper, private graphService: GraphService, private contactService: ContactinformationService, public dataShared: Datashared, private sanitizer: DomSanitizer, private officeService: AuthService) {
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
    //this.getContactInformation();
    this.getEmailHistory();
    this.getAllEmailTemplates();
    this.gridHeaders = [
      { displayName: 'To', propertyName: 'EmailTo', dataType: 'string', secondPropertyName: '', filter: '', isLink: true, serializeArray: null },
      { displayName: 'CC', propertyName: 'EmailCc', dataType: 'string', secondPropertyName: '', filter: '', isLink: false, serializeArray: null },
      { displayName: 'Subject', propertyName: 'EmailSubject', dataType: 'string', secondPropertyName: '', filter: '', isLink: false, serializeArray: null },
      { displayName: 'Sent On', propertyName: 'CreatedOn', dataType: 'datetime', secondPropertyName: '', filter: '', isLink: false, serializeArray: null },
      { displayName: 'Body', propertyName: 'EmailBody', dataType: 'string', secondPropertyName: '', filter: '', isLink: false, serializeArray: null, truncate:75 }

    ];
    this.dataSource = new Array<any>();
    this.filterColumns = [
      { column: "To", value: "", type: "contains" },
      { column: "CC", value: "", type: "contains" },
      { column: "Subject", value: "", type: "contains" },
      { column: "Body", value: "", type: "contains" },
      { column: "Date", value: "", type: "contains" }
    ];
    this.actions = [
    ];
    this.pageLengthOptions = [25, 100, 250];


  }


  //getAllEmailTemplates() {
  //  this.emailService.getAllEmailTemplates().subscribe(data => {
  //    this.lstOfEmailTemplate = data;
  //  }, err => { }, () => { });
  //}


  getAllEmailTemplates() {
    this.emailTemplateService.getAllEmailTemplatesNames().subscribe(data => {
      if (data) {
        this.lstOfEmailTemplate = data;
      }
    }, err => { }, () => { });
  }

  selectedEmailTemplate(selectedData) {
    if (this.officeemails && this.officeemails.message && this.officeemails.message.body) {
      this.emailTemplateService.getEmailTemplateById(selectedData).subscribe(data => {
        this.emailTemplate = data;
        if (data) {
          this.officeemails.message.body.content = this.emailTemplate.TemplateHtml;
        }
      });
      this.showEmailTemplate = true;
    }
    else {
      this.showEmailTemplate = false;
    }
  }

  bindPreviewHTML(html) {
    if (html) {
      let safeHTML = this.sanitizer.bypassSecurityTrustHtml(html);
      return safeHTML;
    }
  }

  setMailType(evt) {
    if (evt.target.value == "gmail") {
      this.isGmail = true;
    }
    else {
      this.isGmail = false;
    }
  }

  async sendEmail(message): Promise<void> {
    if (this.isGmail) {
      let contacts = [];
      message.message.toRecipients.forEach(x => {
        let contact = new Contactinformation();
        contact.Email = x.emailAddress.address;
        contacts.push(contact);
      });
      message.message.ccRecipients.forEach(x => {
        let contact = new Contactinformation();
        contact.Email = x.emailAddress.address;
        contacts.push(contact);
      });
      this.batchEmailSender.ContentHtml = message.message.body.content;
      this.batchEmailSender.Subject = message.message.subject;
      this.batchEmailSender.TemplateId = this.emailTemplate.TemplateId;
      this.batchEmailSender.Contacts = contacts;

      this.emailService.sendBatchEmail(this.batchEmailSender).subscribe(data => {
        if (data) {
          this.notification.ShowNoty("Email sent successfully.");
          this.getEmailHistory();
          this.closeToggle();
        }
      }, err => { }, () => { });
    }
    else {
      await this.graphService.sendMail(message).then(x => {
        let toAddr = '';
        message.message.toRecipients.forEach(x => {
          toAddr += x.emailAddress.address + ',';
        });
        let tocc = '';
        message.message.ccRecipients.forEach(x => {
          tocc += x.emailAddress.address + ',';
        });
        this.emailHistory.EmailTo = toAddr;
        this.emailHistory.EmailSubject = message.message.subject;
        this.emailHistory.EmailBody = message.message.body.content;
        this.emailHistory.EmailCc = tocc;
        this.emailHistory.CreatedOn = new Date();
        this.emailService.saveEmailHistory(this.emailHistory).subscribe(data => {
          if (data) {
            this.notification.ShowNoty("Email sent successfully.");
            this.getEmailHistory();
            this.closeToggle();
          }
        }, err => { }, () => { });
      });
    }
  }

  async getMailFolder() {
    this.mailFolders = await this.graphService.getMailFolder();
  }

  addEmail() {
    this.toggle = true;
  }
  historyEmail() {
    this.historyToggle = true;
  }
  closeToggle() {
    this.officeemails.message.toRecipients = [];
    this.officeemails.message.ccRecipients = [];
    this.toggle = false;
    this.historyToggle = false;
  }
  closeContacts() {
    this.contactToggle = false;
    this.isAllChecked = false;
  }
  saveSelectedContacts() {
    this.isAllChecked = false;
    this.contactToggle = false;
  }
  enterContact(evt) {
    if (evt.keyCode == 13) {
      this.officeemails.message.toRecipients.push({ emailAddress: { address: evt.target.value } });
      evt.target.value = '';
    }
  }
  enterCcContact(evt) {
    if (evt.keyCode == 13) {
      this.officeemails.message.ccRecipients.push({ emailAddress: { address: evt.target.value } });
      evt.target.value = '';
    }
  }
  selectAllContact(evt) {
    if (evt.target.checked) {
      this.isAllChecked = true;
      this.contactInformations.forEach(contact => {
        if (contact.Email) {
          switch (this.recipientType) {
            case 'to':
              this.officeemails.message.toRecipients.push({ emailAddress: { address: contact.Email } });
              break;
            case 'cc':
              this.officeemails.message.ccRecipients.push({ emailAddress: { address: contact.Email } });
              break;
          }
        }
      });
    }
    else {
      this.isAllChecked = false;
      switch (this.recipientType) {
        case 'to':
          this.officeemails.message.toRecipients = [];
          break;
        case 'cc':
          this.officeemails.message.ccRecipients = [];
          break;
      }
    }
  }
  selectContact(evt, data) {
    if (evt.target.checked) {
      switch (this.recipientType) {
        case 'to':
          this.officeemails.message.toRecipients.push({ emailAddress: { address: data.Email } });
          break;
        case 'cc':
          this.officeemails.message.ccRecipients.push({ emailAddress: { address: data.Email } });
          break;
      }
    }
    else {
      switch (this.recipientType) {
        case 'to':
          this.officeemails.message.toRecipients = this.officeemails.message.toRecipients.filter(x => x.emailAddress.address !== data);
          break;
        case 'cc':
          this.officeemails.message.ccRecipients = this.officeemails.message.ccRecipients.filter(x => x.emailAddress.address !== data);
          break;
      }

    }
  }
  getContactInfo() {
    this.contactService.getContactInformation(LeadGenType.Deal, this.entityId, false).subscribe(data => {
      this.contactToggle = true;
      if (data) {
        this.contactInformations = data;
      }
    }, err => {
      this.contactInformations = [];
    }, () => {

    });
  }
  chooseContacts() {
    this.getContactInfo();
    this.recipientType = 'to';
  }
  chooseCcContacts() {
    this.getContactInfo();
    this.recipientType = 'cc';
  }
  chooseContactBlur(evt) {
    if (evt.target.value) {
      this.officeemails.message.toRecipients.push({ emailAddress: { address: evt.target.value } });
      evt.target.value = '';
    }
  }
  chooseCcContactBlur(evt) {
    if (evt.target.value) {
      this.officeemails.message.ccRecipients.push({ emailAddress: { address: evt.target.value } });
      evt.target.value = '';
    }
  }
  selectedToContactInfo(recipientEmail) {
    this.officeemails.message.toRecipients.push({ emailAddress: { address: recipientEmail } });
  }
  selectedCCContactInfo(recipientEmail) {
    this.officeemails.message.ccRecipients.push({ emailAddress: { address: recipientEmail } });
  }
  removeRecipient(toRecipient) {
    //this.officeemails.message.toRecipients = this.officeemails.message.toRecipients.filter(toRecipient);
    this.officeemails.message.toRecipients = this.officeemails.message.toRecipients.filter(x => x.emailAddress.address !== toRecipient);
  }
  removeCcRecipient(ccRecipient) {
    //this.officeemails.message.toRecipients = this.officeemails.message.toRecipients.filter(toRecipient);
    this.officeemails.message.ccRecipients = this.officeemails.message.ccRecipients.filter(x => x.emailAddress.address !== ccRecipient);
  }
  //async getEmails(id) {
  //  return await this.graphService.getEmails(id);
  //}


  getEmailHistory() {
    this.emailService.getEmailHistory().subscribe(data => {
      this.listEmailHistory = data;
    });
  }

  editEmailHistory(evt) {

    if (evt.dataRow) {
      this.emailHistory = evt.dataRow;
    }
    this.historyToggle = true;
  }


  async signIn(): Promise<void> {
    if (!this.authenticated)
      await this.officeService.signIn();
    else {
    }
  }
  get authenticated(): boolean {
    return this.officeService.authenticated;
  }
  async signOut(): Promise<void> {
    await this.officeService.signOut();
  }
  async getCalendars(): Promise<void> {
    let calendars = await this.graphService.getCalendars();
  }

  async signInGmail() {
    if (!this.authenticated)
      await this.officeService.signIn();
    else {
    }
  }

}
