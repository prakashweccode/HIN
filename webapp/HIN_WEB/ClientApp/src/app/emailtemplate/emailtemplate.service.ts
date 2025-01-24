import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EmailTemplate } from '../model/email-history';

@Injectable({
  providedIn: 'root'
})
export class EmailtemplateService {

  constructor(private http: HttpClient) { }

  getTemplate() {
    return this.http.get('assets/email/emailtemplate.html', { responseType: 'text' });
  }
  getDashboardTemplate() {
    return this.http.get('assets/email/emaildashboard.html', { responseType: 'text' });
  }
  getCss() {
    return this.http.get('assets/email/style.css', { responseType: 'text' });
  }
  saveEmailTemplate(emailTemplate) {
    return this.http.post<any>("/api/EmailTemplate/SaveEmailTemplate", emailTemplate).pipe();
  }
  getAllTemplateNames() {
    return this.http.get<Array<string>>("/api/EmailTemplate/GetAllTemplateNames").pipe();
  }
  getAllEmailTemplates() {
    return this.http.get<Array<EmailTemplate>>("/api/EmailTemplate/GetAllEmailTemplates").pipe();
  }

  getAllEmailTemplatesNames() {
    return this.http.get<Array<EmailTemplate>>("/api/EmailTemplate/GetAllEmailTemplatesNames").pipe();
  }

  getEmailTemplateById(id) {
    return this.http.get<EmailTemplate>("/api/EmailTemplate/GetEmailTemplateById?id=" + id).pipe();
  }

}
