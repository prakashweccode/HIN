import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmailtemplateService } from '../emailtemplate/emailtemplate.service';
import { Datashared } from '../helper/datashared';
import { EmailTemplate } from '../model/email-history';

@Component({
  selector: 'app-emaildashboard',
  templateUrl: './emaildashboard.component.html',
  styleUrls: ['./emaildashboard.component.css']
})
export class EmaildashboardComponent implements OnInit {
  public emailTemplates: Array<EmailTemplate> = [];
  public emailTemplatesName: Array<EmailTemplate> = [];
  public emailTemplate: EmailTemplate = new EmailTemplate();

  constructor(private router: Router, private service: EmailtemplateService, private dataHelper: Datashared) { }

  ngOnInit() {
    //this.getEmailtemplates();
    this.getEmailTemplatesName();
  }
  addNewTemplate() {
    this.router.navigate(['/emailtemplate']);
  }
  //getEmailtemplates() {
  //  this.service.getAllEmailTemplates().subscribe(data => {
  //    if (data) {
  //      this.emailTemplates = data;
  //    }
  //  }, err => { }, () => { });
  //}

  getEmailTemplatesName() {
    this.service.getAllEmailTemplatesNames().subscribe(data => {
      if (data) {
        this.emailTemplatesName = data;
      }
    }, err => { }, () => { });
  }


  editTemplate(template) {
    if (template) {
      this.service.getEmailTemplateById(template).subscribe(data => {
        this.emailTemplate = data;
        if (data) {
          this.dataHelper.setValue(data);
          this.router.navigate(['/editemailtemplate']);
        }
      });
    }
    
  }
}
