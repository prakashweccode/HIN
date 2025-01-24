import { Injectable } from '@angular/core';
import { Officeemail, Message } from '../model/officeemail';
import { HttpClient } from '@angular/common/http';
import { EmailHistory, EmailTemplate } from '../model/email-history';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private http: HttpClient) { }

  sendEmail(message) {
    return this.http.post<Message>("/me/sendMail", message).pipe();
  }
  saveEmailHistory(emailHistory) {
    return this.http.post<any>("/api/EmailHistory/SaveEmailHistory", emailHistory).pipe();
  }
  getEmailHistory() {
    return this.http.get<Array<EmailHistory>>("/api/EmailHistory/GetEmailHistory").pipe();
  }

  getAllEmailTemplates() {
    return this.http.get<Array<EmailTemplate>>("/api/EmailTemplate/GetAllEmailTemplates").pipe();
  }
  sendBatchEmail(batchEmailSender) {
    return this.http.post<any>("/api/EmailTemplate/SendBatchEmail", batchEmailSender).pipe();
  }
}
