import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ContactinformationService } from '../contactinformation/contactinformation.service';
import { EmailService } from '../email/email.service';
import { EmailtemplateService } from '../emailtemplate/emailtemplate.service';
import { Datashared } from '../helper/datashared';
import { NotyHelper } from '../helper/NotyHelper';
import { AuthService } from '../officeauth/auth.service';
import { GraphService } from '../officeauth/graph.service';
import { Officeemail, Message, Body, MailFolder, Emailaddress } from '../model/officeemail';
import { Contactinformation } from '../contactinformation/contactinformation';
import { EmailHistory, EmailTemplate } from '../model/email-history';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-composeemail',
  templateUrl: './composeemail.component.html',
  styleUrls: ['./composeemail.component.css']
})
export class ComposeemailComponent implements OnInit {
  @Output() closeEmailToggle = new EventEmitter();
  showEmailTemplate: boolean = false;
  emailHistory: EmailHistory = new EmailHistory();
  contactToggle: boolean = false;
  isAllChecked: boolean = false;
  recipientType: string;
  public officeemails: Officeemail = new Officeemail();
  contactInformations: Array<Contactinformation> = [];
  contactCCInformations: Array<Contactinformation> = [];
  public lstOfEmailTemplate: Array<EmailTemplate> = [];
  public emailTemplate: EmailTemplate = new EmailTemplate();
  historyToggle: boolean = false;
  listEmailHistory: Array<EmailHistory> = [];
  officeContacts: any[] = [];

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
    this.getEmailHistory();
    this.getAllEmailTemplates();
    //this.getOffice365Contacts();
  }
  //getOffice365Contacts() {
  //  this.graphService.getContacts().then(_data => {
  //    if (_data)
  //      this.officeContacts = _data;
  //  }).catch(_err => {
  //    this.notification.ShowNoty(_err.message);
  //  });
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

  async sendEmail(message): Promise<void> {
    if (message.message.ccRecipients.length == 0) {

    }
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

  closeToggle() {
    this.officeemails.message.toRecipients = [];
    this.officeemails.message.ccRecipients = [];
    this.closeEmailToggle.emit("false");
    this.historyToggle = false;
  }

  chooseContacts() {
    this.getContactInfo();
    this.recipientType = 'to';
  }
  chooseCcContacts() {
    this.getContactInfo();
    this.recipientType = 'cc';
  }

  getContactInfo() {
    this.contactService.getAllContactInfos().subscribe(data => {
      this.contactToggle = true;
      if (data) {
        this.contactInformations = data;
      }
    }, err => {
      this.contactInformations = [];
    }, () => {

    });


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
    this.officeemails.message.toRecipients = this.officeemails.message.toRecipients.filter(x => x.emailAddress.address !== toRecipient);
  }
  removeCcRecipient(ccRecipient) {
    this.officeemails.message.ccRecipients = this.officeemails.message.ccRecipients.filter(x => x.emailAddress.address !== ccRecipient);
  }


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


}
