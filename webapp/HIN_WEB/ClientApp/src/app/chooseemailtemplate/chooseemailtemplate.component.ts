import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { EmailService } from '../email/email.service';
import { EmailtemplateService } from '../emailtemplate/emailtemplate.service';
import { Batchemailsender } from '../model/batchemailsender';
import { EmailTemplate } from '../model/email-history';

@Component({
  selector: 'app-chooseemailtemplate',
  templateUrl: './chooseemailtemplate.component.html',
  styleUrls: ['./chooseemailtemplate.component.css']
})
export class ChooseemailtemplateComponent implements OnInit {
  public lstOfEmailTemplate: Array<EmailTemplate> = [];
  public batchEmailSender: Batchemailsender = new Batchemailsender();
  showEmailTemplate: boolean = false;
  templateHtml: string;
  selectedData: EmailTemplate = new EmailTemplate();
  @Output() sendBatchEmail = new EventEmitter();
  @Output() sendModalClose = new EventEmitter();
  constructor(public emailService: EmailService, public emailTemplate:EmailtemplateService,private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.getEmailTemplatesName();
  }


  getEmailTemplatesName() {
    this.emailTemplate.getAllEmailTemplatesNames().subscribe(data => {
      if (data) {
        this.lstOfEmailTemplate = data;
      }
    }, err => { }, () => { });
  }

  //getAllEmailTemplates() {
  //  this.emailService.getAllEmailTemplates().subscribe(data => {
  //    this.lstOfEmailTemplate = data;
  //  }, err => { }, () => { });
  //}

  selectedEmailTemplate(selectedDataId) {
    if (selectedDataId && selectedDataId != -1) {
      this.emailTemplate.getEmailTemplateById(selectedDataId).subscribe(data => {
        if (data) {
          this.selectedData = data;
          this.batchEmailSender.TemplateId = this.selectedData.TemplateId;
          this.showEmailTemplate = true;
          this.templateHtml = this.selectedData.TemplateHtml;
          this.batchEmailSender.ContentHtml = this.templateHtml;
        }
      });
      //let selectedData = this.lstOfEmailTemplate.find(x => x.TemplateId == selectedDataId);
    }
    else {
      this.batchEmailSender.TemplateId = selectedDataId;
      this.showEmailTemplate = false;
      }
  }

  bindPreviewHTML(html) {
    if (html) {
      let safeHTML = this.sanitizer.bypassSecurityTrustHtml(html);
      return safeHTML;
    }
  }

  closeToggle() {
    this.batchEmailSender = new Batchemailsender();
    this.sendModalClose.emit('false');
  }

  sendEmail(batchEmailSender) {
    this.sendBatchEmail.emit(batchEmailSender);
  }

}
